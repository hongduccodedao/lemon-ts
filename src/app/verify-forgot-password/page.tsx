"use client";
import React from "react";
import { InputForm } from "@/components/inputs";
import Link from "next/link";
import { paths } from "@/utils/paths";
import * as apis from "@/apis";
import { toast } from "react-toastify";

const Page = () => {
  const [captcha, setCaptcha] = React.useState<string>("");

  const handleVerify = async () => {
    if (captcha === "") {
      return toast.error("Please enter your captcha to verify account");
    }

    const response = await apis.apiVerifyForgotPassword(captcha);
    if (response.err === 0) {
      toast.success("Verify account success!");
      window.location.href = paths.CHANGE_PASSWORD;
    } else {
      return toast.error(response.message);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
      <h3 className="text-center font-bold text-3xl">Verify your account</h3>
      <div className="my-3 flex flex-col gap-3">
        <InputForm
          id={captcha}
          type={"text"}
          value={captcha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCaptcha(e.target.value)
          }
          placeholder="Enter your captcha"
        />
        <button
          className="flex items-center justify-center w-full bg-ctp-green text-ctp-base py-2 text-lg rounded-md"
          onClick={() => handleVerify()}
        >
          Verify account
        </button>
        <div className="text-center">
          <span className="">Resend captcha</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
