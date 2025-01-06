'use client';

import React, { useCallback, useEffect, useRef } from 'react';

export default function BGMProvider({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleBGM = useCallback(() => {
    const bgmOnOff = localStorage.getItem('bgm');
    if (bgmOnOff === 'false') {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Auto-play prevented:', e));
    }
  }, []);

  const handleVolume = useCallback(() => {
    const savedVolume = localStorage.getItem('soundVolume');
    if (audioRef.current && savedVolume !== null) {
      audioRef.current.volume = parseFloat(savedVolume) / 100;
    }
  }, []);

  useEffect(() => {
    handleBGM();
    handleVolume();

    window.addEventListener('sound-volume-changed', handleVolume);
  }, [handleBGM, handleVolume]);

  useEffect(() => {
    window.addEventListener('bgm-changed', handleBGM);
  }, [handleBGM]);

  if (!url) return null;

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} src={url} loop preload="auto" />;
}
