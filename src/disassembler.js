let gStateVars = {
  machine: undefined,
  framework: undefined,
  importer: undefined,
};

$(window).load(function() {
  SGXPrepare_OS();
});

function menuAbout() {
  $('#menuAboutModal').modal('show');
}

function SGXPrepare_OS() {
  let options = {};

  gStateVars.machine = new emfcosmac(options)

  gStateVars.framework = new emf.framework(gStateVars.machine);
  gStateVars.importer = new emf.importer();
  gStateVars.controller = new emf.controller(gStateVars.machine);

  gStateVars.machine.options.framework = {
    memoryView: {}
  };
  gStateVars.machine.options.framework.memoryView.width = 16;
  gStateVars.machine.options.framework.memoryView.showASCII = true;

  uiRefresh(gStateVars.machine);
}

function SGXinit() {
  // NOP
}

function SGXstart() {
  gStateVars.machine.start();
  uiConfigure(gStateVars.machine);
}

function SGXdraw() {
  // NOP
}

function SGXupdate(telaps) {
  Main.pause();
}

function uiConfigure(m) {

  if (gStateVars.machine.description) {
    $('#emf_title').html(gStateVars.machine.description);
  }

  new emf.dragDrop('dragdrop', m, function(filename, data) {
    emf.ui.setCursor(emf.ui.CURSOR_WAIT);
    // The browser needs to return to the event loop because the cursor change is
    // made visible, so this gives it to us.
    setTimeout(() => {

      gStateVars.controller.coldLoadData(name, data, {
        startAddress: 0x200,
        patch: patchHires
      });
      // FIXME: This assumes the code is always loaded into the first block of RAM
      let RAMRanges = m.bus.memory.getAddressRanges().filter((blk) => blk.write);

      gStateVars.currentName = filename;
      gStateVars.currentStart = RAMRanges[0].start;
      gStateVars.currentSize = RAMRanges[0].size;
      //
      uiRefresh(m);
      emf.ui.setCursor(emf.ui.CURSOR_ARROW);
    }, 0);
  });
}

function uiRefresh(m) {
  let addrFrom = gStateVars.currentStart;
  let addrUntil = addrFrom + gStateVars.currentSize;

  gStateVars.framework.disassembleRange('#emf_disassembly_solo', m.bus.cpu, addrFrom, addrUntil);
  gStateVars.framework.populateMemoryDisplay();
  gStateVars.framework.memory('#emf_memory_solo', m.bus.memory, addrFrom, addrUntil);
}