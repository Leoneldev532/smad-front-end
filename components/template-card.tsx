import { TabTemplateCode } from "@/app/template/listTemplateCode";
import { templateCardType } from "@/lib/type";
import { finalCode } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const TemplateCard = (templateCardProps: templateCardType) => {
  const [isCodeCopy, setIsCodeCopy] = useState(false);

  const handleCopyCode = () => {
    setIsCodeCopy(true);
    navigator.clipboard?.writeText(
      finalCode(TabTemplateCode[templateCardProps?.id || 0]?.code),
    );
    setTimeout(() => {
      setIsCodeCopy(false);
    }, 1000);
  };

  return (
    <div
      className={`
          rounded-xl 
      border  bg-neutral-700/30  flex-col line flex justify-around  border-neutral-500/40 items-center min-h-16 overflow-hidden relative w-full`}
    >
      <div className="w-full flex justify-center items-center md:px-0 px-4">
        {templateCardProps?.form}
      </div>

      <div className="flex justify-end items-end w-full p-6 ">
        <button
          onClick={() => handleCopyCode()}
          className="border cursor-pointer   flex gap-x-2 mt-8 hover:bg-neutral-900 transition-colors 
      duration-300 ease justify-center items-center border-neutral-500/40 text-neutral-500 px-2 py-1 rounded-lg"
        >
          <span>Copy Code</span>
          {isCodeCopy ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 stroke-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6 stroke-neutral-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
