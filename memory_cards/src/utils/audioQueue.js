let lastAudio = null;

export function playSoundSequential(soundPath) {
  if (lastAudio && !lastAudio.ended) {
    lastAudio.addEventListener('ended', () => {
      const audio = new Audio(soundPath);
      lastAudio = audio;
      audio.play();
    }, { once: true });
  } else {
    const audio = new Audio(soundPath);
    lastAudio = audio;
    audio.play();
  }
}