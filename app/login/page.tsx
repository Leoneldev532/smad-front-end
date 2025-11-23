"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import loginImage from "@/public/login.png";
import {
  handleGithubLogin,
  handleGoogleLogin,
  useGetUserInfo,
} from "@/lib/utils";
import Link from "next/link";
const Page = () => {
  const router = useRouter();

  const { user } = useGetUserInfo();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex gap-x-3 w-full h-full justify-center min-h-screen  items-start py-8">
      <div className="px-8 py-8  gap-x-8 rounded-2xl   relative overflow-hidden  w-full  flex md:flex-row flex-col  justify-center items-center">
        <Image
          src={loginImage}
          className="object-contain  my-3 md:my-0 w-60 "
          alt="hero section image"
        />

        <div className=" w-[0.8px] linev h-72 md:block hidden relative overflow-hidden">
          {" "}
        </div>

        <div className="w-full  relative  max-w-xs  my-3 h-full flex flex-col gap-4 justify-start items-center">
          <div className="flex flex-col gap-y-1 w-full justify-center items-center">
            <h2 className="font-bold m-0 text-2xl">Welcome back</h2>
            <span className="max-w-lg text-center text-sm  text-neutral-500 ">
              Sign in to your account
            </span>
          </div>

          <Button
            onClick={() => handleGoogleLogin()}
            variant="outline"
            className=" bx-sha1 py-5   border bg-zinc-800  hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

          <Button
            onClick={() => handleGithubLogin()}
            variant="outline"
            className=" bx-sha1 py-5   border hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg"
          >
            <svg
              viewBox="0 0 20 20"
              height={30}
              width={30}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>github [#142]</title> <desc>Created with Sketch.</desc>
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-140.000000, -7559.000000)"
                    fill="#ffffff"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                        id="github-[#142]"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </g>
            </svg>
            Login with Github
          </Button>

          <div>
            <span className="text-neutral-500">
              Don&apos;t have an account?{" "}
            </span>
            <Link className="underline" href="/register">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
