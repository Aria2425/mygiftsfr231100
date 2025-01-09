onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };
    // Start button click listener
    startButton.addEventListener('click', () => {
      console.log('Start button clicked'); // Debugging: Log button click
      startListening();
      audioPlayer.play(); // Play the birthday song
      startButton.textContent = 'Blow into the mic!';
  });
