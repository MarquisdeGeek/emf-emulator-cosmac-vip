let cosmac_audio = (function(bus, options) {
  let oscillator;
  let muted = false;

  (function ctor() {
    let audioContext = window.AudioContext && new AudioContext ||
      window.webkitAudioContext && new webkitAudioContext;

    if (audioContext) {
      bus.attachPin('mute', {
        onFalling: function() {
          muted = false;
        },
        onRising: function() {
          muted = true;
          //
          if (oscillator) {
            oscillator.stop();
            oscillator = undefined;
          }
        },
      });
      //
      bus.attachPin('beep', {
        onFalling: function() {
          if (oscillator) {
            oscillator.stop();
            oscillator = undefined;
          }
        },
        onRising: function() {
          if (muted) {
            return;
          } else if (oscillator) {
            return; // technically a bug - the sound should have been stopped
          }
          oscillator = audioContext.createOscillator();
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.connect(audioContext.destination);
          oscillator.type = "triangle";
          oscillator.start();
        },
      });
    }
  })();

  function start() {}


  function reset() {}

  return {
    start,
    reset,
  }
});