"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "@/axios";
import { getToken } from "@/utils/functions";
import { getCurrent } from "@/store/user/asyncActions";
import { Loading } from "@/components/loadings";

const AvatarSetting = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state: any) => state.user);
  const [avatar, setAvatar] = React.useState<string>(current.avatar);
  const [file, setFile] = React.useState<any>(null);
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

  const handleChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        return toast.error("Please choose a png or jpg file");
      }
      if (file.size > 1024 * 1024 * 2) {
        return toast.error("Please choose a file smaller than 2MB");
      }
      setFile(file);
      setIsChange(true);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSaveAvatar = async () => {
    setIsUploading(true);
    const response = await axios({
      method: "PUT",
      url: "/user",
      data: {
        avatar: file,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setIsUploading(false);
    if (response.data.err === 0) {
      toast.success("✨ Update avatar success!");
      setIsChange(false);
      // @ts-ignore
      dispatch(getCurrent());
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-[250px] h-[250px]">
        <Image
          src={avatar}
          alt="avatar"
          layout="fill"
          className="rounded-full object-cover border-4 border-gray-100 shadow-lg"
        />
      </div>
      <div className="text-center flex items-center gap-3 justify-center">
        {isUploading ? (
          <button
            className="px-4 py-2 rounded-md border border-ctp-green"
            disabled
          >
            <Loading isSmall={true} />
          </button>
        ) : (
          <>
            {isChange ? (
              <button
                className="px-4 py-2 rounded-md cursor-pointer border border-ctp-red text-ctp-red hover:bg-ctp-red hover:text-white transition duration-300 ease-in-out"
                onClick={() => {
                  setAvatar(current.avatar);
                  setFile(null);
                  setIsChange(false);
                }}
              >
                Cancel
              </button>
            ) : (
              <div>
                <label
                  htmlFor="avatar"
                  className="px-4 py-2 rounded-md cursor-pointer border border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-white transition duration-300 ease-in-out"
                >
                  Change Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
              </div>
            )}
            {isChange && (
              <button
                className="px-4 py-2 rounded-md cursor-pointer border border-ctp-green text-ctp-green hover:bg-ctp-green hover:text-white transition duration-300 ease-in-out"
                onClick={handleSaveAvatar}
              >
                Save
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AvatarSetting;
