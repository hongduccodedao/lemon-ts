import React from "react";
import icons from "@/utils/icons";

const { RiLock2Fill, RiEyeFill, RiEyeOffFill } = icons;

interface Props {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const InputPassword = ({
  id,
  value,
  onChange,
  placeholder,
  required = false,
}: Props) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div>
      <label htmlFor={id} className="text-ctp-subtext1 text-sm mb-4">
        {placeholder} <span className="text-ctp-red">*</span>
      </label>
      <div className="flex items-center border border-ctp-surface2 rounded-md px-3 py-2 gap-3">
        <input
          type={showPassword ? "text" : "password"}
          name={id}
          id={id}
          className="w-full outline-none bg-transparent "
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="text-ctp-subtext0 outline-none focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <RiEyeFill className="text-xl" />
          ) : (
            <RiEyeOffFill className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
