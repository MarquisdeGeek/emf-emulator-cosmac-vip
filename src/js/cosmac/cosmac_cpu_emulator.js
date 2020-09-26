// cosmac_cpu_emulator
let cosmac_cpu_emulator = (function(bus, options) {

  let fetchInstructionByte = function() {
    let op = read8(pc.getUnsigned() & 0x7fff);
    // TODO: Re-introduce this?
    //pc.add(2);
    //updateMemoryRefresh();
    return op;
  };

  let keysDown = [];

  function isKeyPressed(k) {
    return keysDown[k]
  }

  function isKeyNotPressed(k) {
    return !keysDown[k]
  }



  let tmp8 = new emf.Number(8);
  let tmp16 = new emf.Number(16);

  // TODO: f = flags, and cc_ are separate but should be unified?!?!
  var f = new emf.Number(8);


  // Options: directMemory = true
  // Options: directFetch = true
  let read1 = function(a) {
    return read8(a) & 0x01;
  }
  let read2 = function(a) {
    return read8(a) & 0x03;
  }
  let read3 = function(a) {
    return read8(a) & 0x07;
  }
  let read4 = function(a) {
    return read8(a) & 0x0f;
  }
  let read5 = function(a) {
    return read8(a) & 0x1f;
  }
  let read6 = function(a) {
    return read8(a) & 0x3f;
  }
  let read7 = function(a) {
    return read8(a) & 0x7f;
  }
  let read8;
  let read9 = function(a) {
    return read16(a) & 0x1ff;
  }
  let read10 = function(a) {
    return read16(a) & 0x3ff;
  }
  let read11 = function(a) {
    return read16(a) & 0x7ff;
  }
  let read12 = function(a) {
    return read16(a) & 0xfff;
  }
  let read13 = function(a) {
    return read16(a) & 0x1fff;
  }
  let read14 = function(a) {
    return read16(a) & 0x3fff;
  }
  let read15 = function(a) {
    return read16(a) & 0x7fff;
  }
  let read16;

  /*
   **
   ** Declarations
   **
   */
  let v0 = new emf.Number(8);
  let gsRegisterV0 = new emf.Number(8);
  let v1 = new emf.Number(8);
  let gsRegisterV1 = new emf.Number(8);
  let v2 = new emf.Number(8);
  let gsRegisterV2 = new emf.Number(8);
  let v3 = new emf.Number(8);
  let gsRegisterV3 = new emf.Number(8);
  let v4 = new emf.Number(8);
  let gsRegisterV4 = new emf.Number(8);
  let v5 = new emf.Number(8);
  let gsRegisterV5 = new emf.Number(8);
  let v6 = new emf.Number(8);
  let gsRegisterV6 = new emf.Number(8);
  let v7 = new emf.Number(8);
  let gsRegisterV7 = new emf.Number(8);
  let v8 = new emf.Number(8);
  let gsRegisterV8 = new emf.Number(8);
  let v9 = new emf.Number(8);
  let gsRegisterV9 = new emf.Number(8);
  let va = new emf.Number(8);
  let gsRegisterVA = new emf.Number(8);
  let vb = new emf.Number(8);
  let gsRegisterVB = new emf.Number(8);
  let vc = new emf.Number(8);
  let gsRegisterVC = new emf.Number(8);
  let vd = new emf.Number(8);
  let gsRegisterVD = new emf.Number(8);
  let ve = new emf.Number(8);
  let gsRegisterVE = new emf.Number(8);
  let vf = new emf.Number(8);
  let gsRegisterVF = new emf.Number(8);
  let sp = new emf.Number(16);
  let gsRegisterSP = new emf.Number(16);
  let pc = new emf.Number(16);
  let gsRegisterPC = new emf.Number(16);
  let i = new emf.Number(12);
  let gsRegisterI = new emf.Number(12);
  let st = new emf.Number(8);
  let gsRegisterST = new emf.Number(8);
  let dt = new emf.Number(8);
  let gsRegisterDT = new emf.Number(8);
  let kf = new emf.Number(8);
  let gsRegisterKF = new emf.Number(8);

  /*
   **
   ** Internal state
   **
   */
  let inHalt = (false); // Treat as bool

  /*
   **
   ** Bus
   **
   */
  function setupBusHandlersInternal() {
    // Watching the pins
    bus.attachPin('keydown', {
      onFalling: function() {
        let k = bus.readBlock('keycode');
        keysDown[k] = true;
        if (inHalt) {
          inHalt = false;
          onExitHaltReg.assign(k);
        }
      },
    });
    bus.attachPin('keyup', {
      onFalling: function() {
        let k = bus.readBlock('keycode');
        keysDown[k] = false;
      },
    });
    bus.attachPin('vf', {
      onFalling: function() {
        setRegisterValueVF(bus.readBlock('vfvalue'));
      },
    });
    bus.attachPin('timer60', {
      onFalling: function() {
        if (dt.get()) {
          dt.sub(1);
        }
        if (st.get() == 1) {
          bus.setLow('beep');
        }
        if (st.get()) {
          st.sub(1);
        }
      },
    });
  }

  /*
   **
   ** ALU
   **
   */
  function set(r, v) {
    r.assign(v);
  }

  function get(r) {
    return r.getUnsigned();
  }

  function lit(v) {
    return v;
  }
  // NOTE: When using the bus versions, this uses Z80 conventions
  let in8;
  let out8;
  let write8;
  let fetch8;
  let write16;
  //
  function setupBusHandlers() {
    if (options.directIORQ) {
      in8 = bus.iorq.readPort;
      out8 = bus.iorq.writePort;
    } else {
      in8 = function(port) {
        port = port.getUnsigned ? port.getUnsigned() : port;
        bus.writeBlock('address', port);
        bus.setLow('rd');
        bus.setLow('iorq');
        let data = bus.readBlock('data');
        bus.setHigh('iorq');
        bus.setHigh('rd');
        return data;
      };

      out8 = function(port, data) {
        port = port.getUnsigned ? port.getUnsigned() : port;
        data = data.getUnsigned ? data.getUnsigned() : data;
        bus.writeBlock('address', port);
        bus.writeBlock('data', data);
        bus.setLow('wr');
        bus.pulseLow('iorq');
        bus.setHigh('wr');
      };
    }
    //
    if (options.directMemory) {
      // TODO: don't auto generate these
      read8 = bus.memory.read8;
      read16 = bus.memory.read16;
      write8 = bus.memory.write8;
      write16 = bus.memory.write16;
    } else {
      // TODO: CPU needs endian knowledge to do read16
      read8 = function(address) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        bus.writeBlock('address', address);
        bus.setLow('rd');
        bus.setLow('mreq');
        let data = bus.readBlock('data');
        bus.setHigh('mreq');
        bus.setHigh('rd');
        return data;
      };

      write8 = function(address, data) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        data = data.getUnsigned ? data.getUnsigned() : data;
        bus.writeBlock('address', address);
        bus.writeBlock('data', data);
        bus.setLow('wr');
        bus.pulseLow('mreq');
        bus.setHigh('wr');
      };

      read16 = function(address) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        if (isBigEndian) {
          return read8(address) * 256 + read8(address + 1);
        } else {
          return read8(address + 1) * 256 + read8(address);
        }
      };

      write16 = function(address, data) {
        address = address.getUnsigned ? address.getUnsigned() : address;
        data = data.getUnsigned ? data.getUnsigned() : data;

        if (isBigEndian) {
          write8(address + 0, data >> 8);
          write8(address + 1, data & 0xff);
        } else {
          write8(address + 1, data >> 8);
          write8(address + 0, data & 0xff);
        }
      };
    }
    //
    if (options.directFetch) {
      fetch8 = function() {
        let pcValue = pc.getUnsigned();
        return bus.memory.read8(pcValue);
      };
    } else {
      fetch8 = function() {
        let pcValue = pc.getUnsigned();
        bus.writeBlock('address', pcValue);
        bus.setLow('m1');
        bus.setLow('rd');
        bus.setLow('mreq');
        let data = bus.readBlock('data');
        bus.setHigh('mreq');
        bus.setHigh('rd');
        bus.setHigh('m1');

        // TODO: Re-introduce this?
        //pc.inc();
        updateMemoryRefresh();

        return data;
      };

    }
    //
  }
  var alu = alu || {};

  alu.parityLUT8 = [];

  alu.start = function() {
    for (let i = 0; i < 256; ++i) {
      alu.parityLUT8[i] = calculateParity(i);
    }
  }

  alu.reset = function() {

  }

  function calculateParity(v, sz = 8) {
    let bits = 0;

    v = v & 255; /// ensure it's positive, for the table deference

    for (let i = 0; i < sz; ++i) {
      if (v & (1 << i)) {
        ++bits;
      }
    }
    let parity = (bits & 1) == 1 ? 0 : 1; // odd parity returns 0
    return parity;
  }
  let flagHalfCarryAdd = [0, 1, 1, 1, 0, 0, 0, 1];
  let flagHalfCarrySub = [0, 0, 1, 0, 1, 0, 1, 1];

  alu.add_u8u8c = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    wasCarry = result > 0xff ? 1 : 0;

    // Did the calculation in the lowest 4 bits spill over into the upper 4 bits

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x88) >> 3) | (((v2) & 0x88) >> 2) | ((result & 0x88) >> 1);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0;

    result &= 0xff;

    computeFlags8(result);
    aluLastResult = result;

    return result;
  }

  alu.sub_u8u8b = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;
    let result = (v1 - v2) - v3;

    wasCarry = result & 0x100 ? 1 : 0;
    wasNegation = true;

    // Did the calculation in the lowest 4 bits spill under

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x88) >> 3) | (((v2) & 0x88) >> 2) | ((result & 0x88) >> 1);
    wasHalfCarry = flagHalfCarrySub[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 1 || lookup == 6) ? 1 : 0;

    result &= 0xff;

    computeFlags8(result);

    return result;
  }
  alu.abs16 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    return computeFlags16(Math.abs(v));
  }

  alu.add_u16u16c = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    wasCarry = result > 0xffff ? 1 : 0;

    // 16 bit adds set_'H' on overflow of bit 11 (!?)

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0; // TODO: not convinced any Z80 instr checks the 'V' flag fter 16 bit adds

    result &= 0xffff;

    computeFlags16(result);
    aluLastResult = result;

    return result;
  }

  alu.add_u16s8 = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    let result = (v1 + v2 + v3);
    if (v2 >= 128) { // handle the negative bit of 8 bit numbers in v2
      result -= 256;
    }
    wasCarry = result > 0xffff ? 1 : 0;

    // 16 bit adds set_'H' on overflow of bit 11 (!?)

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarryAdd[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 3 || lookup == 4) ? 1 : 0;

    result &= 0xffff;

    computeFlags16(result);

    return result;
  }

  alu.sub_u16u16b = function(v1, v2, v3 = 0) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;
    let result = (v1 - v2) - v3;

    wasCarry = result & 0x10000 ? 1 : 0;
    wasNegation = true;

    // 16-bit half carry occurs on bit 11

    // The MSB is same on both src params, but changed between result and src param1
    let lookup = ((v1 & 0x8800) >> 11) | (((v2) & 0x8800) >> 10) | ((result & 0x8800) >> 9);
    wasHalfCarry = flagHalfCarrySub[(lookup & 7)];
    lookup >>= 4;
    wasOverflow = (lookup == 1 || lookup == 6) ? 1 : 0;

    result &= 0xffff;

    computeFlags16(result);

    return result;
  }
  alu.daa = function(v, carry, subtraction) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = carry;

    if (subtraction) { // last instr was subtraction	
      if ((v & 0x0f) > 9) {
        v -= 6;
      }
      if ((v & 0xf0) > 0x90) {
        v -= 0x60;
      }
    } else { // post an addition
      if ((v & 0x0f) > 9) {
        v += 6;
      }
      if ((v & 0xf0) > 0x90) {
        v += 0x60;
      }
    }
    v = v & 0xff;
    computeFlags8(v);
    return v;
  }
  // utility methods
  let wasCarry;
  let wasNegation;
  let wasOverflow;
  let wasHalfCarry;
  let wasZero;
  let wasSign;
  let wasParity;
  //
  let aluLastResult;


  function sign() {
    return wasSign;
  }

  function sign16() {
    return wasSign;
  }

  function zero() {
    return wasZero;
  }

  function halfcarry() {
    return wasHalfCarry;
  }

  function overflow() {
    return wasOverflow;
  }

  function parity() {
    return wasParity;
  }

  function carry() {
    return wasCarry;
  }

  function getParity8(v) {
    return alu.parityLUT8[v];
  }

  function getParity16(v) {
    return alu.parityLUT8[v * 255] ^ alu.parityLUT8[v >> 8];
  }

  function computeFlags8(r) {
    wasSign = r & 0x80 ? 1 : 0;
    wasZero = r == 0 ? 1 : 0;
    wasParity = getParity8(r);
    return r;
  }

  function computeFlags16(r) {
    wasSign = r & 0x8000 ? 1 : 0;
    wasZero = r == 0 ? 1 : 0;
    wasParity = getParity16(r);
    return r;
  }
  //
  // Basic logic
  //
  alu.eq8 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 === v2;
  }

  alu.neq8 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 !== v2;
  }


  //
  // Basic manipulation
  //
  alu.complement8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v = (~v) & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.setBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    value = value | (1 << bit);
    computeFlags8(value);
    return value;
  }

  alu.clearBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    value = value & ~(1 << bit);
    computeFlags8(value);
    return value;
  }

  alu.testBit8 = function(bit, value) {
    value = value.get ? value.getUnsigned() : value;
    let isBitSet = value & (1 << bit) ? 1 : 0;
    wasSign = value & 0x80 ? 1 : 0;
    wasZero = isBitSet ? 0 : 1;
    wasOverflow = wasZero;
    wasParity = wasZero; // TODO: sure this isn't getParity8(value);?
    return isBitSet;
  }

  alu.and8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v & v2);
  }

  alu.xor8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v ^ v2);
  }

  alu.or8 = function(v, v2) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return computeFlags8(v | v2);
  }

  //
  // Shift and rotates
  //
  alu.lsr8 = function(v, places) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    wasCarry = v & 1;
    return v >> places;
  }

  alu.lsl8 = function(v, places) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    wasCarry = v & 0x80 ? 1 : 0;
    return v << places;
  }

  alu.rra8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    v |= carry ? 0x100 : 0;
    wasCarry = v & 1;
    v >>= 1;
    v &= 0xff;

    computeFlags8(v);

    return v;
  }

  // SLL is undocumented it seems (at least in Zaks:82)
  // http://www.z80.info/z80undoc.htm
  // suggests it's like SLA, but with 1 in the LSB
  alu.sll8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= 1;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.sla8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.sra8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1;
    v >>= 1;
    v |= (v & 0x40) << 1;

    computeFlags8(v);

    return v;
  }

  alu.srl8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1;
    v >>= 1;
    v = v & 0x7f;

    computeFlags8(v);

    return v;
  }

  alu.rlc8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= wasCarry;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.rl8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 0x80 ? 1 : 0;
    v <<= 1;
    v |= carry;
    v = v & 0xff;

    computeFlags8(v);

    return v;
  }

  alu.rr8 = function(v, carry) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1 ? 1 : 0;
    v >>= 1;
    v |= carry ? 0x80 : 0;

    computeFlags8(v);

    return v;
  }

  alu.rrc8 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;

    wasCarry = v & 1 ? 1 : 0;
    v >>= 1;
    v |= wasCarry ? 0x80 : 0;

    computeFlags8(v);

    return v;
  }
  //
  // Basic logic
  //
  alu.eq16 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 === v2;
  }

  alu.neq16 = function(v1, v2) {
    v1 = v1.getUnsigned ? v1.getUnsigned() : v1;
    v2 = v2.getUnsigned ? v2.getUnsigned() : v2;

    return v1 !== v2;
  }



  //
  // Basic manipulation
  //
  alu.complement16 = function(v) {
    v = v.getUnsigned ? v.getUnsigned() : v;
    v = (~v) & 0xffff;

    computeFlags16(v);

    return v;
  }

  alu.test16 = function(v) {
    return computeFlags16(v)
  }

  alu.xor16 = function(v1, v2) {
    return computeFlags16(v1 ^ v2);
  }

  alu.or16 = function(v1, v2) {
    return computeFlags16(v1 | v2);
  }

  alu.and16 = function(v1, v2) {
    return computeFlags16(v1 & v2);
  }

  function createRegisterPair(hi, lo) {
    let pair = new emf.Number(16);
    let pairAssign = pair.assign;
    let pairGetUnsigned = pair.getUnsigned;

    getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
    let method = getMethods(pair);
    method.forEach((m) => {
      let original = pair[m];
      pair[m] = function(args) {
        //// Copy from individual
        let combined = (hi.getUnsigned() << 8) | lo.getUnsigned();
        pairAssign(combined);

        // Do normal math using genuine logic
        let returnValue = original(args);

        // Copy back
        let result = pairGetUnsigned();
        hi.assign(result >> 8);
        lo.assign(result & 255);

        return returnValue; // for those that use it. e.g. equals()
      }
    });

    // TODO: get() 
    pair.get = function() {
      return (hi.getUnsigned() << 8) | lo.getUnsigned();
    }
    pair.getUnsigned = function() {
      return (hi.getUnsigned() << 8) | lo.getUnsigned();
    }

    return pair;
  }

  /*
   **
   ** Utility methods
   **
   */
  function start() {
    alu.start();
    setupBusHandlersInternal();
    setupBusHandlers();
    return reset();
  }

  function reset() {
    alu.reset();
    v0.assign(0);
    v1.assign(0);
    v2.assign(0);
    v3.assign(0);
    v4.assign(0);
    v5.assign(0);
    v6.assign(0);
    v7.assign(0);
    v8.assign(0);
    v9.assign(0);
    va.assign(0);
    vb.assign(0);
    vc.assign(0);
    vd.assign(0);
    ve.assign(0);
    vf.assign(0);
    sp.assign(4096);
    pc.assign(512);
    i.assign(0);
    st.assign(0);
    dt.assign(0);
    kf.assign(0);
    inHalt = (false);
  }

  function getRegisterValueV0() {
    return v0.getUnsigned();
  }

  function setRegisterValueV0(v) {
    v0.assign(v);
  }

  function getRegisterValueV1() {
    return v1.getUnsigned();
  }

  function setRegisterValueV1(v) {
    v1.assign(v);
  }

  function getRegisterValueV2() {
    return v2.getUnsigned();
  }

  function setRegisterValueV2(v) {
    v2.assign(v);
  }

  function getRegisterValueV3() {
    return v3.getUnsigned();
  }

  function setRegisterValueV3(v) {
    v3.assign(v);
  }

  function getRegisterValueV4() {
    return v4.getUnsigned();
  }

  function setRegisterValueV4(v) {
    v4.assign(v);
  }

  function getRegisterValueV5() {
    return v5.getUnsigned();
  }

  function setRegisterValueV5(v) {
    v5.assign(v);
  }

  function getRegisterValueV6() {
    return v6.getUnsigned();
  }

  function setRegisterValueV6(v) {
    v6.assign(v);
  }

  function getRegisterValueV7() {
    return v7.getUnsigned();
  }

  function setRegisterValueV7(v) {
    v7.assign(v);
  }

  function getRegisterValueV8() {
    return v8.getUnsigned();
  }

  function setRegisterValueV8(v) {
    v8.assign(v);
  }

  function getRegisterValueV9() {
    return v9.getUnsigned();
  }

  function setRegisterValueV9(v) {
    v9.assign(v);
  }

  function getRegisterValueVA() {
    return va.getUnsigned();
  }

  function setRegisterValueVA(v) {
    va.assign(v);
  }

  function getRegisterValueVB() {
    return vb.getUnsigned();
  }

  function setRegisterValueVB(v) {
    vb.assign(v);
  }

  function getRegisterValueVC() {
    return vc.getUnsigned();
  }

  function setRegisterValueVC(v) {
    vc.assign(v);
  }

  function getRegisterValueVD() {
    return vd.getUnsigned();
  }

  function setRegisterValueVD(v) {
    vd.assign(v);
  }

  function getRegisterValueVE() {
    return ve.getUnsigned();
  }

  function setRegisterValueVE(v) {
    ve.assign(v);
  }

  function getRegisterValueVF() {
    return vf.getUnsigned();
  }

  function setRegisterValueVF(v) {
    vf.assign(v);
  }

  function getRegisterValueSP() {
    return sp.getUnsigned();
  }

  function setRegisterValueSP(v) {
    sp.assign(v);
  }

  function getRegisterValuePC() {
    return pc.getUnsigned();
  }

  function setRegisterValuePC(v) {
    pc.assign(v);
  }

  function getRegisterValueI() {
    return i.getUnsigned();
  }

  function setRegisterValueI(v) {
    i.assign(v);
  }

  function getRegisterValueST() {
    return st.getUnsigned();
  }

  function setRegisterValueST(v) {
    st.assign(v);
  }

  function getRegisterValueDT() {
    return dt.getUnsigned();
  }

  function setRegisterValueDT(v) {
    dt.assign(v);
  }

  function getRegisterValueKF() {
    return kf.getUnsigned();
  }

  function setRegisterValueKF(v) {
    kf.assign(v);
  }

  function getRegisterValue(name) {
    name = name.toLowerCase();
    if (name == 'v0') return getRegisterValueV0();
    if (name == 'v1') return getRegisterValueV1();
    if (name == 'v2') return getRegisterValueV2();
    if (name == 'v3') return getRegisterValueV3();
    if (name == 'v4') return getRegisterValueV4();
    if (name == 'v5') return getRegisterValueV5();
    if (name == 'v6') return getRegisterValueV6();
    if (name == 'v7') return getRegisterValueV7();
    if (name == 'v8') return getRegisterValueV8();
    if (name == 'v9') return getRegisterValueV9();
    if (name == 'va') return getRegisterValueVA();
    if (name == 'vb') return getRegisterValueVB();
    if (name == 'vc') return getRegisterValueVC();
    if (name == 'vd') return getRegisterValueVD();
    if (name == 've') return getRegisterValueVE();
    if (name == 'vf') return getRegisterValueVF();
    if (name == 'sp') return getRegisterValueSP();
    if (name == 'pc') return getRegisterValuePC();
    if (name == 'i') return getRegisterValueI();
    if (name == 'st') return getRegisterValueST();
    if (name == 'dt') return getRegisterValueDT();
    if (name == 'kf') return getRegisterValueKF();
  }

  function setRegisterValue(name, v) {
    name = name.toLowerCase();
    if (name === 'v0') return setRegisterValueV0(v);
    if (name === 'v1') return setRegisterValueV1(v);
    if (name === 'v2') return setRegisterValueV2(v);
    if (name === 'v3') return setRegisterValueV3(v);
    if (name === 'v4') return setRegisterValueV4(v);
    if (name === 'v5') return setRegisterValueV5(v);
    if (name === 'v6') return setRegisterValueV6(v);
    if (name === 'v7') return setRegisterValueV7(v);
    if (name === 'v8') return setRegisterValueV8(v);
    if (name === 'v9') return setRegisterValueV9(v);
    if (name === 'va') return setRegisterValueVA(v);
    if (name === 'vb') return setRegisterValueVB(v);
    if (name === 'vc') return setRegisterValueVC(v);
    if (name === 'vd') return setRegisterValueVD(v);
    if (name === 've') return setRegisterValueVE(v);
    if (name === 'vf') return setRegisterValueVF(v);
    if (name === 'sp') return setRegisterValueSP(v);
    if (name === 'pc') return setRegisterValuePC(v);
    if (name === 'i') return setRegisterValueI(v);
    if (name === 'st') return setRegisterValueST(v);
    if (name === 'dt') return setRegisterValueDT(v);
    if (name === 'kf') return setRegisterValueKF(v);
  }

  function setFlagValue(name, v) {
    name = name.toLowerCase();
    if (name === 'c') return changeFlagC(v);
  }

  function getFlagC() {
    return (vf.getUnsigned() & (1 << 0)) ? 1 : 0;
  }

  function clearFlagC() {
    vf.assign(vf.getUnsigned() & ~(1 << 0));
  }

  function setFlagC() {
    vf.assign(vf.getUnsigned() | (1 << 0));
  }

  function affectFlagC() {
    if (carry()) {
      setFlagC();
    } else {
      clearFlagC();
    }
  }

  function changeFlagC(newState) {
    if (newState) {
      setFlagC();
    } else {
      clearFlagC();
    }
  }

  function update(how) {
    // emf.control ensures only 1 step is executed
    return step();
  }

  function sysHaltUntilKey(reg) {
    inHalt = true;
    onExitHaltReg = reg;
  }


  function alu_as_s5(v) {
    v &= 0x1f; // LSB 5 bits
    if (v & 0x10) { // -32 is set
      return -16 + (v & 0x0f);
    }
    return v;
  }


  function alu_bcd(destAddress, value) {
    let bcd = [];

    write8(destAddress + 2, value % 10); // units
    value = Math.floor(value / 10);
    write8(destAddress + 1, value % 10); // units
    value = Math.floor(value / 10);
    write8(destAddress + 0, value % 10); // units
  }

  function alu_copyto(destAddress, theregname) {
    let numRegs = parseInt(theregname.substr(1, 1), 16) + 1; // +1 because counts from 0, since V0
    let addr = destAddress;

    for (let reg = 0; reg < numRegs; ++reg, ++addr) {
      write8(addr, getRegisterValue('v' + emf.utils.hex(reg)));
    }

  }

  function alu_copyfrom(sourceAddress, theregname) {
    let numRegs = parseInt(theregname.substr(1, 1), 16) + 1; // +1 because counts from 0, since V0
    let addr = sourceAddress;

    for (let reg = 0; reg < numRegs; ++reg, ++addr) {
      setRegisterValue('v' + emf.utils.hex(reg), read8(addr));
    }
  }


  function alu_rrd8() { // only for (HL)
    var v = read8(hl);
    var av = a.getUnsigned();
    var newHL = ((av & 0x0f) << 4) | (v >> 4);
    var new_a = (av & 0xf0) | (v & 0x0f);

    write8(hl, newHL);
    a.assign(new_a);

    computeFlags8(new_a);
    return new_a;
  }

  function alu_rld8() { // only applies to (hl)
    var v = read8(hl);
    var av = a.getUnsigned();
    var newHL = (v << 4) | (av & 0x0f);
    var new_a = (av & 0xf0) | ((v & 0xf0) >> 4);

    write8(hl, newHL);
    a.assign(new_a);

    computeFlags8(new_a);
    return new_a;
  }

  //
  // CPU handlers
  function halt() {
    inHalt = true;
    pc.sub(1); // hold still on this instruction, until an NMI hits
  }


  // INTERUPTS : NMI

  // returns true if we've handled an interupt
  function updateMemoryRefresh() {
    //memrefresh.assign((memrefresh.getUnsigned() + 1) & 0x7f);
  }

  function updateInterupts() {
    // TODO: Maintain a running tstates value, outside of step() method!
    return false;
  }

  // Algorithmic and logical methods
  //

  function step() {
    if (updateInterupts()) {
      return 12; // arbitrary, non-zero
    }

    // On Chip8 this is the 'wait for key'
    if (inHalt) {
      return 1;
    }

    return processOpcode();
  }

  function processOpcode() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // cls_ret
        // return 00_ext();
        // extended instructions beginning 00 called zero

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return zero_ext();;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x2:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x3:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x4:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x5:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x6:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x7:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x8:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x9:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xa:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xb:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xc:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xd:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xe:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0xf:
        // Unknown operation
        pc.add(1);
        return 1;
        break;

      case 0x10:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x11:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x12:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x13:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x14:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x15:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x16:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x17:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x18:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x19:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1a:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1b:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1c:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1d:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1e:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x1f:
        // jp @n

        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), lit(-2)));
        pc.add(2);
        return 1;


        break;

      case 0x20:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x21:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x22:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x23:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x24:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x25:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x26:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x27:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x28:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x29:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2a:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2b:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2c:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2d:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2e:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x2f:
        // call @n

        write16(get(sp), emf.Maths.add_u16u16(get(pc), 2));;
        set(sp, emf.Maths.add_u16u16(get(sp), lit(2)));;
        set(pc, emf.Maths.add_u16u16(lit(read12(pc.getUnsigned() + (0))), -2));
        pc.add(2);
        return 1;


        break;

      case 0x30:
        // skipeq @r, @n

        if (alu.eq8(get(v0), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x31:
        // skipeq @r, @n

        if (alu.eq8(get(v1), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x32:
        // skipeq @r, @n

        if (alu.eq8(get(v2), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x33:
        // skipeq @r, @n

        if (alu.eq8(get(v3), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x34:
        // skipeq @r, @n

        if (alu.eq8(get(v4), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x35:
        // skipeq @r, @n

        if (alu.eq8(get(v5), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x36:
        // skipeq @r, @n

        if (alu.eq8(get(v6), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x37:
        // skipeq @r, @n

        if (alu.eq8(get(v7), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x38:
        // skipeq @r, @n

        if (alu.eq8(get(v8), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x39:
        // skipeq @r, @n

        if (alu.eq8(get(v9), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3a:
        // skipeq @r, @n

        if (alu.eq8(get(va), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3b:
        // skipeq @r, @n

        if (alu.eq8(get(vb), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3c:
        // skipeq @r, @n

        if (alu.eq8(get(vc), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3d:
        // skipeq @r, @n

        if (alu.eq8(get(vd), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3e:
        // skipeq @r, @n

        if (alu.eq8(get(ve), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x3f:
        // skipeq @r, @n

        if (alu.eq8(get(vf), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x40:
        // skipneq @r, @n

        if (alu.neq8(get(v0), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x41:
        // skipneq @r, @n

        if (alu.neq8(get(v1), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x42:
        // skipneq @r, @n

        if (alu.neq8(get(v2), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x43:
        // skipneq @r, @n

        if (alu.neq8(get(v3), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x44:
        // skipneq @r, @n

        if (alu.neq8(get(v4), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x45:
        // skipneq @r, @n

        if (alu.neq8(get(v5), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x46:
        // skipneq @r, @n

        if (alu.neq8(get(v6), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x47:
        // skipneq @r, @n

        if (alu.neq8(get(v7), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x48:
        // skipneq @r, @n

        if (alu.neq8(get(v8), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x49:
        // skipneq @r, @n

        if (alu.neq8(get(v9), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4a:
        // skipneq @r, @n

        if (alu.neq8(get(va), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4b:
        // skipneq @r, @n

        if (alu.neq8(get(vb), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4c:
        // skipneq @r, @n

        if (alu.neq8(get(vc), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4d:
        // skipneq @r, @n

        if (alu.neq8(get(vd), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4e:
        // skipneq @r, @n

        if (alu.neq8(get(ve), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x4f:
        // skipneq @r, @n

        if (alu.neq8(get(vf), lit(read8(pc.getUnsigned() + (1))))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(2);
        return 1;


        break;

      case 0x50:
        // skipeq @r, @s
        // return 50_ext();
        // extended instructions beginning 50 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // skipeq @r, @s
        // return 51_ext();
        // extended instructions beginning 51 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // skipeq @r, @s
        // return 52_ext();
        // extended instructions beginning 52 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // skipeq @r, @s
        // return 53_ext();
        // extended instructions beginning 53 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // skipeq @r, @s
        // return 54_ext();
        // extended instructions beginning 54 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // skipeq @r, @s
        // return 55_ext();
        // extended instructions beginning 55 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // skipeq @r, @s
        // return 56_ext();
        // extended instructions beginning 56 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // skipeq @r, @s
        // return 57_ext();
        // extended instructions beginning 57 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // skipeq @r, @s
        // return 58_ext();
        // extended instructions beginning 58 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // skipeq @r, @s
        // return 59_ext();
        // extended instructions beginning 59 called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // skipeq @r, @s
        // return 5a_ext();
        // extended instructions beginning 5a called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // skipeq @r, @s
        // return 5b_ext();
        // extended instructions beginning 5b called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // skipeq @r, @s
        // return 5c_ext();
        // extended instructions beginning 5c called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // skipeq @r, @s
        // return 5d_ext();
        // extended instructions beginning 5d called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // skipeq @r, @s
        // return 5e_ext();
        // extended instructions beginning 5e called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // skipeq @r, @s
        // return 5f_ext();
        // extended instructions beginning 5f called skpe

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpe_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // store @r, @n

        set(v0, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x61:
        // store @r, @n

        set(v1, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x62:
        // store @r, @n

        set(v2, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x63:
        // store @r, @n

        set(v3, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x64:
        // store @r, @n

        set(v4, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x65:
        // store @r, @n

        set(v5, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x66:
        // store @r, @n

        set(v6, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x67:
        // store @r, @n

        set(v7, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x68:
        // store @r, @n

        set(v8, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x69:
        // store @r, @n

        set(v9, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6a:
        // store @r, @n

        set(va, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6b:
        // store @r, @n

        set(vb, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6c:
        // store @r, @n

        set(vc, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6d:
        // store @r, @n

        set(vd, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6e:
        // store @r, @n

        set(ve, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x6f:
        // store @r, @n

        set(vf, lit(read8(pc.getUnsigned() + (1))));
        pc.add(2);
        return 1;


        break;

      case 0x70:
        // add @r, @n

        set(v0, emf.Maths.add_u16u8(get(v0), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x71:
        // add @r, @n

        set(v1, emf.Maths.add_u16u8(get(v1), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x72:
        // add @r, @n

        set(v2, emf.Maths.add_u16u8(get(v2), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x73:
        // add @r, @n

        set(v3, emf.Maths.add_u16u8(get(v3), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x74:
        // add @r, @n

        set(v4, emf.Maths.add_u16u8(get(v4), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x75:
        // add @r, @n

        set(v5, emf.Maths.add_u16u8(get(v5), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x76:
        // add @r, @n

        set(v6, emf.Maths.add_u16u8(get(v6), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x77:
        // add @r, @n

        set(v7, emf.Maths.add_u16u8(get(v7), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x78:
        // add @r, @n

        set(v8, emf.Maths.add_u16u8(get(v8), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x79:
        // add @r, @n

        set(v9, emf.Maths.add_u16u8(get(v9), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7a:
        // add @r, @n

        set(va, emf.Maths.add_u16u8(get(va), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7b:
        // add @r, @n

        set(vb, emf.Maths.add_u16u8(get(vb), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7c:
        // add @r, @n

        set(vc, emf.Maths.add_u16u8(get(vc), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7d:
        // add @r, @n

        set(vd, emf.Maths.add_u16u8(get(vd), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7e:
        // add @r, @n

        set(ve, emf.Maths.add_u16u8(get(ve), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x7f:
        // add @r, @n

        set(vf, emf.Maths.add_u16u8(get(vf), lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0x80:
        // (store @r, @s)
        // return 80_ext();
        // extended instructions beginning 80 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // (store @r, @s)
        // return 81_ext();
        // extended instructions beginning 81 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // (store @r, @s)
        // return 82_ext();
        // extended instructions beginning 82 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // (store @r, @s)
        // return 83_ext();
        // extended instructions beginning 83 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // (store @r, @s)
        // return 84_ext();
        // extended instructions beginning 84 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // (store @r, @s)
        // return 85_ext();
        // extended instructions beginning 85 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // (store @r, @s)
        // return 86_ext();
        // extended instructions beginning 86 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // (store @r, @s)
        // return 87_ext();
        // extended instructions beginning 87 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // (store @r, @s)
        // return 88_ext();
        // extended instructions beginning 88 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // (store @r, @s)
        // return 89_ext();
        // extended instructions beginning 89 called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // (store @r, @s)
        // return 8a_ext();
        // extended instructions beginning 8a called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // (store @r, @s)
        // return 8b_ext();
        // extended instructions beginning 8b called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // (store @r, @s)
        // return 8c_ext();
        // extended instructions beginning 8c called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // (store @r, @s)
        // return 8d_ext();
        // extended instructions beginning 8d called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // (store @r, @s)
        // return 8e_ext();
        // extended instructions beginning 8e called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // (store @r, @s)
        // return 8f_ext();
        // extended instructions beginning 8f called bit

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return bit_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // (skipneq @r, @s)
        // return 90_ext();
        // extended instructions beginning 90 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // (skipneq @r, @s)
        // return 91_ext();
        // extended instructions beginning 91 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // (skipneq @r, @s)
        // return 92_ext();
        // extended instructions beginning 92 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // (skipneq @r, @s)
        // return 93_ext();
        // extended instructions beginning 93 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // (skipneq @r, @s)
        // return 94_ext();
        // extended instructions beginning 94 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // (skipneq @r, @s)
        // return 95_ext();
        // extended instructions beginning 95 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // (skipneq @r, @s)
        // return 96_ext();
        // extended instructions beginning 96 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // (skipneq @r, @s)
        // return 97_ext();
        // extended instructions beginning 97 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // (skipneq @r, @s)
        // return 98_ext();
        // extended instructions beginning 98 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // (skipneq @r, @s)
        // return 99_ext();
        // extended instructions beginning 99 called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // (skipneq @r, @s)
        // return 9a_ext();
        // extended instructions beginning 9a called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // (skipneq @r, @s)
        // return 9b_ext();
        // extended instructions beginning 9b called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // (skipneq @r, @s)
        // return 9c_ext();
        // extended instructions beginning 9c called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // (skipneq @r, @s)
        // return 9d_ext();
        // extended instructions beginning 9d called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // (skipneq @r, @s)
        // return 9e_ext();
        // extended instructions beginning 9e called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // (skipneq @r, @s)
        // return 9f_ext();
        // extended instructions beginning 9f called skpn

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return skpn_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa1:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa2:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa3:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa4:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa5:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa6:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa7:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa8:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xa9:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xaa:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xab:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xac:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xad:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xae:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xaf:
        // ld I, @n

        set(i, lit(read12(pc.getUnsigned() + (0))));
        pc.add(2);
        return 1;


        break;

      case 0xb0:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb1:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb2:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb3:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb4:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb5:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb6:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb7:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb8:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xb9:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xba:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xbb:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xbc:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xbd:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xbe:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xbf:
        // jp @n + V0

        pc.assign(emf.Maths.add_u16u16(read12(pc.getUnsigned() + (0)), get(v0)));
        pc.add(2);
        return 1;


        break;

      case 0xc0:
        // rnd @r, @n

        set(v0, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc1:
        // rnd @r, @n

        set(v1, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc2:
        // rnd @r, @n

        set(v2, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc3:
        // rnd @r, @n

        set(v3, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc4:
        // rnd @r, @n

        set(v4, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc5:
        // rnd @r, @n

        set(v5, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc6:
        // rnd @r, @n

        set(v6, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc7:
        // rnd @r, @n

        set(v7, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc8:
        // rnd @r, @n

        set(v8, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xc9:
        // rnd @r, @n

        set(v9, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xca:
        // rnd @r, @n

        set(va, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xcb:
        // rnd @r, @n

        set(vb, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xcc:
        // rnd @r, @n

        set(vc, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xcd:
        // rnd @r, @n

        set(vd, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xce:
        // rnd @r, @n

        set(ve, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xcf:
        // rnd @r, @n

        set(vf, emf.Maths.random8(lit(read8(pc.getUnsigned() + (1)))));
        pc.add(2);
        return 1;


        break;

      case 0xd0:
        // drw @r, @s, @n
        // return d0_ext();
        // extended instructions beginning d0 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // drw @r, @s, @n
        // return d1_ext();
        // extended instructions beginning d1 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // drw @r, @s, @n
        // return d2_ext();
        // extended instructions beginning d2 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // drw @r, @s, @n
        // return d3_ext();
        // extended instructions beginning d3 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // drw @r, @s, @n
        // return d4_ext();
        // extended instructions beginning d4 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // drw @r, @s, @n
        // return d5_ext();
        // extended instructions beginning d5 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // drw @r, @s, @n
        // return d6_ext();
        // extended instructions beginning d6 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // drw @r, @s, @n
        // return d7_ext();
        // extended instructions beginning d7 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // drw @r, @s, @n
        // return d8_ext();
        // extended instructions beginning d8 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // drw @r, @s, @n
        // return d9_ext();
        // extended instructions beginning d9 called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // drw @r, @s, @n
        // return da_ext();
        // extended instructions beginning da called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // drw @r, @s, @n
        // return db_ext();
        // extended instructions beginning db called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // drw @r, @s, @n
        // return dc_ext();
        // extended instructions beginning dc called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // drw @r, @s, @n
        // return dd_ext();
        // extended instructions beginning dd called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // drw @r, @s, @n
        // return de_ext();
        // extended instructions beginning de called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // drw @r, @s, @n
        // return df_ext();
        // extended instructions beginning df called drw

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return drw_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // key(n)p @r
        // return e0_ext();
        // extended instructions beginning e0 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // key(n)p @r
        // return e1_ext();
        // extended instructions beginning e1 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // key(n)p @r
        // return e2_ext();
        // extended instructions beginning e2 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // key(n)p @r
        // return e3_ext();
        // extended instructions beginning e3 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // key(n)p @r
        // return e4_ext();
        // extended instructions beginning e4 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // key(n)p @r
        // return e5_ext();
        // extended instructions beginning e5 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // key(n)p @r
        // return e6_ext();
        // extended instructions beginning e6 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // key(n)p @r
        // return e7_ext();
        // extended instructions beginning e7 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // key(n)p @r
        // return e8_ext();
        // extended instructions beginning e8 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // key(n)p @r
        // return e9_ext();
        // extended instructions beginning e9 called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // key(n)p @r
        // return ea_ext();
        // extended instructions beginning ea called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // key(n)p @r
        // return eb_ext();
        // extended instructions beginning eb called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // key(n)p @r
        // return ec_ext();
        // extended instructions beginning ec called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // key(n)p @r
        // return ed_ext();
        // extended instructions beginning ed called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // key(n)p @r
        // return ee_ext();
        // extended instructions beginning ee called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // key(n)p @r
        // return ef_ext();
        // extended instructions beginning ef called key

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return key_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // (f)
        // return f0_ext();
        // extended instructions beginning f0 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v0', v0);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // (f)
        // return f1_ext();
        // extended instructions beginning f1 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v1', v1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // (f)
        // return f2_ext();
        // extended instructions beginning f2 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v2', v2);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // (f)
        // return f3_ext();
        // extended instructions beginning f3 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v3', v3);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // (f)
        // return f4_ext();
        // extended instructions beginning f4 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v4', v4);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // (f)
        // return f5_ext();
        // extended instructions beginning f5 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v5', v5);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // (f)
        // return f6_ext();
        // extended instructions beginning f6 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v6', v6);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // (f)
        // return f7_ext();
        // extended instructions beginning f7 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v7', v7);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // (f)
        // return f8_ext();
        // extended instructions beginning f8 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v8', v8);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // (f)
        // return f9_ext();
        // extended instructions beginning f9 called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('v9', v9);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // (f)
        // return fa_ext();
        // extended instructions beginning fa called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('va', va);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // (f)
        // return fb_ext();
        // extended instructions beginning fb called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('vb', vb);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // (f)
        // return fc_ext();
        // extended instructions beginning fc called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('vc', vc);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // (f)
        // return fd_ext();
        // extended instructions beginning fd called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('vd', vd);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // (f)
        // return fe_ext();
        // extended instructions beginning fe called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('ve', ve);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // (f)
        // return ff_ext();
        // extended instructions beginning ff called fxi

        set(pc, emf.Maths.add_u16u16(get(pc), lit(1)));;
        return fxi_ext('vf', vf);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function zero_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // cls

        bus.pulseLow('disp_clear');
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // ret

        set(sp, emf.Maths.add_u16u16(get(sp), lit(-2)));
        set(pc, emf.Maths.add_u16u16(read16(sp), lit(-1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function drw_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v0));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v1));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v2));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v3));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v4));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v5));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v6));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v7));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v8));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(v9));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(va));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vb));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vc));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vd));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(ve));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // drw @r, @s, @n

        var thereg = arguments[1];;
        bus.writeBlock('disp_x', get(thereg));
        bus.writeBlock('disp_y', get(vf));
        bus.writeBlock('disp_h', lit(read4(pc.getUnsigned() + (0))));
        bus.writeBlock('disp_i', get(i));
        bus.pulseLow('disp_op');
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function bit_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v0));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v0)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v0)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v0)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v0)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v0)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v0), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v1));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v1)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v1), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v2));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v2)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v2)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v2), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v3));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v3)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v3)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v3)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v3)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v3)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v3), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v4));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v4)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v4)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v4)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v4)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v4)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v4), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v5));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v5)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v5)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v5)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v5)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v5)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v5), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v6));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v6)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v6)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v6)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v6)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v6)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v6), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v7));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v7)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v7)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v7)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v7)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v7)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v7), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v8));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v8)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v8)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v8)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v8)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v8)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v8), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(v9));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(v9)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(v9)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(v9)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(v9)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(v9)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(v9), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(va));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(va)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(va)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(va)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(va)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(va)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(va), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(vb));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(vb)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(vb)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(vb)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(vb)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(vb)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(vb), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(vc));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(vc)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(vc)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(vc)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(vc)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(vc)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(vc), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(vd));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(vd)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(vd)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(vd)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(vd)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(vd)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(vd), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(ve));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(ve)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(ve)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(ve)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(ve)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(ve)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(ve), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // store @r, @s

        var thereg = arguments[1];;
        set(thereg, get(vf));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // or @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.or8(get(thereg), get(vf)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // and @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.and8(get(thereg), get(vf)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // xor @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.xor8(get(thereg), get(vf)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // addc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.add_u8u8c(get(thereg), get(vf)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // subc @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(thereg), get(vf)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        var thereg = arguments[1];;
        set(thereg, alu.lsr8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // subn @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.sub_u8u8b(get(vf), get(thereg)));
        wasCarry = !wasCarry;
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // shl @r, @s

        var thereg = arguments[1];;
        set(thereg, alu.lsl8(get(thereg), lit(1)));
        affectFlagC();
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function skpe_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v0))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v1))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v2))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v3))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v4))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v5))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v6))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v7))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v8))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(v9))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(va))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(vb))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(vc))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(vd))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(ve))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // skpeq @r, @s

        var thereg = arguments[1];;
        if (alu.eq8(get(thereg), get(vf))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function skpn_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v0))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v1))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v2))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v3))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v4))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v5))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v6))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v7))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v8))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(v9))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(va))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(vb))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(vc))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(vd))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(ve))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // skpneq @r, @s

        var thereg = arguments[1];;
        if (alu.neq8(get(thereg), get(vf))) set(pc, emf.Maths.add_u16u16(pc, lit(1)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function key_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // keyp @r

        var thereg = arguments[1];;
        if (isKeyPressed(get(thereg))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // keynp @r

        var thereg = arguments[1];;
        if (isKeyNotPressed(get(thereg))) set(pc, emf.Maths.add_u16u16(pc, lit(2)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }

  function fxi_ext() {
    var bit;
    var opcode = fetch8()
    var cycles = 1;

    switch (opcode) {
      case 0x0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7:
        // ld @r, DT

        var thereg = arguments[1];;
        set(thereg, get(dt));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa:
        // ld @r, K

        var thereg = arguments[1];;
        sysHaltUntilKey(thereg);
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x10:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x11:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x12:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x13:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x14:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x15:
        // ld DT, @r

        var thereg = arguments[1];;
        set(dt, get(thereg));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x16:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x17:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x18:
        // ld ST, @r

        var thereg = arguments[1];;
        set(st, get(thereg));
        if (st.get() > 2) {
          bus.setHigh('beep');
        };
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x19:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1e:
        // add I, @r

        var thereg = arguments[1];;
        set(i, emf.Maths.add_u16u16(get(i), get(thereg)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x1f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x20:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x21:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x22:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x23:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x24:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x25:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x26:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x27:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x28:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x29:
        // set I, (@r)

        var thereg = arguments[1];;
        set(i, emf.Maths.add_u16u16(0x00, 5 * (get(thereg) & 0xf)));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x2f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x30:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x31:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x32:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x33:
        // bcd I, (@r)

        var thereg = arguments[1];;
        alu_bcd(get(i), get(thereg));
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x34:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x35:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x36:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x37:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x38:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x39:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x3f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x40:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x41:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x42:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x43:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x44:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x45:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x46:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x47:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x48:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x49:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x4f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x50:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x51:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x52:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x53:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x54:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x55:
        // cpy [I], v0-@r

        var theregname = arguments[0];;
        alu_copyto(get(i), theregname);
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x56:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x57:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x58:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x59:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x5f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x60:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x61:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x62:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x63:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x64:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x65:
        // cpy v0-@r, [I]

        var theregname = arguments[0];;
        alu_copyfrom(get(i), theregname);
        pc.add(1);
        return 1;


        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x66:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x67:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x68:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x69:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x6f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x70:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x71:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x72:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x73:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x74:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x75:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x76:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x77:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x78:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x79:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x7f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x80:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x81:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x82:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x83:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x84:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x85:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x86:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x87:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x88:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x89:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x8f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x90:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x91:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x92:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x93:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x94:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x95:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x96:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x97:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x98:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x99:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9a:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9b:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9c:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9d:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9e:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0x9f:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xa9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xab:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xac:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xad:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xae:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xaf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xb9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xba:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xbf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xc9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xca:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xce:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xcf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xd9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xda:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xde:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xdf:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xe9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xea:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xeb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xec:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xed:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xee:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xef:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf0:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf1:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf2:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf3:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf4:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf5:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf6:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf7:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf8:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xf9:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfa:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfb:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfc:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfd:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xfe:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

      case 0xff:
        // dc.b @n

        pc.add(-1);;
        pc.add(1);
        return 1;


        break;

    } // hctiws
    return 1;
  }
  // importEmulatorALU
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let set ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let sysHaltUntilKey ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let set ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let set ;
  // let get() > 2) ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let set ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let set ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let alu_bcd ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let alu_copyto ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let alu_copyfrom ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;
  // let add(-1 ;

  /*
   **
   ** State
   **
   */
  function getState() {
    gsRegisterV0.assign(getRegisterValueV0());
    gsRegisterV1.assign(getRegisterValueV1());
    gsRegisterV2.assign(getRegisterValueV2());
    gsRegisterV3.assign(getRegisterValueV3());
    gsRegisterV4.assign(getRegisterValueV4());
    gsRegisterV5.assign(getRegisterValueV5());
    gsRegisterV6.assign(getRegisterValueV6());
    gsRegisterV7.assign(getRegisterValueV7());
    gsRegisterV8.assign(getRegisterValueV8());
    gsRegisterV9.assign(getRegisterValueV9());
    gsRegisterVA.assign(getRegisterValueVA());
    gsRegisterVB.assign(getRegisterValueVB());
    gsRegisterVC.assign(getRegisterValueVC());
    gsRegisterVD.assign(getRegisterValueVD());
    gsRegisterVE.assign(getRegisterValueVE());
    gsRegisterVF.assign(getRegisterValueVF());
    gsRegisterSP.assign(getRegisterValueSP());
    gsRegisterPC.assign(getRegisterValuePC());
    gsRegisterI.assign(getRegisterValueI());
    gsRegisterST.assign(getRegisterValueST());
    gsRegisterDT.assign(getRegisterValueDT());
    gsRegisterKF.assign(getRegisterValueKF());
    return {
      flags: {
        c: getFlagC(),
      },

      registers: {
        v0: gsRegisterV0,
        v1: gsRegisterV1,
        v2: gsRegisterV2,
        v3: gsRegisterV3,
        v4: gsRegisterV4,
        v5: gsRegisterV5,
        v6: gsRegisterV6,
        v7: gsRegisterV7,
        v8: gsRegisterV8,
        v9: gsRegisterV9,
        va: gsRegisterVA,
        vb: gsRegisterVB,
        vc: gsRegisterVC,
        vd: gsRegisterVD,
        ve: gsRegisterVE,
        vf: gsRegisterVF,
        sp: gsRegisterSP,
        pc: gsRegisterPC,
        i: gsRegisterI,
        st: gsRegisterST,
        dt: gsRegisterDT,
        kf: gsRegisterKF,
      },

      state: {
        inHalt: inHalt,
      },
    };
  }

  function setState(newState) {
    // registers:
    if (typeof newState.registers.v0 !== typeof undefined) {
      setRegisterValueV0(newState.registers.v0);
    }
    if (typeof newState.registers.v1 !== typeof undefined) {
      setRegisterValueV1(newState.registers.v1);
    }
    if (typeof newState.registers.v2 !== typeof undefined) {
      setRegisterValueV2(newState.registers.v2);
    }
    if (typeof newState.registers.v3 !== typeof undefined) {
      setRegisterValueV3(newState.registers.v3);
    }
    if (typeof newState.registers.v4 !== typeof undefined) {
      setRegisterValueV4(newState.registers.v4);
    }
    if (typeof newState.registers.v5 !== typeof undefined) {
      setRegisterValueV5(newState.registers.v5);
    }
    if (typeof newState.registers.v6 !== typeof undefined) {
      setRegisterValueV6(newState.registers.v6);
    }
    if (typeof newState.registers.v7 !== typeof undefined) {
      setRegisterValueV7(newState.registers.v7);
    }
    if (typeof newState.registers.v8 !== typeof undefined) {
      setRegisterValueV8(newState.registers.v8);
    }
    if (typeof newState.registers.v9 !== typeof undefined) {
      setRegisterValueV9(newState.registers.v9);
    }
    if (typeof newState.registers.va !== typeof undefined) {
      setRegisterValueVA(newState.registers.va);
    }
    if (typeof newState.registers.vb !== typeof undefined) {
      setRegisterValueVB(newState.registers.vb);
    }
    if (typeof newState.registers.vc !== typeof undefined) {
      setRegisterValueVC(newState.registers.vc);
    }
    if (typeof newState.registers.vd !== typeof undefined) {
      setRegisterValueVD(newState.registers.vd);
    }
    if (typeof newState.registers.ve !== typeof undefined) {
      setRegisterValueVE(newState.registers.ve);
    }
    if (typeof newState.registers.vf !== typeof undefined) {
      setRegisterValueVF(newState.registers.vf);
    }
    if (typeof newState.registers.sp !== typeof undefined) {
      setRegisterValueSP(newState.registers.sp);
    }
    if (typeof newState.registers.pc !== typeof undefined) {
      setRegisterValuePC(newState.registers.pc);
    }
    if (typeof newState.registers.i !== typeof undefined) {
      setRegisterValueI(newState.registers.i);
    }
    if (typeof newState.registers.st !== typeof undefined) {
      setRegisterValueST(newState.registers.st);
    }
    if (typeof newState.registers.dt !== typeof undefined) {
      setRegisterValueDT(newState.registers.dt);
    }
    if (typeof newState.registers.kf !== typeof undefined) {
      setRegisterValueKF(newState.registers.kf);
    }

    // Flags:
    if (typeof newState.flags.c !== typeof undefined) {
      changeFlagC(newState.flags.c);
    }

    // state
    if (typeof newState.state.inHalt !== typeof undefined) {
      inHalt = newState.state.inHalt;
    }
  }


  /*
   **
   ** Expose this API
   **
   */
  return {
    start,
    reset,
    update,
    getState,
    setState,
    getRegisterValueV0,
    setRegisterValueV0,
    getRegisterValueV1,
    setRegisterValueV1,
    getRegisterValueV2,
    setRegisterValueV2,
    getRegisterValueV3,
    setRegisterValueV3,
    getRegisterValueV4,
    setRegisterValueV4,
    getRegisterValueV5,
    setRegisterValueV5,
    getRegisterValueV6,
    setRegisterValueV6,
    getRegisterValueV7,
    setRegisterValueV7,
    getRegisterValueV8,
    setRegisterValueV8,
    getRegisterValueV9,
    setRegisterValueV9,
    getRegisterValueVA,
    setRegisterValueVA,
    getRegisterValueVB,
    setRegisterValueVB,
    getRegisterValueVC,
    setRegisterValueVC,
    getRegisterValueVD,
    setRegisterValueVD,
    getRegisterValueVE,
    setRegisterValueVE,
    getRegisterValueVF,
    setRegisterValueVF,
    getRegisterValueSP,
    setRegisterValueSP,
    getRegisterValuePC,
    setRegisterValuePC,
    getRegisterValueI,
    setRegisterValueI,
    getRegisterValueST,
    setRegisterValueST,
    getRegisterValueDT,
    setRegisterValueDT,
    getRegisterValueKF,
    setRegisterValueKF,
    getRegisterValue,
    setRegisterValue,
    setFlagValue,
  }
});