// components/Footer.tsx
"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="absolute bottom-4 flex justify-center items-center text-sm space-x-1 w-full">
      <span className="text-xs">Powered by</span>
      <Image
        src="/logo_dki.png"
        alt="Logo Bank DKI"
        width={100}
        height={24}
        priority
      />
    </div>
  );
};

export default Footer;
