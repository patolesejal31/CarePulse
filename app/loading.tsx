import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#740938]">
      <div className="relative h-20 w-20">
        <Image
          src="/assets/icons/loader.svg"
          alt="loading"
          width={80}
          height={80}
          className="animate-spin brightness-200"
        />
      </div>
      <p className="text-xl font-bold text-white animate-pulse">
        Loading CarePulse...
      </p>
    </div>
  );
}
