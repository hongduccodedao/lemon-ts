"use client";
import React from "react";
import { LoginWithButton, SmallHeading } from "@/components/login";
import { InputForm, InputPassword } from "@/components/inputs";
import Head from "next/head";
import Link from "next/link";
import { paths } from "@/utils/paths";
import { toast } from "react-toastify";
import * as apis from "@/apis";
import { useDispatch } from "react-redux";
import { handleLoginRedux } from "@/store/user/userSlice";

const Page = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async () => {
    email.trim();
    password.trim();

    if (email === "" || password === "") {
      return toast.error("Please fill in all fields");
    }
    const response = await apis.apiLogin(email, password);
    if (response.err === 0) {
      toast.success("✨ Login success!");
      dispatch(
        handleLoginRedux({
          isLogged: true,
          token: response.access_token,
        }),
      );
      window.location.href = paths.HOME;
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Lemon Page🍋</title>
      </Head>
      <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
        <h3 className="text-center font-bold text-3xl">
          Welcome to Lemon Code🍋
        </h3>
        <div className="my-3">
          <LoginWithButton />
        </div>
        <SmallHeading text="Have a password? Continue with your email address" />
        <div className="flex flex-col gap-3 py-3">
          <InputForm
            id={email}
            type={email}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            required={true}
          />
          <InputPassword
            id={password}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            required={true}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link href={paths.FORGOT_PASSWORD}>Forgot password?</Link>
        </div>
        <div className="text-center">
          <button
            className="flex items-center justify-center w-full bg-ctp-green text-ctp-base py-2 text-lg rounded-md"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          <span className="pt-3">
            Don&apos;t have an account?{" "}
            <Link
              href={paths.REGISTER}
              className="text-ctp-green hover:underline"
            >
              Create account
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Page;
