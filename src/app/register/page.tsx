"use client";
import React from "react";
import { LoginWithButton, SmallHeading } from "@/components/login";
import { InputForm, InputPassword } from "@/components/inputs";
import Head from "next/head";
import Link from "next/link";
import { paths } from "@/utils/paths";
import { toast } from "react-toastify";
import * as apis from "@/apis";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: any) => state.user);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const handleRegister = async () => {
    email.trim();
    password.trim();
    firstName.trim();
    lastName.trim();
    confirmPassword.trim();

    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      confirmPassword === ""
    ) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password must be same");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const response = await apis.apiRegister(
      email,
      password,
      firstName,
      lastName
    );
    if (response.err === 0) {
      toast.success(response.message);
      //   reset form
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setConfirmPassword("");

      // window.location.href = paths.LOGIN;
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Lemon Page🍋</title>
      </Head>
      {isLogged ? (
        <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
          <h3 className="text-center font-bold text-3xl">You are logged in</h3>
          <div className="text-center">
            <Link
              href={paths.DASHBOARD}
              className="text-ctp-green hover:underline"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-[700px] mx-auto bg-ctp-surface0 p-5 rounded-lg my-20">
          <h3 className="text-center font-bold text-3xl">
            Welcome to Lemon Code🍋
          </h3>
          <div className="my-3">
            <LoginWithButton />
          </div>
          <SmallHeading text="Or create an account with email" />
          <div className="flex flex-col gap-3 py-3">
            <div className="flex items-center gap-3">
              <InputForm
                id={firstName}
                type={firstName}
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
                placeholder="First Name"
                required={true}
              />
              <InputForm
                id={lastName}
                type={lastName}
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
                placeholder="Last Name"
                required={true}
              />
            </div>
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
            <InputPassword
              id={confirmPassword}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm Password"
              required={true}
            />
          </div>
          <div className="text-center">
            <button
              className="flex items-center justify-center w-full bg-ctp-green text-ctp-base py-2 text-lg rounded-md"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <span className="pt-3">
              Already have an account?{" "}
              <Link
                href={paths.LOGIN}
                className="text-ctp-green hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
