// components/Button.tsx

import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  bgColor?: string; // Custom background color
  textColor?: string; // Custom text color
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = '',
  type = 'button',
  bgColor = '#1bd9bf', // Default background color
  textColor = '#012d22', // Default text color
}) => {
  return (
    <button
      type={type}
      className={`btn btn-lg font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium rounded-full px-8 py-3 text-base font-semibold shadow-none ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;