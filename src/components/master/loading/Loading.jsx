"use client";

import Link from "next/link";

const Loading = () => {
  return (
    <div className="bg-[#FFE0E2] dark:bg-slate-950 max-w-screen max-h-screen flex items-center justify-center fixed inset-0 z-20 h-svh w-screen">
      <div className="">
        <video
          src="/master/loading/Mainfud.mp4"
          width={900}
          height={900}
          className="h-80 w-auto"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="flex items-center justify-center mt-4 font-semibold absolute text-sm bottom-4 left-0 right-0 text-center text-zinc-800 dark:text-zinc-200">
        <Link href="https://seventwo.tech" target="_blank">
          Desarrollado por <strong className="font-bold">Seventwo</strong>
        </Link>
      </div>
    </div>
  );
};

export default Loading;
