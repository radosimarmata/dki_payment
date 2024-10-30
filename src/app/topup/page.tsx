"use client";
import Image from "next/image";
import MainCard from "../components/main.card";
import WalletButton from "../components/wallet.button";
import RpInput from "../components/rp.input";
import { useState } from "react";

interface PaymentMethod {
  title: string;
  description: string;
  imageSrc: string;
}

const paymentMethods: PaymentMethod[] = [
  { title: "JakOne Mobile", description: "No Administration fees via the JakOne Mobile App", imageSrc: "/mobile.png" },
  { title: "ATM Bank DKI", description: "Top up Martipay from nearest Bank DKI ATM", imageSrc: "/atm.png" },
  { title: "Other Bank", description: "Transfer anytime from your favourite Indonesia bank", imageSrc: "/bank.png" },
  { title: "Debit Card", description: "Top up online using your debit card", imageSrc: "/debit.png" }
];

export default function Topup() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [activeAmount, setActiveAmount] = useState<string | null>(null);
  const [inputAmount, setInputAmount] = useState<string>('0');

  const handleMethodClick = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setActiveAmount(null);
    setInputAmount('0');
  };

  const handleInputChange = (value: string) => {
    setInputAmount(value);
    if (value !== '0') {
      setActiveAmount(null);
    }
  };

  const handleButtonClick = (amount: string) => {
    setActiveAmount(amount);
  };

  const isNextButtonVisible = activeAmount !== null || inputAmount !== '0';
  return (
    <div className="w-full flex flex-col justify-center items-center text-sm space-y-2 p-4 min-h-screen">
      {selectedMethod ? (
        <>
          <div className="w-full max-w-md flex items-center space-x-4 p-4">
            <div className="p-3 rounded-full border bg-gray-300">
              <Image
                src="/wallet.png"
                alt="wallet logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <h5 className="text-lg font-semibold">{`Via ${selectedMethod.title}`}</h5>
          </div>

          <div className="w-full max-w-md rounded-md bg-gray-200 text-xs p-4">
            <div className="flex">
              <Image
                src="/Announcement.png"
                alt="wallet logo"
                width={16}
                height={16}
                priority
              />
              <p className="text-[#E21A1A] font-bold">Top Up Information</p>
            </div>
            <p>You can save up to Rp 2.000.000 with maximum transactions of Rp 20.000.000 per month</p>
          </div>

          <div className="w-full max-w-md grid grid-cols-2 gap-4">
            <WalletButton
              amount="Rp50.000"
              isActive={activeAmount === "Rp50.000"}
              onClick={() => handleButtonClick("Rp50.000")}
            />
            <WalletButton
              amount="Rp100.000"
              isActive={activeAmount === "Rp100.000"}
              onClick={() => handleButtonClick("Rp100.000")}
            />
            <WalletButton
              amount="Rp150.000"
              isActive={activeAmount === "Rp150.000"}
              onClick={() => handleButtonClick("Rp150.000")}
            />
            <WalletButton
              amount="Rp200.000"
              isActive={activeAmount === "Rp200.000"}
              onClick={() => handleButtonClick("Rp200.000")}
            />
            <WalletButton
              amount="Rp250.000"
              isActive={activeAmount === "Rp250.000"}
              onClick={() => handleButtonClick("Rp250.000")}
            />
            <WalletButton
              amount="Rp300.000"
              isActive={activeAmount === "Rp300.000"}
              onClick={() => handleButtonClick("Rp300.000")}
            />
          </div>
          <a className="font-semibold">Enter Another Amount</a>
          <RpInput value={inputAmount} onChange={handleInputChange} />

          <p className="text-xs text-[#999999]">Minimum top up amount Rp 20.000</p>

          {isNextButtonVisible && (
            <button className="w-full max-w-md rounded-md bg-[#E21A1A] text-white p-2">Next</button>
          )}
        </>
      ) : (
        <>
          <div className="w-full max-w-md flex items-center space-x-4 p-4">
            <div className="p-3 rounded-full border bg-gray-300">
              <Image
                src="/wallet.png"
                alt="wallet logo"
                width={24}
                height={24}
                priority
              />
            </div>
            <h5 className="text-lg font-semibold">Top Up Methods</h5>
          </div>
          <div className="w-full max-w-md flex-col space-y-2">
            {paymentMethods.map((method) => (
              <MainCard
                key={method.title}
                imageSrc={method.imageSrc}
                title={method.title}
                description={method.description}
                onClick={() => handleMethodClick(method)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
