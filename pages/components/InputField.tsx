import React, { useState } from 'react';

interface InputFieldProps {
  label?: string; // Make label optional
  placeholder?: string;
  defaultValue?: string;
  type?:
    | 'text'
    | 'textarea'
    | 'email'
    | 'password'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'checkbox';
  rows?: number;
  name: string;
  id?: string; // Made 'id' optional
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  defaultChecked?: boolean; // Added defaultChecked prop for checkbox
  readOnly?: boolean;
  value?: string | number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  defaultValue,
  type = 'text',
  rows = 1,
  name,
  id,
  onChange,
  className,
  defaultChecked, // Destructure defaultChecked
  readOnly,
  value,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={defaultValue}
          rows={rows}
          onChange={onChange}
          className={`form-textarea font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light ${className}`}
          onBlur={onBlur}
          value={value}
        />
      ) : type === 'checkbox' ? (
        <div className="flex items-center space-x-2">
          <input
            id={id}
            name={name}
            readOnly={readOnly}
            type="checkbox"
            defaultChecked={defaultChecked} // Use defaultChecked here
            onChange={onChange}
            className={`form-checkbox h-4 w-4 text-[#012d22] focus:ring-[#012d22] dark:focus:ring-white-light ${className}`}
            value={value}
            onBlur={onBlur}
          />
          <span className="font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272]">{label}</span>
        </div>
      ) : type === 'password' ? (
        <div className="flex items-center justify-between space-x-2 form-input-lg form-input">
          <input
            id={id} 
            name={name}
            type={showPassword ? 'text' : 'password'}
            readOnly={readOnly}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            className={`w-full font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-none focus:outline-none ${className}`}
            value={value}
            onBlur={onBlur}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-eye"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-eye-off"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            )}
          </button>
        </div>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          readOnly={readOnly}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`form-input-lg form-input font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light ${className}`}
          value={value}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default InputField;
