document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const candles = document.querySelectorAll('.candle');
  const audioPlayer = document.getElementById('birthday-song');

  // Create steam effect after candle is blown out
  function createSteam(candle) {
      const steam = document.createElement('div');
      steam.classList.add('steam');
      candle.appendChild(steam);

      // Remove steam after animation completes
      setTimeout(() => {
          steam.remove();
      }, 1500); // Steam lasts for 1.5 seconds
  }

  // Blow out the candle
  function blowOutCandle(candle) {
      candle.classList.add('blown-out'); // Add blown-out class
      createSteam(candle); // Create steam when the candle is blown out
  }

  function checkBlow(strength) {
      console.log('Blow strength:', strength); // Debugging: Log detected strength

      // If blow strength exceeds the threshold
      if (strength > 0.4) {
          candles.forEach(candle => {
              if (!candle.classList.contains('blown-out')) {
                  blowOutCandle(candle); // Blow out the candle
              }
          });

          // Check if all candles are blown out
          if (document.querySelectorAll('.blown-out').length === candles.length) {
              startButton.textContent = 'Candles Blown Out!';
              startButton.disabled = true; // Disable the start button
          }
      }
  }

  // Start listening for microphone input
  function startListening() {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
              console.log('Microphone connected'); // Confirm microphone access
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const analyser = audioContext.createAnalyser();
              const microphone = audioContext.createMediaStreamSource(stream);
              microphone.connect(analyser);

              analyser.fftSize = 256;
              const dataArray = new Uint8Array(analyser.frequencyBinCount);

              function detectBlow() {
                  analyser.getByteTimeDomainData(dataArray);

                  // Calculate audio strength
                  let sum = 0;
                  for (let i = 0; i < dataArray.length; i++) {
                      sum += Math.abs(dataArray[i] - 128); // Normalize based on the mid-point
                  }
                  const strength = sum / dataArray.length / 128; // Normalize to 0-1

                  checkBlow(strength);
                  requestAnimationFrame(detectBlow); // Recursively check for blow
              }
              detectBlow(); // Start detecting blow
          })
          .catch(error => {
              console.error('Microphone error:', error);
              alert('Microphone access is required to blow out the candles.');
          });
  }

  // Start button click listener
  startButton.addEventListener('click', () => {
      console.log('Start button clicked'); // Debugging: Log button click
      startListening();
      audioPlayer.play(); // Play the birthday song
      startButton.textContent = 'Blow into the mic!';
  });
});
