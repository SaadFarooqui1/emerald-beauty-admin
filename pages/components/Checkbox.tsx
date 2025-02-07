import React from 'react';

interface CheckboxProps {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  checked = false,
  onChange,
  className = '',
}) => {
  return (
    <label htmlFor={value} className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`form-checkbox text-[#1bd9bf] ${className}`}
      />
      <span className="text-[#727272] text-sm font-normal font-['Raleway']">{label}</span>
    </label>
  );
};

export default Checkbox;