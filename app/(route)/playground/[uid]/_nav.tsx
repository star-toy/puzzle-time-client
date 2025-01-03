'use client';

import { useEffect, useState } from 'react';
import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { LoginButton } from './_login-button';

import { URLS } from '@/app/constants';

export default function PlaygroundNav({ isLogin }: { isLogin: boolean }) {
  const [showSelectPieceNumber, setShowSelectPieceNumber] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const handleGameStarted = () => {
      setIsGameStarted(true);
    };
    window.addEventListener('game-started', handleGameStarted);

    return () => {
      window.removeEventListener('game-started', handleGameStarted);
    };
  }, []);

  const handleClickPuzzlePieceNumber = () => {
    setShowSelectPieceNumber(!showSelectPieceNumber);
  };

  const handleSelectPieceNumber = (pieceNumber: number) => {
    setShowSelectPieceNumber(false);
    localStorage.setItem('pieceNumber', pieceNumber.toString());
  };

  const handleClickRearrangePieces = () => {
    window.dispatchEvent(new CustomEvent('rearrange-pieces'));
  };

  return (
    <div className="w-full h-[100px] ">
      <div className="w-full h-full flex flex-row items-center justify-between py-[15px] px-[38px] bg-[rgba(166,80,67,1)] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)]">
        <div className="flex flex-row items-center gap-[35px]">
          <Link href={URLS.getMainPage()}>
            <Image src="/assets/logo.png" alt="Puzzle Time" width={70} height={70} />
          </Link>

          <ButtonAutoSave isLogin={isLogin} onOpenLoginPopup={() => setShowLoginPopup(true)} isGameStarted={isGameStarted} />
          <ButtonSave isGameStarted={isGameStarted} />
        </div>

        <div className="flex flex-row items-center gap-[35px]">
          <ButtonPuzzlePieceNumber onClick={handleClickPuzzlePieceNumber} isGameStarted={isGameStarted} />
          <ButtonEdgePieces isGameStarted={isGameStarted} onClick={() => {}} />
          <ButtonPreviewArtwork />
          <ButtonRearrangePieces isGameStarted={isGameStarted} onClick={handleClickRearrangePieces} />
        </div>

        <div className="flex flex-row items-center gap-[35px]">
          <ButtonBGM />
          <ButtonSoundEffect />
          <SoundVolume />
        </div>
      </div>

      {showSelectPieceNumber && <SelectPieceNumber onSelect={handleSelectPieceNumber} />}

      {showLoginPopup && <LoginPopup className="fixed z-0 top-[123px] left-[143px]" />}
    </div>
  );
}

