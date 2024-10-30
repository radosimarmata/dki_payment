import React from 'react';
import Image from 'next/image';

interface MainCardProps {
  imageSrc: string;
  title: string;
  description: string;
  onClick: () => void;
}

const MainCard: React.FC<MainCardProps> = ({ imageSrc, title, description, onClick }) => {
  return (
    <div onClick={onClick} className="grid grid-cols-5 p-2 border-b rounded-md cursor-pointer hover:bg-gray-200">
      <div className="rounded-full border bg-gradient-to-r from-[#E21A1A] to-[#C0A720] w-16 h-16 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="mobile logo"
          width={24}
          height={24}
          priority
        />
      </div>
      <div className="col-span-3 flex flex-col justify-center">
        <a className="font-semibold text-lg">{title}</a>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className='flex justify-end items-center'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default MainCard;
