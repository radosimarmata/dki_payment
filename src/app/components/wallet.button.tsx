import React from 'react';
import Image from 'next/image';

type WalletButtonProps = {
  amount: string;
  isActive: boolean;
  onClick: () => void;
};

const WalletButton: React.FC<WalletButtonProps> = ({ amount, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center border-2 rounded-md space-x-2 p-2 transition duration-200 ease-in-out ${isActive ? 'border-[#E21A1A]' : 'border-gray-300 hover:border-[#E21A1A]'}`}
    >
      <Image
        src="/wallet.png"
        alt="wallet logo"
        width={24}
        height={24}
        priority
      />
      <span className="font-semibold">{amount}</span>
    </button>
  );
};

export default WalletButton;
