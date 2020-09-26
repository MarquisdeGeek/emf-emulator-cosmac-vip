// cosmac_cpu_disassemble
let cosmac_cpu_disassemble = (function(bus, options) {
  function disassemble(address) {
    return step(bus, address);
  }

  function getAddressText16(address) {
    let label = bus.memory.getLabel(address);
    if (label) {
      return label;
    }
    return emf.utils.hex16(address) + "H"
  }
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

  function start() {
    read8 = bus.memory.read8;
    read16 = bus.memory.read16;
  }

  function step(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // cls_ret
        dis = zero_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x1:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x01";
        return dis;
        break;

      case 0x2:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x02";
        return dis;
        break;

      case 0x3:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x03";
        return dis;
        break;

      case 0x4:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x04";
        return dis;
        break;

      case 0x5:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x05";
        return dis;
        break;

      case 0x6:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x06";
        return dis;
        break;

      case 0x7:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x07";
        return dis;
        break;

      case 0x8:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x08";
        return dis;
        break;

      case 0x9:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x09";
        return dis;
        break;

      case 0xa:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0a";
        return dis;
        break;

      case 0xb:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0b";
        return dis;
        break;

      case 0xc:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0c";
        return dis;
        break;

      case 0xd:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0d";
        return dis;
        break;

      case 0xe:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0e";
        return dis;
        break;

      case 0xf:
        // Unknown operation
        dis.byte_length = 1;
        dis.instruction = "dc.b 0x0f";
        return dis;
        break;

      case 0x10:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x11:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x12:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x13:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x14:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x15:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x16:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x17:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x18:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x19:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1a:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1b:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1c:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1d:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1e:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x1f:
        // jp @n

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x20:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x21:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x22:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x23:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x24:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x25:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x26:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x27:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x28:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x29:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2a:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2b:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2c:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2d:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2e:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x2f:
        // call @n

        dis.byte_length = 2;
        dis.instruction = "call " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0x30:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v0, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v1, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v2, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v3, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v4, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v5, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v6, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v7, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v8, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq v9, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq va, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq vb, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq vc, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq vd, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq ve, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // skipeq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipeq vf, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v0, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v1, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v2, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v3, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v4, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v5, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v6, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v7, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v8, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq v9, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq va, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq vb, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq vc, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq vd, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq ve, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // skipneq @r, @n

        dis.byte_length = 2;
        dis.instruction = "skipneq vf, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x51:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x52:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x53:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x54:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x55:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x56:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x57:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x58:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x59:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5a:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5b:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5c:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5d:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5e:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x5f:
        // skipeq @r, @s
        dis = skpe_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x60:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v0, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v1, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v2, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v3, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v4, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v5, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v6, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v7, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v8, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store v9, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store va, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store vb, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store vc, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store vd, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store ve, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // store @r, @n

        dis.byte_length = 2;
        dis.instruction = "store vf, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v0, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v1, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v2, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v3, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v4, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v5, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v6, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v7, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v8, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add v9, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add va, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add vb, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add vc, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add vd, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add ve, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // add @r, @n

        dis.byte_length = 2;
        dis.instruction = "add vf, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x81:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x82:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x83:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x84:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x85:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x86:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x87:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x88:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x89:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8a:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8b:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8c:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8d:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8e:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x8f:
        // (store @r, @s)
        dis = bit_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x90:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x91:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x92:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x93:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x94:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x95:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x96:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x97:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x98:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x99:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9a:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9b:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9c:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9d:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9e:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0x9f:
        // (skipneq @r, @s)
        dis = skpn_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xa0:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa1:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa2:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa3:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa4:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa5:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa6:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa7:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa8:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xa9:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xaa:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xab:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xac:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xad:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xae:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xaf:
        // ld I, @n

        dis.byte_length = 2;
        dis.instruction = "ld I, " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H";
        return dis;

        break;

      case 0xb0:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb1:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb2:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb3:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb4:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb5:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb6:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb7:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb8:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xb9:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xba:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xbb:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xbc:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xbd:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xbe:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xbf:
        // jp @n + V0

        dis.byte_length = 2;
        dis.instruction = "jp " + (("0000" + read12(addr + 0).toString(16)).substr(-3)) + "H + V0";
        return dis;

        break;

      case 0xc0:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v0, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v1, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v2, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v3, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v4, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v5, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v6, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v7, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v8, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd v9, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd va, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd vb, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd vc, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd vd, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd ve, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // rnd @r, @n

        dis.byte_length = 2;
        dis.instruction = "rnd vf, " + (("0000" + read8(addr + 1).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd1:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd2:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd3:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd4:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd5:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd6:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd7:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd8:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xd9:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xda:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdb:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdc:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdd:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xde:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xdf:
        // drw @r, @s, @n
        dis = drw_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe0:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe1:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe2:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe3:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe4:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe5:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe6:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe7:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe8:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xe9:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xea:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xeb:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xec:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xed:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xee:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xef:
        // key(n)p @r
        dis = key_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf0:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf1:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf2:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf3:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf4:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf5:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf6:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf7:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf8:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xf9:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xfa:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xfb:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xfc:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xfd:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xfe:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

      case 0xff:
        // (f)
        dis = fxi_ext(bus, addr + 1);
        dis.byte_length += 1;
        return dis;
        break;

    } // hctiws
    return dis;
  }

  function zero_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // cls

        dis.byte_length = 1;
        dis.instruction = "cls";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // ret

        dis.byte_length = 1;
        dis.instruction = "ret";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function drw_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v0, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x10:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x11:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x12:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x13:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x14:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x15:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x16:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x17:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x18:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x19:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x1f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v1, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x20:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x21:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x22:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x23:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x24:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x25:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x26:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x27:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x28:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x29:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x2f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v2, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x30:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x31:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x32:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x33:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x34:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x35:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x36:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x37:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x38:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x39:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x3f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v3, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x40:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x41:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x42:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x43:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x44:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x45:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x46:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x47:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x48:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x49:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x4f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v4, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x50:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x51:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x52:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x53:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x54:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x55:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x56:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x57:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x58:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x59:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x5f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v5, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x60:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x61:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x62:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x63:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x64:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x65:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x66:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x67:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x68:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x69:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x6f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v6, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x70:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x71:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x72:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x73:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x74:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x75:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x76:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x77:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x78:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x79:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x7f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v7, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x80:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x81:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x82:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x83:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x84:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x85:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x86:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x87:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x88:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x89:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x8f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v8, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x90:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x91:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x92:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x93:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x94:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x95:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x96:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x97:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x98:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x99:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9a:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9b:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9c:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9d:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9e:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0x9f:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, v9, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xa9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xaa:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xab:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xac:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xad:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xae:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xaf:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, va, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xb9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xba:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xbb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xbc:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xbd:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xbe:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xbf:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vb, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xc9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xca:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcc:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcd:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xce:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xcf:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vc, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xd9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xda:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdc:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdd:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xde:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xdf:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vd, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xe9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xea:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xeb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xec:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xed:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xee:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xef:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, ve, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf0:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf1:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf2:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf3:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf4:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf5:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf6:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf7:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf8:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xf9:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xfa:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xfb:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xfc:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xfd:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xfe:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

      case 0xff:
        // drw @r, @s, @n

        dis.byte_length = 1;
        dis.instruction = "drw @r, vf, " + (("0000" + read4(addr + 0).toString(16)).substr(-1)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function bit_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // store @r, @s

        dis.byte_length = 1;
        dis.instruction = "store @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // or @r, @s

        dis.byte_length = 1;
        dis.instruction = "or @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // and @r, @s

        dis.byte_length = 1;
        dis.instruction = "and @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // xor @r, @s

        dis.byte_length = 1;
        dis.instruction = "xor @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // addc @r, @s

        dis.byte_length = 1;
        dis.instruction = "addc @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // subc @r, @s

        dis.byte_length = 1;
        dis.instruction = "subc @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // shr @r, @s
        // Reference:  page 
        // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

        dis.byte_length = 1;
        dis.instruction = "shr @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // subn @r, @s

        dis.byte_length = 1;
        dis.instruction = "subn @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // shl @r, @s

        dis.byte_length = 1;
        dis.instruction = "shl @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function skpe_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // skpeq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpeq @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function skpn_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v0";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v1";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v2";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v3";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v4";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v5";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v6";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v7";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v8";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, v9";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, va";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, vb";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, vc";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, vd";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, ve";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // skpneq @r, @s

        dis.byte_length = 1;
        dis.instruction = "skpneq @r, vf";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function key_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // keyp @r

        dis.byte_length = 1;
        dis.instruction = "keyp @r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // keynp @r

        dis.byte_length = 1;
        dis.instruction = "keynp @r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }

  function fxi_ext(bus, addr) {
    var dis = new Object();
    dis.instruction = "Unknown opcode";
    dis.byte_length = 1;
    var instr; /* of type uint */
    let pc = new emf.Number(16, 2, addr);
    let opcode = read8(addr);

    switch (opcode) {
      case 0x0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7:
        // ld @r, DT

        dis.byte_length = 1;
        dis.instruction = "ld @r, DT";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa:
        // ld @r, K

        dis.byte_length = 1;
        dis.instruction = "ld @r, K";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x10:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x11:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x12:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x13:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x14:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x15:
        // ld DT, @r

        dis.byte_length = 1;
        dis.instruction = "ld DT, @r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x16:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x17:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x18:
        // ld ST, @r

        dis.byte_length = 1;
        dis.instruction = "ld ST, @r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x19:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1e:
        // add I, @r

        dis.byte_length = 1;
        dis.instruction = "add I, @r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x1f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x20:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x21:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x22:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x23:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x24:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x25:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x26:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x27:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x28:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x29:
        // set I, (@r)

        dis.byte_length = 1;
        dis.instruction = "set I, (@r)";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x2f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x30:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x31:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x32:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x33:
        // bcd I, (@r)

        dis.byte_length = 1;
        dis.instruction = "bcd I, (@r)";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x34:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x35:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x36:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x37:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x38:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x39:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x3f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x40:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x41:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x42:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x43:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x44:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x45:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x46:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x47:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x48:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x49:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x4f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x50:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x51:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x52:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x53:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x54:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x55:
        // cpy [I], v0-@r

        dis.byte_length = 1;
        dis.instruction = "cpy [I], v0-@r";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x56:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x57:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x58:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x59:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x5f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x60:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x61:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x62:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x63:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x64:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x65:
        // cpy v0-@r, [I]

        dis.byte_length = 1;
        dis.instruction = "cpy v0-@r, [I]";
        return dis;

        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x66:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x67:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x68:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x69:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x6f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x70:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x71:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x72:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x73:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x74:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x75:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x76:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x77:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x78:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x79:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x7f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x80:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x81:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x82:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x83:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x84:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x85:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x86:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x87:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x88:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x89:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x8f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x90:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x91:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x92:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x93:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x94:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x95:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x96:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x97:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x98:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x99:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9a:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9b:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9c:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9d:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9e:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0x9f:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xa9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xab:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xac:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xad:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xae:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xaf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xb9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xba:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xbf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xc9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xca:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xce:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xcf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xd9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xda:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xde:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xdf:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xe9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xea:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xeb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xec:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xed:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xee:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xef:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf0:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf1:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf2:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf3:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf4:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf5:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf6:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf7:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf8:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xf9:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfa:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfb:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfc:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfd:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xfe:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

      case 0xff:
        // dc.b @n

        dis.byte_length = 1;
        dis.instruction = "dc.b " + (("0000" + read8(addr + 0).toString(16)).substr(-2)) + "H";
        return dis;

        break;

    } // hctiws
    return dis;
  }
  return {
    start,
    disassemble
  }
});