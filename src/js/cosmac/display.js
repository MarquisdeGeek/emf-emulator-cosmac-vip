/* 

Original CHIP-8 Display resolution is 64×32 pixels, and color is
monochrome. Graphics are drawn to the screen solely by drawing sprites, which
are 8 pixels wide and may be from 1 to 15 pixels in height. Sprite pixels are
XOR'd with corresponding screen pixels. In other words, sprite pixels that are
set flip the color of the corresponding screen pixel, while unset sprite
pixels do nothing. The carry flag (VF) is set to 1 if any screen pixels are
flipped from set to unset when a sprite is drawn and set to 0 otherwise. This
is used for collision detection.


0,0 is top left

ETI 660, also had 64x48 and 64x64 modes
*/

let cosmac_display = (function(bus, options) {
  let width = 64; // Must be powers of 2, unless wrap-around is optimised
  let height = 64;
  let gfxScale = 8; // must be size of graphic block
  let sgxSurface;
  let mainSurface;
  let internalDisplay;
  let gfx;

  (function ctor() {
    sgxSurface = sgxskeleton.init(width * gfxScale, height * gfxScale);
    mainSurface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();

    gfx = sgx.graphics.TextureManager.get().registerScenarioTexture("res/block");

    internalDisplay = new Array(width * height);


    bus.attachPin('timer60', {
      onFalling: function() {
        render();
      },
    });

    bus.attachPin('disp_clear', {
      onFalling: function() {
        clear();
      },
    });

    bus.attachPin('disp_op', {
      onFalling: function() {
        let x = bus.readBlock('disp_x');
        let y = bus.readBlock('disp_y');
        let height = bus.readBlock('disp_h');
        let iaddr = bus.readBlock('disp_i');

        drawOp(x, y, height, iaddr);
      },
    });

    start();
  })();

  function start() {
    clear();
  }

  function changePixel(x, y) {
    //  wrap-around, relying on width and height being power of 2
    x &= (width - 1);
    y &= (height - 1);
    //
    let offset = x + y * width;
    internalDisplay[offset] ^= 1;
    return !internalDisplay[offset];
  }

  /*
  Draw a sprite at position VX, VY with N bytes of sprite data starting at the address stored in I
  Set VF to 01 if any set pixels are changed to unset, and 00 otherwise
  */
  function drawOp(vx, vy, height, iaddr) {
    //
    let changeFlag = false;
    //
    for (let y = 0; y < height; ++y) {
      let byte = bus.memory.read8(iaddr + y);
      let mask = 0x80;
      for (let x = 0; x < 8; ++x, mask >>= 1) {
        if (byte & mask) {
          changeFlag = changePixel(vx + x, vy + y) || changeFlag;
        }
      }
    }
    //
    bus.writeBlock('vfvalue', changeFlag);
    bus.pulseLow('vf');
  }

  function refreshCanvas() {
    mainSurface.clear();
    //
    mainSurface.setFillColor(sgxColorRGBA.White);
    mainSurface.setFillTexture(gfx);
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        if (internalDisplay[x + y * width]) {
          mainSurface.fillPoint(x * gfxScale, y * gfxScale, CSGXDrawSurface.eFromTopLeft);
        }
      }
    }
  }

  function reset() {
    clear();
  }

  function clear() {
    internalDisplay.fill(0);
    refreshCanvas();
  }

  function render() {
    refreshCanvas();
  }

  return {
    start,
    reset,
    render,
  }
});