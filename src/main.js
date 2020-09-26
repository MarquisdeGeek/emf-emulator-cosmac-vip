let gStateVars = {
  // Settings
  autoUpdate: true,

  // Emulation
  machine: undefined,
  controller: undefined,
  framework: undefined,
  importer: undefined,

  // State
  previousCPUState: undefined,
};

$(window).load(function() {
  SGXPrepare_OS();
});

function menuAbout() {
  $('#menuAboutModal').modal('show');
}

function SGXPrepare_OS() {
  let options = {};
  let params = (new URL(document.location)).searchParams;

  // INCLUDE:OPTIONS

  gStateVars.machine = new emfcosmac(options)
  gStateVars.controller = new emf.controller(gStateVars.machine, {
    onStart: function() {
      $('#emu_state').html("Running");
    },
    onStop: function() {
      $('#emu_state').html("Stopped");
      uiRefresh(gStateVars.machine);
    },
    onUpdate: function() {
      if (gStateVars.autoUpdate && gStateVars.controller.isRunning()) {
        uiRefresh(gStateVars.machine);
      }
    },
  });
  gStateVars.framework = new emf.framework(gStateVars.machine);
  gStateVars.importer = new emf.importer();
  gStateVars.framework.createMemoryDisplay({
    divTab: '#myTab',
    divContentsTab: '#myTabContent'
  });
  gStateVars.framework.populateMemoryDisplay(true);
}

// EMF - Emulation Framework - em.ulat.es

// FILE: ui/web/helpers.js
// PURPOSE: Code added to the global scope of each .JS file, e.g. development.js, assembler.js

function patchHires(machine) {
  // Patch for hi-res iplementations
  if (machine.bus.memory.read16(0x200) === 0x1260) {
    machine.bus.memory.write16(0x200, 0x12C0);
  }
}

function SGXinit() {
  // NOP
}

function SGXstart() {
  gStateVars.machine.start();

  uiConfigure(gStateVars.machine);

  startRunning();
}

function SGXdraw() {
  // NOP
}

function SGXupdate(telaps) {
  Main.pause();
}


function startRunning() {
  gStateVars.controller.startRunning();
  uiRefresh(gStateVars.machine);
}

function stopRunning() {
  gStateVars.controller.stopRunning();
  uiRefresh(gStateVars.machine);
}

function uiConfigure(m) {

  if (gStateVars.machine.description) {
    $('#emf_title').html(gStateVars.machine.description);
  }

  $('#emf_step').click(function(ev) {
    gStateVars.controller.step();
    uiRefresh(m);
  });

  $('#emf_stop').click(function(ev) {
    stopRunning();
  });

  $('#emf_run').click(function(ev) {
    startRunning();
  });

  $('#emf_reset').click(function(ev) {
    m.reset();
    if (typeof uiReflect2Emulator !== typeof undefined) {
      uiReflect2Emulator();
    }
    uiRefresh(m);
  });

  $('#emf_export').click(function(ev) {
    let exporter = new emf.exporter();
    let state = exporter.emfMachine(gStateVars.machine);
    let saveas = new emf.saveAs();
    saveas.saveAs(`emf_${gStateVars.machine.name}_state.emf`, state);
  });

  $('#opt_auto_update').click(function(ev) {
    gStateVars.autoUpdate = $("#opt_auto_update").is(":checked");
  });

  $('.emf_info').hide();

  function uiReflect2Emulator() {
    if ($("#emf_mute").is(":checked")) {
      m.bus.setHigh('mute');
    } else {
      m.bus.setLow('mute');
    }
  }

  $('#emf_mute').click(function(ev) {
    uiReflect2Emulator();
  });

  function loadResource(filename, div, pc) {
    $('.emf_info').hide();

    gStateVars.importer.byURL(`emf/sw/${filename}`)
      .then(function(data) {
        $(div).show();
        //
        let startAddress = typeof pc === typeof undefined ? 0x200 : pc;
        gStateVars.controller.coldLoadData(name, data, {
          startAddress: startAddress,
          patch: patchHires
        });
      })
  }


  // Demos
  $('#emf_load_particles').click(function(ev) {
    loadResource("particles.bin", '#emf_info_particles');
  });

  $('#emf_load_sierpinski').click(function(ev) {
    loadResource("sierpinski.bin", '#emf_info_sierpinski');
  });

  $('#emf_load_stars').click(function(ev) {
    loadResource("stars.bin", '#emf_info_stars');
  });

  $('#emf_load_maze').click(function(ev) {
    loadResource("maze_hi.bin", '#emf_info_maze');
  });
  new emf.dragDrop('SGXCanvas', m, function(filename, data) {
    importMachineData(gStateVars.machine, filename, data);
    uiRefresh(m);
  });

  $('#emu_state').html("Loaded...");
}

function importMachineData(machine, filename, data) {
  gStateVars.controller.coldLoadData(name, data, {
    startAddress: 0x200,
    patch: patchHires
  });
}

function uiRefresh(m) {
  let memoryRanges = m.bus.memory.getAddressRanges();
  let pc = m.bus.cpu.emulate.getRegisterValuePC();
  let addrFrom = pc;
  let lines = $('#SGXCanvas').height() / 14; // rule of thumb/guestimate

  gStateVars.framework.disassembleRows('#emf_disassembly_solo', m.bus.cpu, addrFrom, lines, pc);
  gStateVars.framework.registers('#emf_registers', m.bus.cpu, gStateVars.previousCPUState);
  gStateVars.framework.populateMemoryDisplay();
  //
  gStateVars.previousCPUState = m.bus.cpu.emulate.getState();
}