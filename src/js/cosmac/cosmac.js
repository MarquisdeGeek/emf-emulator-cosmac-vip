/*
 **
 ** EMF Machine : auto-gen : cosmac
 **
 */
function emfcosmac(options) {
  options = options || {};
  options.cpu = options.cpu || {};
  options.cpu.directMemory = typeof options.cpu.directMemory === typeof undefined ? true : options.cpu.directMemory
  options.cpu.directFetch = typeof options.cpu.directFetch === typeof undefined ? true : options.cpu.directFetch
  options.memory = options.memory || {};
  // 

  /*
   **
   ** Create the machine
   **
   */
  let m = {};
  m.name = "cosmac";
  m.description = "Cosmac VIP";

  /*
   **
   ** Create the bus
   **
   */
  m.bus = new emf.bus({
    reset: function() {
      m.bus.setHigh('keyup');
      m.bus.setHigh('keydown');
      m.bus.setHigh('vf');
      m.bus.setHigh('disp_op');
      m.bus.setHigh('disp_clear');
      m.bus.setHigh('timer60');
      m.bus.setLow('beep');
      m.bus.setLow('mute');
    }
  });

  /*
   **
   ** Add everything in the device object
   **
   */
  m.device = {};
  m.device.cpu = {};
  m.device.cpu.name = "cpu";
  m.device.cpu.getState = function() {
    let state = m.device.cpu.emulate.getState();
    Object.keys(state.registers).map((r) => state.registers[r] = state.registers[r].getUnsigned());
    return state;
  }
  m.device.cpu.setState = function(json) {
    return m.device.cpu.emulate.setState(json);
  }
  m.device.cpu.emulate = new cosmac_cpu_emulator(m.bus, options.cpu);
  m.device.cpu.disassemble = new cosmac_cpu_disassemble(m.bus, options.cpu);
  m.device.cpu.assemble = new cosmac_cpu_assemble(m.bus, options.cpu);
  m.device.memory = new cosmac_memory(m.bus, options.memory);
  m.device.display = new cosmac_display(m.bus, options.display);
  m.device.audio = new cosmac_audio(m.bus, options.audio);
  m.device.keyboard = new cosmac_keyboard(m.bus, options.keyboard);

  /*
   **
   ** Attach devices to the bus
   **
   */
  m.bus.cpu = m.device.cpu;
  m.bus.memory = m.device.memory;
  m.bus.display = m.device.display;
  m.bus.audio = m.device.audio;
  m.bus.keyboard = m.device.keyboard;

  /*
   **
   ** State
   **
   */
  m.state = {};
  m.state.cpu = {};
  m.state.display = {};
  m.state.audio = {};
  m.state.keyboard = {};

  /*
   **
   ** Clocks
   **
   */
  m.bus.clock = {};
  m.clock = {};
  m.clock.cpu = new cosmac_clock_cpu(m, options);
  m.bus.clock.cpu = m.clock.cpu;
  m.clock.timer = new cosmac_clock_timer(m, options);
  m.bus.clock.timer = m.clock.timer;

  /*
   **
   ** Construction complete - initialisation methods
   **
   */
  m.start = function() {
    let processed = {};
    m.bus.reset();
    if (m.bus.cpu.emulate.start) processed.cpu = m.bus.cpu.emulate.start(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.start) processed.cpu = m.bus.cpu.disassemble.start(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.start) processed.cpu = m.bus.cpu.assemble.start(m.bus.cpu, arguments);
    if (m.bus.memory.start) processed.memory = m.bus.memory.start(m.bus.memory, arguments);
    if (m.bus.display.start) processed.display = m.bus.display.start(m.bus.display, arguments);
    if (m.bus.audio.start) processed.audio = m.bus.audio.start(m.bus.audio, arguments);
    if (m.bus.keyboard.start) processed.keyboard = m.bus.keyboard.start(m.bus.keyboard, arguments);
    if (m.clock.cpu.start) m.clock.cpu.start(m.clock.cpu, arguments);
    if (m.clock.timer.start) m.clock.timer.start(m.clock.timer, arguments);
    return processed;
  };
  m.reset = function() {
    let processed = {};
    m.bus.reset();
    if (m.bus.cpu.emulate.reset) processed.cpu = m.bus.cpu.emulate.reset(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.reset) processed.cpu = m.bus.cpu.disassemble.reset(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.reset) processed.cpu = m.bus.cpu.assemble.reset(m.bus.cpu, arguments);
    if (m.bus.memory.reset) processed.memory = m.bus.memory.reset(m.bus.memory, arguments);
    if (m.bus.display.reset) processed.display = m.bus.display.reset(m.bus.display, arguments);
    if (m.bus.audio.reset) processed.audio = m.bus.audio.reset(m.bus.audio, arguments);
    if (m.bus.keyboard.reset) processed.keyboard = m.bus.keyboard.reset(m.bus.keyboard, arguments);
    if (m.clock.cpu.reset) m.clock.cpu.reset(m.clock.cpu, arguments);
    if (m.clock.timer.reset) m.clock.timer.reset(m.clock.timer, arguments);
    return processed;
  };
  m.getState = function() {
    let processed = {};
    if (m.bus.cpu.emulate.getState) processed.cpu = m.bus.cpu.emulate.getState(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.getState) processed.cpu = m.bus.cpu.disassemble.getState(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.getState) processed.cpu = m.bus.cpu.assemble.getState(m.bus.cpu, arguments);
    if (m.bus.memory.getState) processed.memory = m.bus.memory.getState(m.bus.memory, arguments);
    if (m.bus.display.getState) processed.display = m.bus.display.getState(m.bus.display, arguments);
    if (m.bus.audio.getState) processed.audio = m.bus.audio.getState(m.bus.audio, arguments);
    if (m.bus.keyboard.getState) processed.keyboard = m.bus.keyboard.getState(m.bus.keyboard, arguments);
    if (m.clock.cpu.getState) m.clock.cpu.getState(m.clock.cpu, arguments);
    if (m.clock.timer.getState) m.clock.timer.getState(m.clock.timer, arguments);
    return processed;
  };
  m.setState = function() {
    let processed = {};
    if (m.bus.cpu.emulate.setState) processed.cpu = m.bus.cpu.emulate.setState(m.bus.cpu, arguments);
    if (m.bus.cpu.disassemble.setState) processed.cpu = m.bus.cpu.disassemble.setState(m.bus.cpu, arguments);
    if (m.bus.cpu.assemble.setState) processed.cpu = m.bus.cpu.assemble.setState(m.bus.cpu, arguments);
    if (m.bus.memory.setState) processed.memory = m.bus.memory.setState(m.bus.memory, arguments);
    if (m.bus.display.setState) processed.display = m.bus.display.setState(m.bus.display, arguments);
    if (m.bus.audio.setState) processed.audio = m.bus.audio.setState(m.bus.audio, arguments);
    if (m.bus.keyboard.setState) processed.keyboard = m.bus.keyboard.setState(m.bus.keyboard, arguments);
    if (m.clock.cpu.setState) m.clock.cpu.setState(m.clock.cpu, arguments);
    if (m.clock.timer.setState) m.clock.timer.setState(m.clock.timer, arguments);
    return processed;
  };
  m.update = function(how) {
    let processed = {};
    processed.cpu = m.device.cpu.emulate.update(how);
    return processed;
  };


  /*
   **
   ** Device-specific options - essentially globals
   **
   */
  m.options = {};
  m.options.disassemble = {};
  m.options.disassemble.widthColumnHex = 12;
  m.options.disassemble.widthColumnInstruction = 14;

  return m;
}