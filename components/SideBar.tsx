import Image from "next/image";
import React from "react";
import logo from "@/public/logo.png";
import LinkSideBar  from "./LinkSideBar";
import { LinkSideBarPropsType } from "@/lib/type";
const sideBar = () => {
  const LinkTab: LinkSideBarPropsType[] = [
    {
      title: "account",
      link: "link",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Sign-out",
      link: "link",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start bg-neutral-500/10 min-h-[98vh]  py-2 px-4 items-start h-full w-full rounded-xl gap-4">
      <div className="w-full flex flex-col  justify-start items-center  ">
        <div className="flex text-xl gap-x-4 justify-start items-center h-full w-full">
          <Image src={logo} className="object-contain h-12 w-12" alt="logo" />
          <span> Smad </span>
        </div>
        <div className="w-full py-4 flex flex-col  gap-y-4">
          {LinkTab?.map((link: LinkSideBarPropsType, index: number) => (
            <LinkSideBar key={index} LinkSideBarProps={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default sideBar;
