"use client";
import React, { useState, useEffect } from "react";

type OtpInputProps = {
  id: string;
  length?: number;
  onChangeOtp: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ id, length = 6, onChangeOtp }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

  useEffect(() => {
    onChangeOtp(otp.join(""));
  }, [otp, onChangeOtp]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`${id}-otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`${id}-otp-input-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      const nextInput = document.getElementById(`${id}-otp-input-${index + 1}`);
      nextInput?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`${id}-otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index] === "") {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
    }
  };

  const handleBlur = (index: number) => {
  };

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`${id}-otp-input-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 border-2 border-gray-300 text-center text-2xl rounded-md focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
