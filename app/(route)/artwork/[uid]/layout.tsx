import Image from 'next/image';

export const runtime = 'edge';

export default function ArtworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative">
      <Image src="/assets/artwork-page/christmas/background.png" alt="" width={1920} height={1080} />
      <Image
        src="/assets/artwork-page/christmas/background-deco.png"
        alt=""
        width={1920}
        height={1080}
        className="absolute z-0 top-0 left-0 w-auto h-auto bg-cover bg-center"
      />
      <div className="w-full h-full absolute z-10 top-0 left-0">{children}</div>
    </div>
  );
}
