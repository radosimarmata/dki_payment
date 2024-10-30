import React from 'react';

interface RpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const RpInput: React.FC<RpInputProps> = ({ value, onChange }) => {
  const MAX_AMOUNT = 20000000;

  const formatCurrency = (val: string): string => {
    const num = Number(val.replace(/[^\d]/g, ''));
    return isNaN(num) ? '0' : num.toLocaleString('id-ID');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^\d]/g, '');
    const numericValue = Number(inputValue);

    if (inputValue.startsWith('0') && inputValue.length > 1) {
      onChange(inputValue.replace(/^0+/, ''));
    } else if (numericValue <= MAX_AMOUNT) {
      onChange(inputValue);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md text-lg font-semibold p-2">
      <span className="text-black font-semibold">Rp</span>
      <input
        type="text"
        value={formatCurrency(value)}
        onChange={handleChange}
        className={`ml-2 border-none outline-none w-full ${value === '0' ? 'text-[#999999]' : 'text-black'}`}
        placeholder="0"
      />
    </div>
  );
};

export default RpInput;
