"use client";


import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import logo from "@/public/logo.png"
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import ButtonValidation from '@/components/ButtonValidation'
import { SubmitHandler, useForm } from "react-hook-form"
import { emailRegex, passwordRegex } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';

export default function  RegisterForm (){
  const [loading, setLoading] = useState(false);
 
  const [error, setError] = useState("");

  const {
    register: register,
    handleSubmit: handleOnSubmitLogin,
    control,
    watch,
    reset,
    formState: { errors: errorsRegister },
  } = useForm<any>();

  type registerDataInput = {
    name:string,
    password:string,
    email:string
  }

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (formData:registerDataInput) => {
        const res = await axios.post("/api/register", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (res.status !== 200) {
          throw new Error(res.data.message);
        }
  
        return res.data;
      },
    onSuccess: () => {
        toast.success("Registration successful !!!")
        router.push("/login")
      reset();
    },
    onError: (error) => {
        toast.error("An Error occur" + error)
    }
  
  });

  const onSubmitRegisterForm1: SubmitHandler<registerDataInput> = async (data, e) => {
    e?.preventDefault();
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };
 

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <div className="flex gap-x-3 w-full py-8 h-full justify-center min-h-screen  items-start">

      <div className="px-8  min-w-96 rounded-2xl  relative overflow-hidden  flex flex-col gap-y-4 justify-center items-center">
        <form onSubmit={handleOnSubmitLogin(onSubmitRegisterForm1)} className="w-full   h-full flex flex-col gap-4 justify-start items-center">
          <Image alt='logo' src={logo} className="object-contain h-16 w-16" />

          <div className="flex flex-col gap-y-2 w-full justify-center items-center">
          <h2 className="font-bold m-0 text-2xl">Get started</h2>
          <span className='max-w-lg text-center text-sm  text-neutral-500 '>
          Create a new account
          </span>
          </div>

         
  <input
            {...register("name", {
              required: true,
              minLength:3
            })}
            type="text" name="name" placeholder="name" 
            className={"px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full"}  />
          {errorsRegister.name && errorsRegister.name.type === "required" && (
            <span className="text-sm text-red-500 text-center">
              please fill this field
            </span>
          )}
           {errorsRegister.name && errorsRegister.name.type === "minLength" && (
            <span className="text-sm text-red-500 text-center">
             name must be at least 3 characters long
            </span>
          )}

          <input
            {...register("email", {
              required: true,
              pattern: emailRegex,
            })}
            type="email" name="email" placeholder="Email" 
            className={"px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full"}  />
          {errorsRegister.email && errorsRegister.email.type === "required" && (
            <span className="text-sm text-red-500 text-center">
              please fill this field
            </span>
          )}
          {errorsRegister.email && errorsRegister.email.type === "pattern" && (
            <span className="text-sm text-red-500 text-center">
              Veuillez remplir une email correcte
            </span>
          )}
          <input   {...register("password", {
            required: true,
            pattern:passwordRegex
          })} type="password" placeholder="password" 
            className={"px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full"}  />
          {errorsRegister.password &&
            errorsRegister.password.type === "required" && (
              <span className="text-sm text-red-500 text-center">
                please fill this field
              </span>
            )}
          {errorsRegister.email && errorsRegister.email.type === "pattern" && (
            <span className="text-sm w-full max-w-sm text-balance text-red-500 text-center">
              Veuillez remplir un mot de passe contenant une manjuscule une minuscule un symbole parmi @,$,!,%,* et un chiffre
            </span>
          )}
          <ButtonValidation className=" py-2    cursor-pointer  w-full  rounded-lg"
            isLoading={mutation?.isPending} type='positive' typeButton='submit' title='register' />
          {/* <input type="submit"   disabled={loading}  value="Login"   /> */}

        </form>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })} 
          variant="outline" className=" bx-sha1 py-5   border hover:bg-neutral-900 cursor-pointer border-neutral-400/10 w-full  rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          register with Google
        </Button>
        
        <div><span className="text-neutral-500"> you already have an account</span> <Link className="underline" href="/register">Sign In</Link></div>
      </div>


    </div>
  );
};
