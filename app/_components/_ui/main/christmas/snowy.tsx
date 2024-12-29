'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/app/_utils/classNames';
import { getScreenScale } from '@/app/_utils/screen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/app/constants';

interface ISnowyProps {
  className?: string;
  count?: number;
}

interface ISnowParticle {
  endX: number;
  opacity: number;
  scale: number;
  speed: number;
  startDelay: number;
  startX: number;
  x: number;
  y: number;
}

function createSnowParticle(index: number, total: number, scale: number): ISnowParticle {
  let startX = Math.random() * 100;
  const isOdd = startX % 2 >= 1;
  if (isOdd) {
    startX *= scale;
  } else {
    startX /= scale;
  }
  let endX = Math.random() * 100;
  if (isOdd) {
    endX *= scale;
  } else {
    endX /= scale;
  }
  const speed = 15000 + Math.random() * 5000;

  const startDelay = (index / total) * speed;

  return {
    x: startX,
    y: -15,
    startX,
    endX,
    scale: Math.max(Math.random(), 0.5),
    opacity: Math.random(),
    speed,
    startDelay,
  };
}

function SnowFlake({ particle }: { particle: ISnowParticle }) {
  const snowRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now() + particle.startDelay);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!snowRef.current) return;

    const animate = () => {
      const currentTime = Date.now();
      if (snowRef.current) {
        snowRef.current.style.opacity = '0';
        snowRef.current.style.transform = `translate(${particle.startX}vw, -15vh) scale(${particle.scale})`;
      }

      if (currentTime < startTimeRef.current) {
        if (snowRef.current) {
          snowRef.current.style.opacity = '0';
          snowRef.current.style.transform = `translate(${particle.startX}vw, -15vh) scale(${particle.scale})`;
        }
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (snowRef.current) {
        snowRef.current.style.opacity = particle.opacity.toString();
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = (elapsed % particle.speed) / particle.speed;
      const currentX = particle.startX + (particle.endX - particle.startX) * progress;
      const currentY = progress * 115;

      if (snowRef.current) {
        snowRef.current.style.transform = `translate(${currentX}vw, ${currentY}vh) scale(${particle.scale})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // eslint-disable-next-line consistent-return
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [particle]);

  return <div ref={snowRef} className="absolute w-[15px] h-[15px] bg-white rounded-full shadow-[0_0_3px_3px_rgba(255,255,255,1.0)]" />;
}

export default function Snowy({ count = 200, className }: ISnowyProps) {
  const [scale, setScale] = useState<number | null>(null);
  const particles = useRef<ISnowParticle[]>([]);

  useEffect(() => {
    const currentScale = getScreenScale(window, SCREEN_WIDTH, SCREEN_HEIGHT);
    particles.current = Array.from({ length: count }, (_, index) => createSnowParticle(index, count, currentScale));
    setScale(currentScale);
  }, [count]);

  if (!scale) return null;

  return (
    <div className={cn('overflow-hidden', className)}>
      {particles.current.map((particle, index) => (
        <SnowFlake key={`snow-${index}`} particle={particle} />
      ))}
    </div>
  );
}
