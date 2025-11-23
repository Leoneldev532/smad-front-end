"use client";
import signUpImage from "@/public/signUp.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/utils";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex gap-x-3 w-full py-8 h-full justify-center min-h-screen  items-start">
      <div className="px-8 py-8  gap-x-8 rounded-2xl   relative overflow-hidden  w-full  flex md:flex-row flex-col  justify-center items-center">
        <Image
          src={signUpImage}
          className="object-contain  my-3 md:my-0 w-60 "
          alt="hero section image"
        />

        <div className=" w-[0.8px] linev h-72 md:block hidden relative overflow-hidden">
          {" "}
        </div>

        <div className="w-full  relative  max-w-xs  my-3 h-full flex flex-col gap-4 justify-start items-center">
          <div className="flex flex-col gap-y-1 w-full justify-center items-center">
            <h2 className="font-bold m-0 text-2xl">Get started</h2>
            <span className="max-w-lg text-center text-sm  text-neutral-500 ">
              Create a new account
            </span>
          </div>
          <Button
            onClick={() => handleGoogleLogin()}
            variant="outline"
            className=" bx-sha1 py-5   border bg-zinc-800 hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            register with Google
          </Button>

          <Button
            onClick={() => handleGithubLogin()}
            variant="outline"
            className=" bx-sha1 py-5   border hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <path
                fill="currentColor"
                width="2em"
                height="2em"
                fillRule="evenodd"
                d="M12.006 2a9.85 9.85 0 0 0-6.484 2.44a10.32 10.32 0 0 0-3.393 6.17a10.48 10.48 0 0 0 1.317 6.955a10.05 10.05 0 0 0 5.4 4.418c.504.095.683-.223.683-.494c0-.245-.01-1.052-.014-1.908c-2.78.62-3.366-1.21-3.366-1.21a2.7 2.7 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621c.317.044.62.163.885.346c.266.183.487.426.647.71c.135.253.318.476.538.655a2.08 2.08 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37c-2.219-.259-4.554-1.138-4.554-5.07a4.02 4.02 0 0 1 1.031-2.75a3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05c.37.858.406 1.828.101 2.713a4.02 4.02 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.47 2.47 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814c0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421a10.47 10.47 0 0 0 1.313-6.948a10.32 10.32 0 0 0-3.39-6.165A9.85 9.85 0 0 0 12.007 2Z"
                clipRule="evenodd"
              ></path>
            </svg>
            register with Github
          </Button>

          <div>
            <span className="text-neutral-500">
              {" "}
              you already have an account
            </span>{" "}
            <Link className="underline" href="/login">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
