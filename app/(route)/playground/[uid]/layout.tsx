import PlaygroundNav from './_nav';

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('/assets/playground/christmas/background.png')] bg-no-repeat bg-center bg-cover">
      <PlaygroundNav />

      <div className="w-full h-full">{children}</div>
    </div>
  );
}
