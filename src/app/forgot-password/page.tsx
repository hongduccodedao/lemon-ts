"use client";
import React from "react";
import { InputForm } from "@/components/inputs";
import Link from "next/link";
import { paths } from "@/utils/paths";
import * as apis from "@/apis";
import { toast } from "react-toastify";

const Page = () => {
  const [email, setEmail] = React.useState<string>("");

  const handleVerify = async () => {
    if (email === "") {
      return toast.error("Please enter your email to forgot password");
    }

    const response = await apis.apiForgotPassword(email);
    console.log("🚀 ~ handleVerify ~ response:", response);
    if (response.err === 0) {
      return toast.success("Please check your email to reset password");
    } else {
      return toast.error("Email not found");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
      <h3 className="text-center font-bold text-3xl">Forgot password</h3>
      <div className="my-3 flex flex-col gap-3">
        <InputForm
          id={email}
          type="mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
        />
        <button
          className="flex items-center justify-center w-full bg-ctp-green text-ctp-base py-2 text-lg rounded-md"
          onClick={() => handleVerify()}
        >
          Forgot password
        </button>
      </div>
    </div>
  );
};

export default Page;
