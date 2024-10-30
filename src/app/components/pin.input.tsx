"use client";
import React, { useState, useEffect } from "react";

type PinInputProps = {
  id: string;
  length?: number;
  onChangePin: (pin: string) => void;
};

const PinInput: React.FC<PinInputProps> = ({ id, length = 6, onChangePin }) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(""));

  useEffect(() => {
    onChangePin(pin.join(""));
  }, [pin, onChangePin]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value) && value !== "") return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`${id}-pin-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && pin[index] === "") {
      const prevInput = document.getElementById(`${id}-pin-input-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      const nextInput = document.getElementById(`${id}-pin-input-${index + 1}`);
      nextInput?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`${id}-pin-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {pin.map((digit, index) => (
        <input
          key={index}
          id={`${id}-pin-input-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 border-2 border-gray-300 text-center text-2xl rounded-md focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

export default PinInput;
