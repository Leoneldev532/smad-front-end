"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import image1 from "@/public/list mail.png";
import form1 from "@/public/Form1.png";
import fast from "@/public/fast.png";
import allInOne from "@/public/allInOne.png";
import gsap from "gsap";
import { finalCode } from "@/lib/utils";
import { TabTemplateCode } from "./template/listTemplateCode";
import loader2 from "@/components/loader2";
import Script from "next/script";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.fromTo(
      ".part1",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
    )
      .fromTo(
        ".part11",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
      )
      .fromTo(
        ".part2",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
      )
      .fromTo(
        ".part3",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
      )
      .fromTo(
        ".part4",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
      )
      .fromTo(
        ".part5",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
      );
  }, []);

  const [isCodeCopy, setIsCodeCopy] = useState(false);

  const [isWeUserStarter, setIsWeUsertarter] = useState<boolean>(false);

  const handleCopyCode = () => {
    setIsCodeCopy(true);
    navigator.clipboard?.writeText(finalCode(TabTemplateCode[1]?.code));
    setTimeout(() => {
      setIsCodeCopy(false);
    }, 1000);
  };

  const handleShowMagicBlock = () => {
    gsap.to(".part3", {
      opacity: 0,
      y: 30,
      display: "none",
    });
    gsap.to(".magicPart", {
      opacity: 1,
      y: 0,
      display: "flex",
    });
  };

  const handleHideMagicBlock = () => {
    gsap.to(".part3", {
      opacity: 1,
      y: 0,
      display: "flex",
    });
    gsap.to(".magicPart", {
      opacity: 0,
      y: 30,
      display: "none",
    });
  };

  const [step, setStep] = useState<{
    step1: boolean;
    step2: boolean;
    step3: boolean;
  }>({
    step1: false,
    step2: false,
    step3: false,
  });

  const handleUpdateStep = (stepName: keyof typeof step, value: boolean) => {
    setStep((prevStep) => ({ ...prevStep, [stepName]: value }));
  };

  gsap.registerPlugin(ScrollTrigger);

  const handleStartMagicAction = () => {
    handleShowMagicBlock();
    setIsWeUsertarter(true);
    handleUpdateStep("step1", true);
  };

  const handleEndMagicAction = () => {
    handleHideMagicBlock();
    setIsWeUsertarter(false);
  };

  useEffect(() => {
    let currentIndex = 0;
    const blocs = document.querySelectorAll(".bloc1txt,.bloc2txt");
    const images = document.querySelectorAll(".fast-image,.all-in-one-image");
    let blocsLength = blocs.length;
    const animateText = () => {
      const tk = gsap.timeline();
      currentIndex = (currentIndex + 1) % blocsLength;
      tk.to(blocs[currentIndex], {
        opacity: 1,
        duration: 0.6,
        onComplete: () => {
          if (currentIndex === 0) {
            tk.to(images[0], {
              y: "0%",
              duration: 0.6,
            });
          }
          if (currentIndex === 1) {
            tk.to(images[1], {
              y: "-100%",
              duration: 0.6,
            });
          }

          setTimeout(() => {
            tk.to(blocs[currentIndex], {
              opacity: 0.4,
            });
            animateText();
          }, 3000);
        },
      });
    };

    animateText();
  }, []);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden items-center justify-between  px-8 lg:px-8 sm:px-8 py-4  ">
      <section className="flex part1   opacity-0 flex-col-reverse md:flex-row  w-full pt-10  md:pb-14  relative   justify-start items-center">
        <div className="w-full   md:w-8/12">
          <h1 className="md:text-5xl text-xl flex lg:text-4xl text-pretty w-full">
            Build Your Waitlist in Just 30 Seconds and Start Growing Today!
          </h1>
          <div className=" flex sm:flex-row md:w-8/12 flex-col justify-start gap-4   items-start py-6 ">
            <Link href="/login" className="w-full ">
              <Button
                variant="default"
                className="rounded-full px-0 md:px-16 font-bold  w-full  bx-shabtn py-2"
              >
                {" "}
                start now is free{" "}
              </Button>
            </Link>
            <Link href="/docs" className="w-full ">
              <Button
                variant="outline"
                className="rounded-full px-6  font-bold  w-full bx-shabtn py-2"
              >
                {" "}
                docs{" "}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-8  md:px-10 flex justify-center items-center">
          <Image
            src={image1}
            className="object-contain md:h-auto h-96"
            alt="hero section image"
          />
        </div>
      </section>
      <section className="flex flex-col opacity-0 part11 gap-x-3 w-full justify-start items-center">
        <h2 className="w-full text-left text-2xl md:text-4xl uppercase font-bold ">
          Why use Smad?
        </h2>
        <div className="w-full flex  flex-col-reverse md:flex-row-reverse py-8 gap-x-4 justify-start items-center">
          <div className="flex flex-col sm:flex-row md:flex-col gap-y-5 py-4 md:py-0 uppercase w-full  md:w-1/2">
            <div className="flex bloc1txt flex-col gap-y-3">
              <h2 className="text-2xl md:text-4xl line relative wb-gradient">
                Fast
              </h2>
              <p className="text-sm md:text-lg lowercase text-balance text-neutral-500">
                Build your waitlist for your landing page, blog etc... in less
                than 2 minutes
              </p>
            </div>
            <div className="flex bloc2txt  flex-col gap-y-3 opacity-40">
              <h2 className="text-2xl md:text-4xl line relative wb-gradient">
                All in One
              </h2>
              <p className="text-sm md:text-lg lowercase text-balance text-neutral-500">
                Build many waitlists for multiple projects in one location
                (smad)
              </p>
            </div>
          </div>
          {/* <div className="w-[5px] h-28 mr-8 shadow-md border border-neutral-400 rounded-full relative overflow-hidden">
            <div className="progress-bar w-full h-0 bg-green-500"></div>
    */}
          <div className="flex rounded-xs w-full h-72 flex-col overflow-hidden  md:w-1/2 md:h-96  relative justify-start items-center">
            <Image
              src={fast}
              alt="faster image"
              className="object-contain h-72 md:h-96 w-full absolute fast-image"
            />
            <Image
              src={allInOne}
              alt="all in one image"
              className="object-contain h-72 md:h-96 w-full absolute all-in-one-image"
            />
          </div>
        </div>
      </section>

      {/* <span>{isWeUserStarter ? "fdsgsdf" :"11111222222"}</span> */}
      <section className="w-full part2 opacity-0 flex flex-col md:flex-row justify-center overflow-hidden items-center my-36">
        <div className=" w-full flex flex-col justify-start items-start">
          <h2 className="text-2xl md:text-4xl w-full text-center uppercase mb-4 text-neutral-500 text-balance">
            Focus on <span className="text-white">building your product</span>,
            not your waitlist{" "}
          </h2>
        </div>
      </section>

      <section className="w-full part2 opacity-0 flex justify-between overflow-hidden items-center">
        <h2 className="text-2xl md:text-4xl w-full text-left uppercase ">
          How it works?
        </h2>

        {/* <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-wall-of-love-for-testimonial-light");</script> */}

        {/* <div className=" flex gap-x-2 justify-center items-center ">
          Or
          <button onClick={()=>handleStartMagicAction()} className={`rounded-lg flex-shrink ${isWeUserStarter ? "w-16" : "w-44" }
          text-center border relative overflow-hidden  justify-center border-neutral-700/50 text-white
          line1 bg-neutral-700/30 px-4 py-2 flex gap-x-1 items-center`}>

             {isWeUserStarter ?  <loader2/>  : <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="size-6 group-hover:fill-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>

            <span className="text-neutral-200 text-sm w-full text-center md:text-sm">
               Magic Starter
               </span></>
               }
          </button>


        </div> */}
      </section>

      <div className=" flex-col gap-y-2 opacity-0   magicPart  hidden justify-start items-start min-h-72 w-full  rounded-lg border border-neutral-800">
        <div className="flex justify-between p-3 items-center w-full bg-neutral-900">
          <span> Good Action </span>

          <button
            onClick={() => handleEndMagicAction()}
            className="
          text-center border relative overflow-hidden  text-xs justify-center rounded-lg border-neutral-500/50 text-white
          line1 bg-neutral-700/30 px-4 py-2 flex gap-x-2 items-center"
          >
            {" "}
            Stop{" "}
          </button>
        </div>

        <div className="flex justify-between  items-center w-full p-4">
          {step.step1 && (
            <div className="flex flex-col justify-start items-start gap-y-3">
              <span className="text-neutral-400">
                {" "}
                Begin by create an account Or connect click down{" "}
              </span>
              <div className="flex gap-x-3 justify-start items-start">
                <Link href="/register&magicaction">
                  <button
                    className=" px-3  bg-neutral-500 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "
                  >
                    {" "}
                    Sign Up{" "}
                  </button>
                </Link>

                <Link href="/login&magicaction">
                  <button
                    className=" px-3  bg-neutral-800 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "
                  >
                    {" "}
                    Sign In{" "}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <>
        {/* <div className="sm:hidden w-full flex flex-col   mt-3 gap-y-4">

      <div className="w-full  bg-neutral-700/50 rounded-xl  overflow-auto">

        <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

          <div className="flex justify-start gap-x-4 items-center">
            <div className="size-4 sm:size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">1</div>
            <span className="text-sm "> Begin by creating your account  </span>
          </div>

          <Link href="/register" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8  hover:bg-neutral-800 transition-all ease duration-400 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>

          </Link>



        </div>

     </div>


     <div className="w-full rounded-xl flex justify-start items-start border border-neutral-700/50  overflow-auto">

<div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

  <div className="flex justify-start gap-x-4 items-center">
    <div className="size-4 sm:size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">2</div>
    <span className="text-sm">  Copy your API private key on the /account page</span>
  </div>

  <Link href="/account" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8
   hover:bg-neutral-800 transition-all ease duration-400 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>

  </Link>



</div>

    </div>


    <div className="w-full border rounded-xl border-neutral-700/50  overflow-auto">

<div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

  <div className="flex justify-start  gap-x-4 items-center">
    <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">3</div>
    <span className="text-sm"> Create a project in the dashboard </span>
  </div>

  <Link href="/dashboard" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8  hover:bg-neutral-800 transition-all ease duration-400 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>

  </Link>



</div>

    </div>


    <div className="w-full rounded-xl border border-neutral-700/50  overflow-auto">

<div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

  <div className="flex justify-start  gap-x-4 items-center">
    <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">4</div>
    <span className="text-sm"> Copy the project ID through the horizontal three dots button modal and set it as   </span>
  </div>

  <Link href="/dashboard" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8 hover:bg-neutral-800 transition-all ease duration-400 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>

  </Link>



</div>

      </div>


      <div className="w-full  rounded-xl border border-neutral-700/50 overflow-auto">

<div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

  <div className="flex justify-start  gap-x-4 items-center">
    <div className="size-4  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">5</div>
    <span className="pr-8 text-sm "> Click the {"'Get Config'"} header button, select a model template, and copy the configuration. Generation is complete</span>
  </div>

  <Link href="/template" target='_blank' className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8 hover:bg-neutral-800 transition-all ease duration-400 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>

  </Link>



</div>

      </div>


<div className="w-full rounded-xl border border-neutral-700/50 overflow-auto">

<div className="w-full   pl-4 pr-2 py-2 flex gap-x-4  justify-between items-start">

  <div className="flex justify-start    gap-x-4 items-center">
    <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">6</div>
    <div className="flex">
      <span className="flex text-sm justify-start items-center gap-2"> Copy the code and set it in a file as a component and import it where you want  </span>
    </div>
  </div>
  <Link href="/template" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-8 min-w-8 hover:bg-neutral-800 transition-all ease duration-400 ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>

  </Link>



</div>

</div>
     </div> */}
        <section className="  part3 flex  mt-4 justify-start   pl-0 lg:pl-36 py-8 relative  opacity-0  line    rounded-xl flex-col gap-y-4 w-full ">
          <div className="lv flex rounded-xl flex-col gap-y-4 w-full"></div>

          <div className="flex  flex-col lr gap-y-3 border border-neutral-800 bg-neutral-700/30 justify-start w-full items-start py-4 rounded-md relative">
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center wb-gradient2 justify-center">
              1
            </div>
            <div className="flex gap-x-3 justify-start items-start w-full pl-6 md:pr-0 pr-3">
              <div className="flex flex-col justify-start gap-y-2 items-start">
                <b className="text-md">Create Account & Setup Project</b>
                <span className="text-neutral-400 tex-xs sm:text-sm md:text-base">
                  Create your account and set up your first project in the
                  dashboard.
                </span>

                <Link
                  href="/register"
                  className=" px-3 my-2 bg-neutral-800 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "
                >
                  <button className="">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col  lr gap-y-3 border border-neutral-800 bg-neutral-700/30 justify-start w-full items-start py-4 rounded-md relative">
            <div
              className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white rounded-full w-8 h-8 flex
        items-center wb-gradient2 justify-center"
            >
              2
            </div>

            <div className="flex gap-x-3 justify-start items-start w-full pl-6 md:pr-0 pr-3">
              <div className="flex flex-col justify-start gap-y-2 items-start">
                <b className="text-md">Configure Environment</b>
                <span className="text-neutral-400 tex-xs sm:text-sm md:text-base">
                  Copy the modal code shown and paste it into your code: (basic
                  form default)
                </span>
                <span className="text-neutral-500 pr-9">
                  If the project is already created, click on the three dots of
                  the project, select ({"Copy Code Integration,"}) and copy the
                  code.
                </span>
              </div>
            </div>
          </div>
        </section>
      </>

      <section className="flex w-full gap-4 py-16 justify-start items-start  flex-col ">
        <h2 className="text-2xl md:text-4xl md:w-1/3 text-balance  lg:w-1/2 ">
          {" "}
          Build fast a waitlist form with Template Available{" "}
        </h2>
        <span className="max-w-lg text-neutral-500">
          {" "}
          Simply clone the template repository, replace the project_id and
          private_key with your own credentials, customize it to fit your needs,
          and deploy effortlessly.{" "}
        </span>

        <div className="py-10 flex  md:flex-row flex-col gap-8 justify-start w-full items-start">
          <div className="w-full md:w-1/2 flex h-96   rounded-xl overflow-hidden  flex-col justify-start items-start relative">
            <Image
              className="w-full absolute top-0 left-0 h-full object-right object-cover"
              src={
                "https://res.cloudinary.com/dx1axx1s2/image/upload/v1742872680/developers/trchxjggijugqvewcov5.png"
              }
              alt="template 1 "
              height={500}
              width={400}
            />

            <div
              className="w-full h-full  bg-gradient-to-t from-neutral-800 via-transparent to-transparent
                  absolute top-0 left-0 flex justify-between items-end p-4 overflow-hidden"
            >
              <h5 className="text-lg "> waitlist product template 1 </h5>

              <Link
                href="/creative-template"
                className="underline text-sm flex justify-center items-center w-auto gap-x-1"
              >
                {" "}
                <span> See more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex h-96   rounded-xl overflow-hidden  flex-col justify-start items-start relative">
            <Image
              className="w-full absolute top-0 left-0 h-full object-center object-cover"
              src={
                "https://res.cloudinary.com/dx1axx1s2/image/upload/v1742859922/developers/n4daqwginapyofulr80h.png"
              }
              alt="template 1 "
              height={500}
              width={400}
            />

            <div
              className="w-full h-full  bg-gradient-to-t from-neutral-800 via-transparent to-transparent
  absolute top-0 left-0 flex justify-between items-end p-4 overflow-hidden"
            >
              <h5 className="text-lg "> waitlist product template 2 </h5>

              <Link
                href="/creative-template"
                className="underline text-sm flex justify-center items-center w-auto gap-x-1"
              >
                {" "}
                <span> See more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full gap-4 py-6 md:justify-between justify-start  md:flex-row flex-col ">
        <h2 className="text-2xl md:text-4xl md:w-1/3  lg:w-1/2 "> FAQ </h2>
        <ul className="md:w-1/2 divide-y  border border-neutral-700 overflow-hidden transition-all ease duration-300 rounded-xl">
          <li>
            <details className="group">
              <summary className="flex items-center bg-neutral-800 gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>How can I use Smad to build my waitlist ?</span>
              </summary>
              <article className=" p-4">
                <ol className="list-decimal flex flex-col gap-y-3 text-neutral-400 list-inside">
                  <li>
                    Create an account on Smad and set up your first project in
                    the dashboard.
                  </li>
                  <li>
                    Copy the modal code shown and paste it into your code:
                    (basic form default). If the project is already created,
                    click on the three dots of the project, select{" "}
                    {"Copy Code Integration"} and copy the code.
                  </li>
                </ol>
              </article>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center bg-neutral-800 gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>How can I customize my waitlist form?</span>
              </summary>
              <article className="p-4">
                <ol className="list-decimal flex flex-col gap-y-3 text-neutral-400 list-inside">
                  <li>Navigate to the dashboard and select your project.</li>
                  <li>
                    Click on the vertical 3 dots of the project and select{" "}
                    {"Copy Code Integration"}.
                  </li>
                  <li>
                    In the modal that appears, click on the {"Customize"}{" "}
                    button.
                  </li>
                  <li>
                    Use the editor to change styles and configure settings.
                  </li>
                  <li>Copy the updated integration code.</li>
                  <li>
                    Paste the updated code into your website to apply the
                    customizations.
                  </li>
                </ol>
              </article>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  ></path>
                </svg>
                <span>Is it true that it is free?</span>
              </summary>
              <article className="px-4 pb-4">
                <p className="text-neutral-400">
                  Yes, Smad offers a free plan that allows you to create mailing
                  lists and waitlists. You can start using it without any cost.
                </p>
              </article>
            </details>
          </li>
        </ul>
      </section>
      <section className="flex w-full gap-4 py-6 md:justify-between justify-start  md:flex-row flex-col ">
        <h2 className="text-2xl md:text-4xl md:w-1/3  lg:w-1/2 "> Pricing </h2>
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="border border-neutral-700 rounded-xl overflow-hidden">
            <div className="bg-neutral-800 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-medium">Free Plan</h3>
              <span className="text-xl font-bold">$0</span>
            </div>
            <div className="p-4 flex flex-col gap-y-4  w-full">
              <ul className="list-disc mx-4   w-full text-neutral-400 ">
                <li>Create unlimited mailing lists and waitlists.</li>
                <li>Access all basic templates and integrations.</li>
                <li>Customize your forms.</li>
                <li>Export as CSV format.</li>
                <li>Share data with emailing service (Resend).</li>
              </ul>
              <Link href="/login" className="w-full ">
                <Button
                  variant="default"
                  className="rounded-full px-0 md:px-16 font-bold  w-full  bx-shabtn py-2"
                >
                  {" "}
                  start now is free{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
