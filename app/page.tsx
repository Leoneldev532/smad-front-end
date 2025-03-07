
"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import  image1 from "@/public/list mail.png"
import  formImage from "@/public/Form34.png"
import fast from "@/public/fast.png"
import allInOne from "@/public/allInOne.png"
import gsap from  "gsap"
import { finalCode } from "@/lib/utils";
import { TabTemplateCode } from "./template/listTemplateCode";
import Loader2 from "@/components/Loader2";
import Script from "next/script";
import { ScrollTrigger } from "gsap/all";

export default function Home() {



    useEffect(()=>{
      const tl = gsap.timeline({defaults:{ease:"power1.out"}})


      tl.fromTo(".part1",{
        y:40,
        opacity:0
      },{
        y:0,
        opacity:1,
        duration:0.6,

      }).fromTo(".part11",{
        y:40,
        opacity:0},
        {
          y:0,
          opacity:1,
          duration:0.6,
      }).fromTo(".part2",{
        y:40,
        opacity:0
      },{
        y:0,
        opacity:1,
        duration:0.6,

      }).fromTo(".part3",{
        y:40,
        opacity:0
      },{
        y:0,
        opacity:1,
        duration:0.6,

      }).fromTo(".part4",{
        y:40,
        opacity:0
      },{
        y:0,
        opacity:1,
        duration:0.6,

      }).fromTo(".part5",{
        y:40,
        opacity:0
      },{
        y:0,
        opacity:1,
        duration:0.6,

      })


    },[])

    const [isCodeCopy, setIsCodeCopy] = useState(false)

    const [isWeUserStarter,setIsWeUsertarter] = useState<boolean>(false)

         const handleCopyCode = () => {
           setIsCodeCopy(true)
           navigator.clipboard?.writeText(finalCode(TabTemplateCode[1]?.code))
           setTimeout(() => {
             setIsCodeCopy(false)
           }, 1000)
         }

         const handleShowMagicBlock = () =>{
          gsap.to(".part3",{
            opacity:0,
            y:30,
            display:"none"
           })
           gsap.to(".magicPart",{
            opacity:1,
            y:0,
            display:"flex"
           })
         }

         const handleHideMagicBlock = () =>{
          gsap.to(".part3",{
            opacity:1,
            y:0,
            display:"flex"
           })
           gsap.to(".magicPart",{
            opacity:0,
            y:30,
            display:"none"
           })
         }


         const [step, setStep] = useState<{
          step1: boolean,
          step2: boolean,
          step3: boolean
        }>({
          step1: false,
          step2: false,
          step3: false
        });

        const handleUpdateStep = (stepName: keyof typeof step, value: boolean) => {
          setStep(prevStep => ({ ...prevStep, [stepName]: value }));
        };

        gsap.registerPlugin(ScrollTrigger);

         const handleStartMagicAction = () =>{
           handleShowMagicBlock()
           setIsWeUsertarter(true)
           handleUpdateStep("step1",true)
         }

         const handleEndMagicAction = () =>{
           handleHideMagicBlock()
          setIsWeUsertarter(false)
         }




          useEffect(()=>{
            let currentIndex = 0 ;
            const blocs = document.querySelectorAll(".bloc1txt,.bloc2txt")
            const images = document.querySelectorAll(".fast-image,.all-in-one-image")
            let blocsLength = blocs.length
            const animateText = () =>{
             const tk = gsap.timeline()
             currentIndex = (currentIndex  + 1) % blocsLength
              tk.to(blocs[currentIndex], {
                opacity: 1,
                duration:0.6,
                onComplete: () => {

                  if(currentIndex === 0 ){
                    tk.to(images[0],{
                      y: `0%`,
                      duration:0.6,
                    });
                  }
                  if(currentIndex === 1 ){
                    tk.to(images[1],{
                      y: `-100%`,
                      duration:0.6,
                    });
                  }

                setTimeout(() => {
                  tk.to(blocs[currentIndex], {
                  opacity: 0.4,
                  });
                  animateText();
                }, 3000);
                },
              })
           }

           animateText()

          },[])








  return (
    <main className="flex min-h-screen flex-col overflow-hidden items-center justify-between  px-8 lg:px-8 sm:px-8 py-4  ">

      <section className="flex part1   opacity-0 flex-col-reverse md:flex-row  w-full pt-10  md:pb-14  relative   justify-start items-center">

        <div className="w-full   md:w-8/12">
        <h1 className="md:text-5xl text-xl  flex lg:text-4xl text-balance  w-full ">

        Wow! Create mailing list , waitlist effortlessly and focus on growing your business.

        </h1>
        <div className=" flex sm:flex-row md:w-8/12 flex-col justify-start gap-4   items-start py-6 ">
          <Link href="/login" className="w-full "><Button variant="default" className="rounded-full px-0 md:px-16 font-bold  w-full  bx-shabtn py-2"> start now is free </Button></Link>
          <Link href="/docs" className="w-full ">
            <Button variant="outline" className="rounded-full px-6  font-bold  w-full bx-shabtn py-2"> docs </Button>
          </Link>

        </div>

        </div>
        <div className="w-full md:w-1/2 px-8  md:px-10 flex justify-center items-center">
        <Image  src={image1} className="object-contain md:h-auto h-96" alt="hero section image" />
        </div>

      </section>
      <section className="flex flex-col opacity-0 part11 gap-x-3 w-full justify-start items-center">
        <h2 className="w-full text-left uppercase font-bold opacity-80">
          Why use Smad?
        </h2>
        <div className="w-full flex  flex-col-reverse md:flex-row-reverse py-8 gap-x-4 justify-start items-center">
          <div className="flex flex-col sm:flex-row md:flex-col gap-y-5 py-4 md:py-0 uppercase w-full  md:w-1/2">
            <div className="flex bloc1txt flex-col gap-y-3">
              <h2 className="text-2xl md:text-4xl line relative wb-gradient">Fast</h2>
              <p className="text-sm md:text-lg lowercase text-balance text-neutral-500">
                Build your newsletter, waitlist form for your landing page, blog etc... in less than 3 minutes
              </p>
            </div>
            <div className="flex bloc2txt  flex-col gap-y-3 opacity-40">
              <h2 className="text-2xl md:text-4xl line relative wb-gradient">All in One</h2>
              <p className="text-sm md:text-lg lowercase text-balance text-neutral-500">
                Build many waitlists and newsletters for multiple projects in one location (smad)
              </p>
            </div>
          </div>
          {/* <div className="w-[5px] h-28 mr-8 shadow-md border border-neutral-400 rounded-full relative overflow-hidden">
            <div className="progress-bar w-full h-0 bg-green-500"></div>
    */}
            <div className="flex rounded-xs w-full h-56 flex-col overflow-hidden  md:w-1/2 md:h-96  relative justify-start items-center">
            <Image src={fast} alt="faster image" className="object-contain h-auto md:h-96 w-full absolute fast-image" />
            <Image src={allInOne} alt="all in one image" className="object-contain h-auto md:h-96 w-full absolute all-in-one-image" />
          </div>
        </div>
      </section>


    {/* <span>{isWeUserStarter ? "fdsgsdf" :"11111222222"}</span> */}

      <section className="w-full part2 opacity-0 flex justify-between overflow-hidden items-center">
        <h2 className="opacity-80 w-full text-left uppercase ">How it works?</h2>



{/* <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, "#testimonialto-wall-of-love-for-testimonial-light");</script> */}

        {/* <div className=" flex gap-x-2 justify-center items-center ">
          Or
          <button onClick={()=>handleStartMagicAction()} className={`rounded-lg flex-shrink ${isWeUserStarter ? "w-16" : "w-44" }
          text-center border relative overflow-hidden  justify-center border-neutral-700/50 text-white
          line1 bg-neutral-700/30 px-4 py-2 flex gap-x-1 items-center`}>

             {isWeUserStarter ?  <Loader2/>  : <>
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


      <div className=" flex-col gap-y-2 opacity-0   magicPart  hidden justify-start items-start min-h-72 w-full my-3 rounded-lg border border-neutral-800">
        <div className="flex justify-between p-3 items-center w-full bg-neutral-900">
          <span> Good Action </span>

          <button onClick={()=>handleEndMagicAction()}   className="
          text-center border relative overflow-hidden  text-xs justify-center rounded-lg border-neutral-500/50 text-white
          line1 bg-neutral-700/30 px-4 py-2 flex gap-x-2 items-center">  Stop   </button>


         </div>

         <div className="flex justify-between  items-center w-full p-4">
              {step.step1 &&
               <div className="flex flex-col justify-start items-start gap-y-3">
                <span className="text-neutral-400"> Begin by create an account Or connect click down </span>
                <div className="flex gap-x-3 justify-start items-start">

                  <Link href="/register&magicaction"><button className=" px-3  bg-neutral-500 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "> Sign Up </button></Link>

     <Link href="/login&magicaction"><button className=" px-3  bg-neutral-800 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "> Sign In </button></Link>
           </div>
                </div> }
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
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center wb-gradient2 justify-center">1</div>
        <div className="flex gap-x-3 justify-start items-start w-full pl-6 md:pr-0 pr-3">
          <div className="flex flex-col justify-start gap-y-2 items-start">
            <b className="text-md">Create Account & Setup Project</b>
            <span className="text-neutral-400 tex-xs sm:text-sm md:text-base">Create your account and set up your first project in the dashboard.</span>

          <Link href="/register" className=" px-3 my-2 bg-neutral-800 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "><button className="">Sign Up</button></Link>
          </div>
        </div>
          </div>

          <div className="flex flex-col  lr gap-y-3 border border-neutral-800 bg-neutral-700/30 justify-start w-full items-start py-4 rounded-md relative">

        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white rounded-full w-8 h-8 flex
        items-center wb-gradient2 justify-center">2</div>

        <div className="flex gap-x-3 justify-start items-start w-full pl-6 md:pr-0 pr-3">
          <div className="flex flex-col justify-start gap-y-2 items-start">
            <b className="text-md">Configure Environment</b>
            <span className="text-neutral-400 tex-xs sm:text-sm md:text-base">
                  Copy the modal code shown and paste it into your code: (basic form default)
                    </span>
                    <span className="text-neutral-500 pr-9">If the project is already created,
                      click on the three dots of the project, select ({"Copy Code Integration,"}) and copy the code.</span>


          </div>
        </div>
          </div>




          {/* <div className="flex flex-col  lr gap-y-3 border border-neutral-800 bg-neutral-700/30 justify-start w-full items-start py-4 rounded-md relative">
        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center wb-gradient2 justify-center">3</div>
        <div className="flex gap-x-3 justify-start items-start w-full pl-6 md:pr-2 pr-3">
          <div className="flex flex-col justify-start gap-y-2 items-start">
            <b className="text-md">Import & Start Using</b>
            <span className="text-neutral-400 text-sm md:text-base">Choose your template on page /template accessible by the button &quot;get Config&quot;,
              copy the configuration, and import it into your project as component.</span>


          </div>

        </div>
          </div> */}

      </section>
        </>
        <br/>

        {/* <div className="flex flex-col justify-start items-start px-36">
                    <span> ** If you want a customizable template (optional) </span>

            <span className="text-neutral-400 text-xs md:text-sm pr-8 text-balance italic">Choose your template on page /template accessible by the button &quot;get Config&quot;,
              copy the configuration, and import it into your project as component.</span>


              <code className="py-2 rounded-md text-sm text-white">
          <span className="text-neutral-400 tex-xs sm:text-sm">Set these data as environment variables </span>
          <span className="text-neutral-400 tex-xs sm:text-sm">SMAD_API_PRIVATE_KEY</span>=your_api_key<br />
          <span className="text-neutral-400 tex-xs sm:text-sm">SMAD_PROJECT_ID</span>=your_project_id
            </code>


              <div className="flex md:flex-row flex-col gap-2 py-2">

          <button  onClick={()=>handleCopyCode()}
          className=" px-3  bg-neutral-800 text-sm hover:bg-neutral-900 transition-all ease duration-300
           text-neutral-300 rounded-md border flex gap-x-2 border-neutral-700 py-1  ">
           <span>Copy Form Code</span>


           { isCodeCopy ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

                      className="size-4 stroke-slate-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :  <svg
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
              </svg>}
           </button>


          <Link href="/template" className=" px-3  bg-neutral-800 text-sm hover:bg-neutral-900 transition-all
           ease duration-300  text-neutral-300 rounded-md border border-neutral-700 py-1  "><button className="">see All Templates</button></Link>
            </div>

            </div> */}
      {/* <section className="hidden part3 md:flex opacity-0 mt-4 border relative lv line  border-neutral-700 rounded-xl flex-col gap-y-1 w-full ">

        <div className="w-full  bg-neutral-700/50  overflow-auto">

          <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700/30 border-neutral-700">1</div>
              <span className="text-xs md:text-lg"> Begin by creating your account</span>
            </div>

            <Link href="/register" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10  hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>

        <div className="w-full  overflow-auto">

          <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">2</div>
              <span className="text-xs md:text-lg">  Copy your API private key on the /account page and set it as environment variables in your project </span>
            </div>

            <Link href="/account" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10  hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>


        <div className="w-full  overflow-auto">

          <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start  gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">3</div>
              <span className="text-xs md:text-lg"> Create a project in the dashboard </span>
            </div>

            <Link href="/dashboard" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10  hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>


        <div className="w-full  overflow-auto">

          <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start  gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">4</div>
              <span className="text-xs md:text-lg"> Copy the project ID through the horizontal three dots button modal and set it as environment variables in your projects </span>
            </div>

            <Link href="/dashboard" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10 hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>


        <div className="w-full  overflow-auto">

          <div className="w-full  pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start  gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">5</div>
              <span className="pr-8 text-xs md:text-lg "> Click the {"'Get Config'"} header button, choose your template form, and copy the code</span>
            </div>

            <Link href="/template" target='_blank' className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10 hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>


        <div className="w-full  overflow-auto">

          <div className="w-full   pl-4 pr-2 py-2 flex gap-x-4  justify-between items-center">

            <div className="flex justify-start    gap-x-4 items-center">
              <div className="size-8  rounded-full min-h-8 min-w-8 flex justify-center items-center border bg-neutral-700  border-neutral-700">6</div>
              <div className="flex">
                <span className="flex text-xs md:text-lg justify-start items-center gap-2"> Copy the code and set it in a file as a component and import it where you want  </span>
              </div>
            </div>
            <Link href="/template" className=" rounded-lg  border  border-neutral-700 flex justify-center items-center min-h-10 min-w-10 hover:bg-neutral-800 transition-all ease duration-400 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>

            </Link>



          </div>

        </div>

      </section> */}


      {/* <h2 className="text-lg md:text-xl part4 my-10 opacity-0 font-medium  text-neutral-400  uppercase text-left w-full   text-balance">

         Design available for implementation with tailwind

      </h2>

      <section className="flex w-full lg:border part5 opacity-0  rounded-xl relative md:flex-row flex-col gap-y-4 lg:line lg:overflow-hidden gap-4 justify-start items-start">
        <div className="flex w-full md:w-1/2     p-4  border border-neutral-700/30  bordergradient relative h-72 rounded-xl  overflow-hidden bg-neutral-700/30 ">

          <div className="bg-neutral-900/30 rounded-xl overflow-hidden  px-4 h-full  w-full">
        <Image src={formImage} className="object-contain w-full h-full" alt="form image"  />

          </div>


        </div>
        <div className="w-full md:w-1/2 flex gap-y-4 h-full flex-col md:px-0 py-8 px-4 justify-center  items-start">
          <p className="text-xl md:text-2xl text-balance">Get beautiful form 🌟 Components for begining </p>
          <span className="text-sm md:text-sm text-neutral-500 pr-4"> Save Time and Get to the Final Goal with Our Exclusive Newsletter!
            Sign up  to save time and reach your goals faster with exclusive tips and regular updates.
          </span>
          <div className="flex  my-4 gap-4">
            <Link href="/template" className="w-full"> <Button variant={"default"} className="rounded-full w-full px-8 bx-shabtn py-2"> See all design + code  </Button> </Link>
          </div>
        </div>

      </section> */}


      {/* <script type="text/javascript" src="https://templates.smadmail.com/js/iframeResizer.min.js"></script>
      <div className="flex justify-center items-center w-full mt-4">
      <iframe src="https://templates.smadmail.com/ui/form1.html?private_key=smad250208172113c78c8db84d&project_id=79b0b48a-fa25-4c24-a3d9-cb59e9b6f2a3"
       scrolling="no"  ></iframe>

 </div> */}

      {/* <link rel="stylesheet"  href="https://templates.smadmail.com/css/iframe.css"/>
        <iframe id="iframe_container" src="https://templates.smadmail.com/ui/form1.html?private_key=smad250208172113c78c8db84d&project_id=79b0b48a-fa25-4c24-a3d9-cb59e9b6f2a3"
        scrolling="no"  ></iframe> */}




    </main>
  );
}
