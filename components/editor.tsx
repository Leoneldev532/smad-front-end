//@ts-nocheck
"use client"
import React, { useEffect, useRef, useState } from "react";
import Prism from 'prismjs';

const CodeBlock = ({ code, language }: { language: string; code: string }) => {

  const [isCodeCopy, setIsCodeCopy] = useState(false)
  const [numberLines, setNumberOfLines] = useState(0)
  const refCode = useRef<HTMLElement>(null)

  useEffect(() => {
    Prism.highlightAll();
    const numberOfLines = code.split('\n').length;
    setNumberOfLines(numberOfLines)

  }, [language, code])


  const linesArray = Array.from({ length: numberLines })



  const handleCopyCode = () => {
    setIsCodeCopy(true)
    navigator.clipboard?.writeText(code.trim())
    setTimeout(() => {
      setIsCodeCopy(false)
    }, 1000)
  }

  return (
    <div className="rounded-xl editor bg-neutral-900 backdrop-blur-3xl  border ring-offset-1 border-neutral-700 w-full overflow-hidden">
      <div className="flex justify-between border-b border-neutral-700 items-center w-full ">
        <div className="w-1/3 flex justify-start items-center gap-x-2 px-3 py-2 ">
          <div className="flex justify-center items-center h-3 w-3 bg-white rounded-full"></div>
          <div className="flex justify-center items-center h-3 w-3 bg-white  rounded-full"></div>

          <div className="flex justify-center items-center h-3 w-3 bg-white rounded-full"></div>
        </div>
        {isCodeCopy ?

          <button onClick={() => handleCopyCode()} className="p-2 flex justify-center border-neutral-700  items-center rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

              className="size-6 stroke-slate-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>

          :
          <button onClick={() => handleCopyCode()} className="p-2 flex justify-center border-neutral-700  items-center rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 stroke-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </button>
        }
      </div>
      <div>
        <div className="w-full max-h-[50vh] flex justify-start   items-start overflow-auto">
          <div className="line-number flex flex-col px-2 whitespace-pre h-full ">
            {linesArray.map((line, index) => (
              <span className="hidden md:block text-slate-600 flex-none  text-right select-none w-[1.125rem]" key={index}>{index + 1}</span>
            ))}
          </div>
          <div className=" w-11/12 overflow-auto flex justify-start items-start  h-full  ">
            <pre className="h-full w-full overflow-hidden" >
              <code ref={refCode} className={`language-${language} overflow-hidden  h-full w-full `}>{code.trim()}</code>
            </pre>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CodeBlock;