function ButtonAutoSave({ isLogin, onOpenLoginPopup, isGameStarted }: { isGameStarted: boolean; isLogin: boolean; onOpenLoginPopup: () => void }) {
  const [autoSave, setAutoSave] = useState(false);

  const handleAutoSave = () => {
    setAutoSave((prev) => {
      if (!prev && !isLogin) {
        onOpenLoginPopup();
      }
      return !prev;
    });
  };

  return (
    <div className="flex flex-row items-center gap-[10px]">
      <div className="text-[16px] font-bold text-[#F5F5F5]">AUTOSAVE</div>
      <div
        onClick={() => !isGameStarted && handleAutoSave()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isGameStarted) {
            handleAutoSave();
          }
        }}
        tabIndex={0}
        role="button"
      >
        {autoSave ? (
          <Image src="/assets/components/ui/switch-on.png" alt="AUTOSAVE on" width={100} height={50} className="cursor-pointer" />
        ) : (
          <Image src="/assets/components/ui/switch-off.png" alt="AUTOSAVE off" width={100} height={50} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
}

function ButtonSave({ isGameStarted }: { isGameStarted: boolean }) {
  return (
    <div className="">
      <Image src="/assets/components/ui/icon-save.png" alt="SAVE" width={50} height={50} className="cursor-pointer" />
    </div>
  );
}

function ButtonPuzzlePieceNumber({ onClick, isGameStarted }: { isGameStarted: boolean; onClick: () => void }) {
  return (
    <div className="">
      <Image
        src="/assets/components/ui/icon-puzzle-pieces-number.png"
        alt="PUZZLE PIECES NUMBER"
        width={50}
        height={50}
        className="cursor-pointer"
        onClick={() => !isGameStarted && onClick()}
      />
    </div>
  );
}

function ButtonEdgePieces({ isGameStarted, onClick }: { isGameStarted: boolean; onClick: () => void }) {
  return (
    <div className="">
      <Image
        src="/assets/components/ui/icon-edge-puzzles.png"
        alt="EDGE PUZZLES"
        width={50}
        height={50}
        className={cx('cursor-pointer', { 'opacity-50': isGameStarted })}
        onClick={() => isGameStarted && onClick()}
      />
    </div>
  );
}

function ButtonPreviewArtwork() {
  return (
    <div className="">
      <Image src="/assets/components/ui/icon-preview-artwork.png" alt="PREVIEW ARTWORK" width={50} height={50} className="cursor-pointer" />
    </div>
  );
}

function ButtonRearrangePieces({ isGameStarted, onClick }: { isGameStarted: boolean; onClick: () => void }) {
  return (
    <div className="">
      <Image
        src="/assets/components/ui/icon-rearrange-pieces.png"
        alt="REARRANGE PIECES"
        width={50}
        height={50}
        className="cursor-pointer"
        onClick={() => isGameStarted && onClick()}
      />
    </div>
  );
}

function ButtonBGM() {
  const [bgm, setBGM] = useState(true);

  const handleBGM = () => {
    setBGM(!bgm);
    localStorage.setItem('bgm', bgm.toString());
  };

  useEffect(() => {
    let value = localStorage.getItem('bgm');
    if (!value) {
      localStorage.setItem('bgm', 'true');
      value = 'true';
    }
    setBGM(value === 'true');
  }, []);

  return (
    <div className="">
      <Image
        src={bgm ? '/assets/components/ui/icon-bgm.png' : '/assets/components/ui/icon-bgm-off.png'}
        alt="BGM"
        width={40}
        height={35}
        className="cursor-pointer"
        onClick={handleBGM}
      />
    </div>
  );
}

function ButtonSoundEffect() {
  const [soundEffect, setSoundEffect] = useState(true);

  const handleSoundEffect = () => {
    setSoundEffect(!soundEffect);
    localStorage.setItem('soundEffect', soundEffect.toString());
  };

  useEffect(() => {
    let value = localStorage.getItem('soundEffect');
    if (!value) {
      localStorage.setItem('soundEffect', 'true');
      value = 'true';
    }
    setSoundEffect(value === 'true');
  }, []);

  return (
    <div className="">
      <Image
        src={soundEffect ? '/assets/components/ui/icon-sound-effect.png' : '/assets/components/ui/icon-sound-effect-off.png'}
        alt="SOUND EFFECT"
        width={40}
        height={40}
        className="cursor-pointer"
        onClick={handleSoundEffect}
      />
    </div>
  );
}

function SoundVolume() {
  const [volume, setVolume] = useState(100);

  const handleVolumeUp = () => {
    setVolume((prev) => (prev + 10 <= 100 ? prev + 10 : 100));
    localStorage.setItem('soundVolume', volume.toString());
  };

  const handleVolumeDown = () => {
    setVolume((prev) => (prev - 10 >= 0 ? prev - 10 : 0));
  };

  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    const value = localStorage.getItem('soundVolume');
    if (value) {
      setVolume(Number(value));
    }
  }, []);

  return (
    <div className="flex flex-row items-center gap-[20px]">
      <Image src="/assets/components/ui/icon-circle-plus.png" alt="VOLUME UP" width={50} height={50} onClick={handleVolumeUp} className="cursor-pointer" />
      <div className="w-[150px] h-[50px] bg-white rounded-[5px] text-center text-[#A65043] text-[35px]">{volume}%</div>
      <Image src="/assets/components/ui/icon-circle-minus.png" alt="VOLUME DOWN" width={50} height={50} onClick={handleVolumeDown} className="cursor-pointer" />
    </div>
  );
}

const DEFAULT_PIECE_NUMBER = 16;

function SelectPieceNumber({ onSelect }: { onSelect: (pieceNumber: number) => void }) {
  const [selectedPieceNumber, setSelectedPieceNumber] = useState(DEFAULT_PIECE_NUMBER);

  const handleClickPieceNumber = (pieceNumber: number) => {
    setSelectedPieceNumber(pieceNumber);
    onSelect(pieceNumber);
    localStorage.setItem('pieceNumber', pieceNumber.toString());
  };

  useEffect(() => {
    let pieceNumber = localStorage.getItem('pieceNumber');
    if (!pieceNumber) {
      localStorage.setItem('pieceNumber', DEFAULT_PIECE_NUMBER.toString());
      pieceNumber = DEFAULT_PIECE_NUMBER.toString();
    }
    setSelectedPieceNumber(Number(pieceNumber));
  }, []);

  return (
    <div className="fixed z-10 top-[123px] left-[50%] -translate-x-1/2 w-[450px] h-[350px] bg-white/70 rounded-[5px] text-center text-black text-[35px] grid grid-cols-4 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]">
      {Array.from({ length: 16 }, (_, index) => {
        const pieceNumber = (index + 2) * (index + 2);
        return (
          <div
            key={index}
            className={cx('flex items-center justify-center rounded-[5px] border-[7px] border-transparent text-center text-[35px] hover:border-white', {
              'bg-white': selectedPieceNumber === pieceNumber,
            })}
            onClick={() => handleClickPieceNumber(pieceNumber)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClickPieceNumber(pieceNumber);
              }
            }}
            tabIndex={0}
            role="button"
          >
            {pieceNumber}
          </div>
        );
      })}
    </div>
  );
}

function LoginPopup({ className }: { className?: string }) {
  return (
    <div
      className={cx('relative w-[380px] bg-[#A65043] rounded-[5px] text-white text-[35px] p-[20px] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)]', className)}
    >
      <div className="text-[35px] bold pt-[24px] px-[15px]">WANT TO SAVE YOUR WORK?</div>
      <div className="text-[25px] bold pt-[24px] px-[15px]">LOGIN TO KEEP YOUR PUZZLES SAFE AND SHOWCASE YOUR ARTWORKS!</div>

      <div className="flex flex-row justify-end">
        <LoginButton className="inline-block h-[50px] bg-white text-[#A65043] rounded-[5px] text-[30px] mt-[30px] px-[25px]" />
      </div>
    </div>
  );
}
