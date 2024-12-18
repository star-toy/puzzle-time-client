'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/app/_utils/classNames';

interface ISnowyProps {
  className?: string;
  count?: number;
}

export default function Snowy({ count = 200, className }: ISnowyProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      {Array.from({ length: count }).map((_, index) => {
        const { opacity, keyframe, option } = snowAttributes();
        return <SnowFlake key={`snow-${index}`} opacity={opacity} keyframe={keyframe} option={option} />;
      })}
    </div>
  );
}

function SnowFlake({ opacity, keyframe, option }: { keyframe: Keyframe[]; opacity: number; option: KeyframeAnimationOptions }) {
  const snowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (snowRef.current) {
      snowRef.current.animate(keyframe, option);
    }
  }, [keyframe, option]);

  return (
    <div
      ref={snowRef}
      className="absolute w-[15px] h-[15px] bg-white rounded-full box-shadow-[0_0_3px_3px_rgba(255,255,255,1.0)]"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity,
      }}
    />
  );
}

function snowAttributes() {
  let startX = (Math.random() - Math.random()) * 100;
  let endX = startX + (Math.random() * 20 - 10);
  if (startX > 100) {
    startX -= 100;
  }
  if (endX > 100) {
    endX = 100;
  }
  const scale = Math.max(Math.random(), 0.5);

  return {
    opacity: Math.random(),
    keyframe: [{ transform: `translate(${startX}vw, 0) scale(${scale})` }, { transform: `translate(${endX}vw, 100vh) scale(${scale})` }],
    option: {
      duration: 15000 + Math.random() * 5000,
      easing: 'linear',
      iterations: Infinity,
      delay: -Math.random() * 20 * 1000,
    },
  };
}
