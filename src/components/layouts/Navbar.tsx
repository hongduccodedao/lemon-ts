"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { itemMenu, paths } from "@/utils/paths";
import icons from "@/utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "@/store/user/asyncActions";
import Image from "next/image";
import { handleLogoutRedux } from "@/store/user/userSlice";

const { RiSearch2Line, RiLogoutCircleRLine } = icons;

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLogged, current } = useSelector((state: any) => state.user);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLogged) {
        // @ts-ignore
        dispatch(getCurrent());
      }
    }, 300);

    return () => clearTimeout(setTimeoutId);
  }, [dispatch, isLogged]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
              placeholder="Search..."
            />
            <button className="py-2 px-3 hover:bg-ctp-green h-full rounded-r-md hover:text-ctp-base text-xl">
              <RiSearch2Line />
            </button>
          </div>
        </div>
        {isLogged ? (
          <div className="flex items-center gap-5">
            <Link href={paths.CREATE}>
              <span className="text-ctp-green border border-ctp-green px-4 py-3 h-11 rounded-md hover:bg-ctp-green hover:text-ctp-base">
                Create Post
              </span>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <div
                className="relative w-10 h-10"
                onClick={() => setIsShowMenu(!isShowMenu)}
              >
                <Image
                  src={current?.avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full cursor-pointer hover:opacity-80 duration-300 transition-all ease-in-out object-center object-cover"
                />
              </div>
              {isShowMenu && (
                <div className="absolute right-0 bg-ctp-base border border-ctp-overlay0 p-2 rounded-md z-10 whitespace-nowrap w-[250px]">
                  <Link href={`/${current?._id}`}>
                    <div className="hover:bg-ctp-green p-2 rounded-md hover:text-ctp-base cursor-pointer">
                      {current?.firstName} {current?.lastName}
                    </div>
                  </Link>
                  <div className="w-full h-[0.5px] bg-ctp-overlay0 bg-opacity-40 my-2"></div>
                  {itemMenu.map((item, index) => (
                    <Link href={item.path} key={index}>
                      <div
                        className="hover:bg-ctp-green p-2 rounded-md hover:text-ctp-base cursor-pointer"
                        onClick={() => setIsShowMenu(false)}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))}
                  <div className="w-full h-[0.5px] bg-ctp-overlay0 bg-opacity-40 my-2"></div>
                  <div
                    className="hover:bg-ctp-red p-2 rounded-md hover:text-ctp-base cursor-pointer"
                    onClick={() => dispatch(handleLogoutRedux())}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link href={paths.LOGIN} title="Login">
              <span className="hover:text-ctp-green hover:underline">
                Login
              </span>
            </Link>
            <Link href={paths.REGISTER} title="Register">
              <span className="text-ctp-green border border-ctp-green px-4 py-3 h-11 rounded-md hover:bg-ctp-green hover:text-ctp-base">
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
