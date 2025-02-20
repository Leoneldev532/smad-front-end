
"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import  image1 from "@/public/list mail.png"
import  formImage from "@/public/Form34.png"
import gsap from  "gsap"

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:px-8 px-8 py-4  ">

      <section className="flex part1  opacity-0 flex-col-reverse md:flex-row  w-full pt-10  md:pb-14  relative   justify-start items-center">
       
        <div className="w-full md:w-8/12">
        <h1 className="md:text-5xl text-3xl bg-red-400 flex lg:text-4xl text-balance  w-full wb-gradient  ">

        Effortlessly create newsletter forms and focus on growing your business.

        </h1>
        <div className="w-full flex justify-start gap-x-4 items-center py-8 ">
          <Link href="/login"><Button variant="default" className="rounded-full px-16 font-bold bx-shabtn py-2"> start now  </Button></Link>

        </div>
        </div>
        <div className="w-full md:w-1/2 px-8  md:px-10 flex justify-center items-center">
        <Image  src={image1} className="object-contain " alt="hero section image" />
        </div>
       
      </section>
      

      <section className="w-full part2 opacity-0 flex justify-between items-center">
        <h2 className="opacity-80 w-full text-left uppercase ">How it works?</h2>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>

      </section>

      <div className="md:hidden w-full flex flex-col mt-3 gap-y-4">

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

  <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

  <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

  <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

        

      </div>

      <section className="hidden part3 md:flex opacity-0 mt-4 border relative lv line overflow-hidden border-neutral-700 rounded-xl flex-col gap-y-1 w-full ">
        
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

            <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

            <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

            <div className="flex justify-s bg-neutral-700t art gap-x-4 items-center">
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

      </section>
    

      <h2 className="text-lg md:text-xl part4 my-10 opacity-0 font-medium  text-neutral-400  uppercase text-left w-full   text-balance">

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

      </section>





    </main>
  );
}
