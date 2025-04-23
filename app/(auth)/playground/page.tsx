"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "react-color-palette/css";
import { templateInfo, templateInfoType } from '@/lib/atom';
import { useRecoilValue } from 'recoil';
import Head from 'next/head';

const Page = () => {
  const [bgBtn, setBgBtn] = useColor("#000000");
  const [textColorBtn, setTextColorBtn] = useColor("#000000");
  const [borderRadiusBtn, setBorderRadiusBtn] = useState<number>(0);
  const [bgInput, setBgInput] = useColor("white");
  const [textColorInput, setTextColorInput] = useColor("#333333");
  const [borderRadiusForm, setBorderRadiusForm] = useState<number>(0);
  const [borderForm, setBorderForm] = useColor("#cccccc");
  const [bgHoverBtn, setBgHoverBtn] = useColor("#171717");
  const [textColorHoverBtn, setTextColorHoverBtn] = useColor("#ffffff");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isCodeCopy, setIsCodeCopy] = useState<boolean>(false);

  const [showColorPicker, setShowColorPicker] = useState<{
    bgBtn: boolean;
    textColorBtn: boolean;
    bgInput: boolean;
    textColorInput: boolean;
    borderForm: boolean;
    bgHoverBtn: boolean;
    textColorHoverBtn: boolean;
  }>({
    bgBtn: false,
    textColorBtn: false,
    bgInput: false,
    textColorInput: false,
    borderForm: false,
    bgHoverBtn: false,
    textColorHoverBtn: false,
  });

  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
      setShowColorPicker({
        bgBtn: false,
        textColorBtn: false,
        bgInput: false,
        textColorInput: false,
        borderForm: false,
        bgHoverBtn: false,
        textColorHoverBtn: false,
      });
    }
  };

  const getUserTemplateInfo = useRecoilValue<string | null>(templateInfo);
  const getUserTemplateInfoType = useRecoilValue<string>(templateInfoType);

  const StringConfig = `https://templates.smadmail.com/ui/form-m${(
    getUserTemplateInfoType.trim()
  )}.html${(
    getUserTemplateInfo ? getUserTemplateInfo.trim() : "?private_key=smad250208172113c78c8db84d&project_id=3fb6d9ce-2433-4b8c-9ede-bfd9c26c945d"
  )}${bgBtn.hex ? `&bg_btn=${bgBtn.hex.slice(1)}` : ''}${bgHoverBtn.hex ? `&bg_hover_btn=${bgHoverBtn.hex.slice(1)}` : ''}${textColorBtn.hex ? `&text_color_btn=${textColorBtn.hex.slice(1)}` : ''}${bgInput.hex ? `&bg_input=${bgInput.hex.slice(1)}` : ''}${textColorInput.hex ? `&text_color_input=${textColorInput.hex.slice(1)}` : ''}${borderRadiusForm ? `&border_radius_form=${borderRadiusForm}px` : ''}${borderRadiusBtn ? `&border_radius_btn=${borderRadiusBtn}px` : ''}${borderForm.hex ? `&border_form=${borderForm.hex.slice(1)}` : ''}${textColorHoverBtn.hex ? `&text_color_hover_btn=${textColorHoverBtn.hex.slice(1)}` : ''}`;

  const copyFinalCode = `
    <link rel="stylesheet" href="https://templates.smadmail.com/css/iframe.css" />
    <iframe src="${StringConfig}" scrolling="no"></iframe>`;

  const handleCopyCode = () => {
    setIsCodeCopy(true);
    navigator.clipboard.writeText(copyFinalCode);
    setTimeout(() => setIsCodeCopy(false), 1000);
  };P

  const toggleColorPicker = (picker: keyof typeof showColorPicker) => {
    setShowColorPicker((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {} as typeof showColorPicker),
      [picker]: !prev[picker],
    }));
  };

  return (
    <div className="flex flex-col w-full gap-y-2 lg:px-0 px-8 justify-center items-center">
      <Head>
        <link rel="stylesheet" href="https://templates.smadmail.com/css/iframe.css" />
      </Head>
      <h1 className="wb-gradient text-2xl sm:text-3xl my-3">Customize Your Form</h1>
      <div className="flex flex-col md:grid grid-cols-2 gap-2 p-2 w-full rounded-lg lg:h-96 bg-neutral-800">
        <div className="rounded-lg h-full flex flex-col justify-center items-center bg-neutral-300">
          <div className="flex justify-center items-center px-4 h-full md:pt-0 pt-8 w-full">
            {isMounted ? (
              <iframe key={StringConfig} src={StringConfig} scrolling="no" className="w-full h-full" />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <button
            onClick={handleCopyCode}
            className="border cursor-pointer mb-3 bg-neutral-700 text-white flex gap-x-2 mt-8 hover:bg-neutral-900 transition-colors duration-300 ease justify-center items-center border-neutral-500/40 px-2 py-1 rounded-lg"
          >
            <span className="text-sm">Copy Code</span>
            {isCodeCopy ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 stroke-slate-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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
        <div className="flex flex-col gap-y-2 p-4">
          <div className="grid xs:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4">
          {
  [
    { label: "Button Background", color: bgBtn, setColor: setBgBtn, picker: "bgBtn" as const },
    { label: "Button Text Color", color: textColorBtn, setColor: setTextColorBtn, picker: "textColorBtn" as const },
    { label: "Input Background", color: bgInput, setColor: setBgInput, picker: "bgInput" as const },
    { label: "Input Text Color", color: textColorInput, setColor: setTextColorInput, picker: "textColorInput" as const },
    { label: "Form Border Color", color: borderForm, setColor: setBorderForm, picker: "borderForm" as const },
    { label: "Button Hover Bg", color: bgHoverBtn, setColor: setBgHoverBtn, picker: "bgHoverBtn" as const },
    {
      label: "Button Hover Text Color",
      color: textColorHoverBtn,
      setColor: setTextColorHoverBtn,
      picker: "textColorHoverBtn" as const,
    },
  ].map(({ label, color, setColor, picker }) => (
    <div key={picker} className="flex flex-col gap-y-1 relative">
      <span className="text-xs lowercase text-neutral-400">{label}</span>
      <button
        className="styled-button rounded-xl bg-neutral-700 hover:bg-neutral-950 text-xs lowercase transition-all ease duration-400"
        onClick={() => toggleColorPicker(picker)}
      >
        Select Color
      </button>
      {showColorPicker[picker] && (
        <div ref={colorPickerRef} className="absolute z-10 color-picker">
          <ColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  ))
}
            <div className="flex flex-col gap-y-1 relative">
              <span className="text-xs lowercase text-neutral-400">Border radius form {borderRadiusForm}</span>
              <Slider
                min={0}
                max={100}
                trackStyle={{ backgroundColor: "#36f051" }}
                value={borderRadiusForm}
                onChange={(value: any) => setBorderRadiusForm(value)}
              />
            </div>
            <div className="flex flex-col gap-y-1 relative">
              <span className="text-xs lowercase text-neutral-400">Button Border Radius {borderRadiusBtn}</span>
              <Slider
                min={0}
                max={100}
                trackStyle={{ backgroundColor: "#fbbf24" }}
                value={borderRadiusBtn}
                onChange={(value: any) => setBorderRadiusBtn(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .styled-button {
          padding: 6px 12px;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .color-picker {
          width: 230px;
        }
      `}</style>
    </div>
  );
};

export default Page;
