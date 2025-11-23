"use client";
import { templateCardType } from "@/lib/type";
import React from "react";
import FormRegisterEmail1 from "@/components/formRegisterEmail1";
import FormRegisterEmail2 from "@/components/formRegisterEmail2";
import FormRegisterEmail3 from "@/components/formRegisterEmail3";
import TemplateCard from "@/components/templateCard";
import EmailRegistrationForm from "@/components/form";

const Page = () => {
  const tabTemplateCode: templateCardType[] = [
    {
      id: 0,
      name: "form 1",
      form: <FormRegisterEmail1 key={1} />,
    },
    {
      id: 1,
      name: "form 2",
      form: <FormRegisterEmail2 key={2} />,
    },
    {
      id: 2,
      name: "form 3",
      form: <FormRegisterEmail3 key={3} />,
    },
  ];

  const tabLanguage = [
    {
      id: 2,
      name: "React css",
    },
    {
      id: 3,
      name: "React tailwind",
    },
    {
      id: 3,
      name: "React Typescript css",
    },
    ,
    {
      id: 3,
      name: "React Typescript tailwind",
    },
    {
      id: 4,
      name: "Next js css",
    },
    {
      id: 5,
      name: "Next js tailwind",
    },
    {
      id: 5,
      name: "Next js Typescript css",
    },
    ,
    {
      id: 5,
      name: "Next js Typescript tailwind ",
    },
    {
      id: 6,
      name: "Vue js css",
    },
    {
      id: 7,
      name: "Vue js tailwind",
    },
    {
      id: 7,
      name: "Vue js Typescript css",
    },
    {
      id: 8,
      name: "Html et Css",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col w-full py-5 px-4 items-start justify-between ">
      <div className="flex w-full  flex-col px-8  lg:px-0 relative   justify-start items-start">
        <h1 className="text-2xl text-white md:text-4xl py-5 text-balance">
          Copy code of template you want {"😊"}
        </h1>

        <span className="text-md  text-neutral-200 max-w-2xl mb-2 ">
          These forms are build with : React js / Next js , tailiwind css ,
          typescript , axios, you maybe need to install some dependencies to
          make it work properly. you can also use it as a base to build your own
          form (In the next step, we will set up the configuration based on the
          languages) .
        </span>

        <div className="grid sm:grid-cols-2  gap-4 grid-cols-1 lg:grid-cols-3 z-10  gap-x-4 mt-4 relative  w-full ">
          {tabTemplateCode?.map((option: templateCardType, index: number) => (
            <TemplateCard
              key={index}
              id={option.id}
              name={option.name}
              form={option?.form}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
