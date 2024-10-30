"use client";

import React from "react";

type MainInputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const MainInput: React.FC<MainInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default MainInput;
