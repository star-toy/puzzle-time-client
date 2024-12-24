export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('/assets/playground/christmas/background.png')] bg-no-repeat bg-center bg-cover">
      <div className="w-full h-[100px] bg-[rgba(166,80,67,1)] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.25)]" />
      {children}
    </div>
  );
}
