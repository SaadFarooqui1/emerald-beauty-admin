import React from 'react';
import { useTranslation } from 'react-i18next';


interface Option {
    id: string | number;
    name: string;
}

interface RadioGroupProps {
    name: string;
    options: Option[];
    label: string;
    selectedOption: number;
    onChange: (value: number | string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, label, selectedOption, onChange }) => {
    const { t } = useTranslation();
    return (
        <div>
            <label className="font-['Raleway'] rtl:font-['Tajawal'] rtl:font-medium text-lg font-semibold text-[#012d22] dark:text-white-light">
                {label}
            </label>
            <div className="flex flex-wrap items-center gap-5">
                {options?.map((option) => (
                    <label key={option.id} className="inline-flex">
                        <input
                            type="radio"
                            name={name}
                            value={option.id}
                            checked={selectedOption === option.id} // Direct comparison works now
                            onChange={() => onChange(option.id)} // Update state with option.id
                            className="form-radio text-[#1bd9bf]"
                        />
                        <span className="text-[#727272] text-base font-normal font-['Raleway'] rtl:font-['Tajawal']">{t(option.name)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;