"use client";
import React, { useState, useRef, useEffect } from "react";
import icons from "@/utils/icons";
import { MenuShare } from "@/components/posts";

const { RiMoreFill } = icons;

const ShowMore: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex flex-col gap-2 items-center cursor-pointer relative"
      ref={dropdownRef}
    >
      <RiMoreFill
        className="text-2xl"
        onClick={() => setIsShow((prev) => !prev)}
      />
      {isShow && <MenuShare />}
    </div>
  );
};

export default ShowMore;
