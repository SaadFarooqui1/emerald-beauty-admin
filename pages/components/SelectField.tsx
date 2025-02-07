import { IRootState } from '@/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Option {
  id: string | number;
  name: string;
  arabic_name?: string
}

interface SelectFieldProps {
  id: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number | undefined;
  name?: string
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, options, defaultValue, onChange, value , name, onBlur}) => {
  const { t } = useTranslation();

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

  return (
    <div>
      <label
        htmlFor={id}
        className="font-['Raleway'] rtl:font-medium rtl:font-['Tajawal'] text-lg font-semibold text-[#012d22] dark:text-white-light"
      >
        {label}
      </label>
      <select
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        name={name}
        onBlur={onBlur}
        className="form-select-lg form-select font-['Raleway'] rtl:font-['Tajawal'] text-base font-normal text-[#727272] focus:border-[#012d22] dark:focus:border-white-light"
      >
        <option>{t("Select Option")}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
             {isRtl ? `${option?.arabic_name ? option?.arabic_name : option.name}` : `${option.name}` }
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;