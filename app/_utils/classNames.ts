import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 네임을 병합하고 Tailwind CSS의 클래스 우선순위를 관리합니다.
 * @param inputs 클래스명
 * @returns 조합된 클래스명
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
