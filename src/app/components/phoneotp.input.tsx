"use client";

import React, { useState } from "react";

type PhoneInputWithOtpProps = {
  onSendOtp: (phoneNumber: string) => void;
};

const PhoneInputWithOtp: React.FC<PhoneInputWithOtpProps> = ({ onSendOtp }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      onSendOtp(phoneNumber);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder=" "
        value={phoneNumber}
        onChange={handleChange}
        className="peer transition-all px-5 py-2 w-full text-lg text-gray-600 bg-white rounded-md border border-gray-800 outline-none select-all focus:border-[#FF6600]"
      />
      <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:bg-white peer-focus:font-semibold peer-focus:text-black peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
        Nomor Telepon
      </label>
      <button
        onClick={handleSendOtp}
        disabled={phoneNumber.length < 10}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white rounded-md transition-all ${
          phoneNumber.length >= 10
            ? "bg-[#FF6600] hover:bg-[#E85C0D]"
            : "bg-[#FABC3F] cursor-not-allowed"
        }`}
      >
        Kirim OTP
      </button>
    </div>
  );
};

export default PhoneInputWithOtp;
