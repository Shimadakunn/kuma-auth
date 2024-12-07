import Image from "next/image";

export function Header() {
  return (
    <div className="flex items-center justify-center gap-1 h-[10vh]">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h1 className="font-black text-4xl">Morpho Labs</h1>
    </div>
  );
}
