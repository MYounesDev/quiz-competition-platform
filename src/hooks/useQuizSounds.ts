'use client';

import { useEffect, useState } from 'react';
import useSound from 'use-sound';

export function useQuizSounds() {
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  
  // Use direct URLs to sound files - this avoids requiring local files
  const [playCorrect, { sound: correctSound }] = useSound('https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3', {
    volume: 0.5,
    sprite: { default: [0, 1000] },
    onload: () => {
      setSoundsLoaded(true);
    },
    onloaderror: (id, err) => {
      console.log('Could not load correct sound - using silent fallback', err);
    }
  });
  
  const [playIncorrect, { sound: incorrectSound }] = useSound('https://assets.mixkit.co/active_storage/sfx/110/110-preview.mp3', {
    volume: 0.5,
    sprite: { default: [0, 1000] },
    onload: () => {
      setSoundsLoaded(true);
    },
    onloaderror: (id, err) => {
      console.log('Could not load incorrect sound - using silent fallback', err);
    }
  });
  
  // Background music (we'll initialize it but keep it off by default)
  const [playBackgroundMusic, { sound: backgroundMusic, stop: stopBackgroundMusic }] = useSound(
    'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3', 
    {
      volume: 0.2,
      loop: true,
      onload: () => {
        console.log('Background music loaded');
      },
      onloaderror: (id, err) => {
        console.log('Could not load background music', err);
      }
    }
  );
  
  // Function to play correct sound with fallback
  const playCorrectSound = () => {
    if (soundsEnabled) {
      try {
        playCorrect();
      } catch (error) {
        console.log('Error playing correct sound', error);
      }
    }
  };
  
  // Function to play incorrect sound with fallback
  const playIncorrectSound = () => {
    if (soundsEnabled) {
      try {
        playIncorrect();
      } catch (error) {
        console.log('Error playing incorrect sound', error);
      }
    }
  };
  
  // Toggle sounds on/off
  const toggleSounds = () => {
    setSoundsEnabled(!soundsEnabled);
    if (soundsEnabled) {
      try {
        stopBackgroundMusic();
      } catch (error) {
        console.log('Error stopping background music', error);
      }
    }
  };
  
  // Toggle background music
  const toggleBackgroundMusic = () => {
    if (backgroundMusic && backgroundMusic.playing()) {
      stopBackgroundMusic();
    } else if (soundsEnabled) {
      playBackgroundMusic();
    }
  };
  
  return {
    playCorrect: playCorrectSound,
    playIncorrect: playIncorrectSound,
    toggleBackgroundMusic,
    soundsEnabled,
    toggleSounds,
    soundsLoaded
  };
}
