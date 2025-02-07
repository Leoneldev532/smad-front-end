"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "@/public/logo.png"
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import ButtonValidation from '@/components/ButtonValidation'
import { SubmitHandler, useForm } from "react-hook-form"
import { emailRegex, useGetUserInfo } from '@/lib/utils'
import { toast } from 'sonner'
import Link from 'next/link'
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  type registerDataInput = {
    password:string,
    email:string
  }
 
  const {
    register: registerLogin,
    handleSubmit: handleOnSubmitLogin,
    control,
    watch,
    formState: { errors: errorsLogin },
  } = useForm<registerDataInput>();


  const router = useRouter() ;
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

const onSubmitRegisterForm1: SubmitHandler<registerDataInput> = async (data, e) => {
  e?.preventDefault

  // try {
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (!res?.error) {
      if (redirect) {
        router.push(`${redirect}`)
      } else {
        router.push(`/dashboard`)
      }
    } else {
      setFormValues({ email: "", password: "" });
      setError("invalid email or password");
      setLoading(false);
      toast.error("An error occurred");
    }
 
};

  const {user} = useGetUserInfo()

useEffect(()=>{

  if(user){
    router.push("/dashboard")
  }
},[user])

  return (
    <div className="flex gap-x-3 w-full h-full justify-center min-h-screen  items-start py-8">

      <div className="px-8 py-10  min-w-96 rounded-2xl  relative overflow-hidden    flex flex-col gap-y-4 justify-center items-center">
        <form onSubmit={handleOnSubmitLogin(onSubmitRegisterForm1)} className="w-full  relative  max-w-xs  h-full flex flex-col gap-4 justify-start items-center">
          <Image alt='logo' src={logo} className="object-contain h-16 w-16" />
          <div className="flex flex-col gap-y-2 w-full justify-center items-center">
          <h2 className="font-bold m-0 text-2xl">Welcome back</h2>
          <span className='max-w-lg text-center text-sm  text-neutral-500 '>
          Sign in to your account
          </span>
          </div>
          <input
            {...registerLogin("email", {
              required: true,
              pattern: emailRegex,
            })}
            type="email" name="email" placeholder="Email" 
            className={"px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full"} 
            />
          {errorsLogin.email && errorsLogin.email.type === "required" && (
            <span className="text-sm text-red-500 text-center">
              please fill this field
            </span>
          )}
          {errorsLogin.email && errorsLogin.email.type === "pattern" && (
            <span className="text-sm text-red-500 text-center">
              Veuillez remplir une email correcte
            </span>
          )}
          <input   {...registerLogin("password", {
            required: true
          })} type="password" placeholder="password" className={"px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full"} />
          {errorsLogin.password &&
            errorsLogin.password.type === "required" && (
              <span className="text-sm text-red-500 text-center">
                please fill this field
              </span>
            )}
          {errorsLogin.email && errorsLogin.email.type === "pattern" && (
            <span className="text-sm text-red-500 text-center">
              {"Veuillez remplir un mot de passe contenant une manjuscule une minuscule un symbole parmi @,$,!,%,* et un chiffre"}
            </span>
          )}
          <ButtonValidation className=" py-2    cursor-pointer  w-full  rounded-lg"
            isLoading={loading} type='positive' typeButton='submit' title='Sign In' />
          {/* <input type="submit"   disabled={loading}  value="Login"   /> */}

        </form>
        <Button
          onClick={() => signIn("google", {   callbackUrl: "/dashboard" })} variant="outline" className=" bx-sha1 py-5   border hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
        <div><span className="text-neutral-500">Don&apos;t have an account? </span><Link className="underline" href="/register">Sign up</Link></div>
      </div>


    </div>
  )
}

export default Page