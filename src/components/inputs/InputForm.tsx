import React from "react";

interface Props {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const InputForm = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: Props) => {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="text-ctp-subtext1 text-sm mb-4">
        {placeholder} <span className="text-ctp-red">*</span>
      </label>
      <div className="flex items-center border border-ctp-surface2 rounded-md px-3 py-2 gap-3">
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full outline-none bg-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputForm;
