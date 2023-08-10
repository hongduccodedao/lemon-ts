"use client";
import React from "react";
import { InputForm } from "@/components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as apis from "@/apis";
import { Loading } from "@/components/loadings";
import { getCurrent } from "@/store/user/asyncActions";

const InfoSetting = () => {
  const { current } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState<string>(current.firstName);
  const [lastName, setLastName] = React.useState<string>(current.lastName);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSaveInfo = async () => {
    firstName.trim();
    lastName.trim();
    if (!firstName || !lastName)
      return toast.error("Please fill in all fields");
    if (firstName === current.firstName && lastName === current.lastName) {
      return;
    }
    setIsLoading(true);
    const response = await apis.apiUpdateUser(firstName, lastName);
    setIsLoading(false);
    if (response.err === 0) {
      toast.success("✨ Update your information success!");
      // @ts-ignore
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-3">
        <InputForm
          id={firstName}
          type="text"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          placeholder="First name"
        />
        <InputForm
          id={lastName}
          type="text"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          placeholder="Last name"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-md cursor-pointer border border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-white transition duration-300 ease-in-out"
            onClick={() => handleSaveInfo()}
            disabled={isLoading ? true : false}
          >
            {isLoading ? <Loading isSmall={true} /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoSetting;
