/*

Input is done with a hex keyboard that has 16 keys ranging 0 to F. The '8',
'4', '6', and '2' keys are typically used for directional input. Three opcodes
are used to detect input. One skips an instruction if a specific key is
pressed, while another does the same if a specific key is not pressed. The
third waits for a key press, and then stores it in one of the data registers.

*/

let cosmac_keyboard = (function(bus, options) {
  const keyStates = [];
  const keyCodes = {
    // Basic numerals, for ease
    49: 1,
    /* 1 */
    50: 2,
    /* 2 */
    51: 3,
    /* 3 */
    52: 4,
    /* 4 */
    53: 5,
    /* 5 */
    54: 6,
    /* 6 */
    55: 7,
    /* 7 */
    56: 8,
    /* 8 */
    57: 9,
    /* 9 */
    48: 16,
    /* 0 */

    // Use the LHS as a keypad, also
    // 1234
    // qwer
    // asdf
    // zxcv
    81: 5,
    /* Q */
    87: 6,
    /* W */
    69: 7,
    /* E */
    82: 8,
    /* R */
    65: 9,
    /* A */
    83: 10,
    /* S */
    68: 11,
    /* D */
    70: 12,
    /* F */
    90: 13,
    /* Z */
    88: 14,
    /* X */
    67: 15,
    /* C */
    86: 16,
    /* V */

    // RHS keypad, if available
    35: 1,
    /* 1 */
    40: 2,
    /* 2 */
    34: 3,
    /* 3 */
    37: 4,
    /* 4 */
    12: 5,
    /* 5 */
    39: 6,
    /* 6 */
    36: 7,
    /* 7 */
    38: 8,
    /* 8 */
    57: 9,
    /* 9 */
    45: 0,
    /* 0 */
    111: 10,
    /* / = A */
    106: 11,
    /* * = B */
    109: 12,
    /* - = C */
    107: 13,
    /* + = D */
    13: 14,
    /* ent = E */
    46: 10,
    /* DEL. = F */
  };


  (function ctor() {
    for (let row = 0; row < 9; row++) {
      keyStates[row] = 0xff;
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
  })();

  function getState(row) {
    return keyStates[row];
  }

  function keyDown(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode == null) {
      return;
    }

    bus.writeBlock('keycode', keyCode);
    bus.pulseLow('keydown');

    evt.preventDefault();
  }

  function keyUp(evt) {
    let keyCode = keyCodes[evt.keyCode];
    if (keyCode == null) {
      return;
    }
    bus.writeBlock('keycode', keyCode);
    bus.pulseLow('keyup');

    evt.preventDefault();
  }

  return {
    getState,
  }
});