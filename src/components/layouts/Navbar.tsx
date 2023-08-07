import React from "react";
import Link from "next/link";
import { paths } from "@/utils/paths";
import icons from "@/utils/icons";

const { RiSearch2Line } = icons;

const Navbar = () => {
  // const { isLogged } = useSelector((state: any) => state.user);

  return (
    <div className="border-b border-ctp-overlay0 w-full bg-ctp-base">
      <div className="mx-auto max-w-[1200px] py-5 flex items-center justify-between">
        <div className="flex items-center gap-10 flex-1">
          <Link href={paths.HOME}>
            <span className="font-semibold text-2xl">{`🍋LeM0n c0d3`}</span>
          </Link>
          <div className="flex items-center border border-ctp-overlay0 rounded-md h-11 max-w-[400px] w-full">
            <input
              type="text"
              className="bg-transparent p-2 outline-none flex-1"
            />
            <button className="py-2 px-3 hover:bg-ctp-green h-full rounded-r-md hover:text-ctp-base text-xl">
              <RiSearch2Line />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href={paths.LOGIN} title="Login">
            <span className="hover:text-ctp-green hover:underline">Login</span>
          </Link>
          <Link href={paths.REGISTER} title="Register">
            <span className="text-ctp-green border border-ctp-green px-4 py-3 h-11 rounded-md hover:bg-ctp-green hover:text-ctp-base">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
