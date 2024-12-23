import Image from 'next/image';

interface IMistletoeProps {
  className?: string;
  variant?: 'default' | 'artwork';
}

const VARIANT_STYLES = {
  default: {
    width: 250,
    height: 93,
  },
  artwork: {
    width: 200,
    height: 74,
  },
};

export default function Mistletoe({ className, variant = 'default' }: IMistletoeProps) {
  const variantStyle = VARIANT_STYLES[variant];
  return <Image src={`/assets/items/mistletoe-${variant}.png`} alt="mistletoe" width={variantStyle.width} height={variantStyle.height} className={className} />;
}
