"use client";
import { InputPassword } from "@/components/inputs";
import { paths } from "@/utils/paths";
import React from "react";
import { toast } from "react-toastify";
import * as apis from "@/apis";

const ChangeForgotPassword = () => {
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const handleVerify = async () => {
    if (password === "") {
      return toast.error("Please enter your password to change password");
    }

    if (confirmPassword === "") {
      return toast.error("Please enter your confirm password to change password");
    }

    if (password !== confirmPassword) {
      return toast.error("Confirm password not match");
    }

    const response = await apis.apiChangePassword(password);
    if (response.err === 0) {
      toast.success("Change password success!");
      window.location.href = paths.LOGIN;
    } else {
      return toast.error("Change password failed");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
      <h3 className="text-center font-bold text-3xl">Change your password</h3>
      <div className="my-3 flex flex-col gap-3">
        <InputPassword
          id={password}
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          required={true}
        />
        <InputPassword
          id={confirmPassword}
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm password"
          required={true}
        />
        <button
          className="flex items-center justify-center w-full bg-ctp-green text-ctp-base py-2 text-lg rounded-md"
          onClick={() => handleVerify()}
        >
          Change password
        </button>
      </div>
    </div>
  );
};

export default ChangeForgotPassword;
