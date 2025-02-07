
"use client"
import Loader from '@/components/Loader'
import { setSubscriptionTrial, useAllUserTrialplan, useGetAllUserInfo, useGetPricingProducts } from '@/hook/query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { prisma } from "@/lib/db"
import { useSession } from "next-auth/react";
import { checkCurrentPlan, isDatePassed, useGetUserInfo } from "@/lib/utils"
import { useRouter, usePathname } from 'next/navigation';
import dayjs from 'dayjs'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/lib/atom'



const Page = () => {


    const { data: allProducts, isLoading: allProductsIsLoading } = useGetPricingProducts()
    const queryClient = useQueryClient()
    const allProductsFilter = () => {
        if (!allProducts) return;
        if (getAllUserInfo?.trial_is_finished) {
            return allProducts.data?.data.filter((elem: any) => elem.attributes.name !== "free trial")
        } else {
            return allProducts.data?.data
        }
    }

    const { data: session, status } = useSession() as any;
    const user = useRecoilValue(userInfoState);
    const router = useRouter();
    const pathname = usePathname();



    const { data: getAllUserInfo, isLoading: getAllUserInfoIsLoading } = useGetAllUserInfo(user?.id)
    const [trialHide, setTrialHide] = useState(false)



    const buyIfConnect = (producturlCheckOut: string, userId: string) => {

        if (!session) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        } else {
            router.push(`${producturlCheckOut}?checkout[custom][user_id]=${userId}`);
        }

    }



    const mutationSubscriptionTrial = useMutation({
        mutationFn: () => setSubscriptionTrial(user?.id || " "),
        onSuccess: () => {
            toast.success("subscription ok")
            queryClient.invalidateQueries({ queryKey: ['userInfos'] })
            router.push("/dashboard")

        },
        onError: (error) => {

            toast.error("Une erreur est survenue" + error)
        }

    });


    const subscribeTrialPlan = async (userId: string) => {

        if (!session) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        } else {

            try {

                mutationSubscriptionTrial.mutate()


            } catch (error) {
                console.log("An error occur" + error)
            }

        }
    }





    return (
        <div className='flex flex-col justify-center h-auto items-start w-full '>
            <div className="flex flex-col gap-y-3 py-8  w-full justify-center items-center">
                <h2 className="text-3xl md:text-5xl font-extrabold ">Pricing</h2>
                <span className="text-sm md:text-xl max-w-xs md:max-w-sm text-center opacity-70 text-balance">Take care of the business aspect now, and stop wasting time.</span>
            </div>

            {allProductsIsLoading && <div className="flex min-h-72 justify-center items-center w-full ">
                {allProductsIsLoading && <Loader />}
            </div>}

            <div className={`justify-center px-10 md:px-8  py-4 gap-8 
               flex 
             items-center   w-full
                 `}>


                {!allProductsIsLoading && allProductsFilter().map((product: any, index: number) => {


                    return (

                        <div key={index} style={{ opacity: (product?.attributes.name === "free Trial" && getAllUserInfo?.trial_is_finished) ? "0.6" : "1" }}
                            className="flex flex-col max-w-sm  w-full border border-neutral-400/20  rounded-2xl py-8  bg-neutral-800 justify-start p-4"
                        // style={{opacity:isDisabled ? "0.6" : "1" , pointerEvents:isDisabled ? "none":"auto"}}
                        >

                            <div className="flex justify-between w-full items-center">
                                <h4 className="text-2xl font-bold py-4"> {product?.attributes.name}  </h4>
                                <h3 className="">
                                    <span className='opacity-70 text-3xl '>$ </span>
                                    <span className="text-3xl">
                                        {product?.attributes.price_formatted?.slice(1, product?.attributes.price_formatted.length).split("/")[0]}
                                    </span>
                                </h3>
                            </div>

                            <div className='flex flex-col justify-start items-center'>
                                <div className='flex gap-x-3 justify-start w-full items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span dangerouslySetInnerHTML={{ __html: product?.attributes?.description || '' }} />
                                </div>
                            </div>

                            <div className="flex gap-2 justify-start py-6 text-neutral-400 text-sm items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8 stroke-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span className='max-w-36 text-balance text-left'>
                                    enjoy and stay focus on business side
                                </span>

                            </div>

                            <button disabled={(product?.attributes.name === "free Trial" && getAllUserInfo?.trial_is_finished)}

                                onClick={() => product?.attributes.name === "free Trial" ? subscribeTrialPlan(user?.id || " ") :
                                    buyIfConnect(product?.attributes?.buy_now_url, user?.id || " ")}
                                className="py-2 text-neutral-600 w-full hover:bg-black hover:text-white text-sm 
                                 lg:text-lg  transition-all ease duration-400 flex justify-center items-centers gap-3 bg-white/80 px-3 lg:px-8 rounded-full">
                                {product?.attributes.name === "free Trial" && mutationSubscriptionTrial.isPending && <Loader />}
                                <span className="h-full flex justify-center items-center ">Get Started now</span>

                            </button>

                        </div>
                    )

                })}


                {/*                
                <div className="flex flex-col  w-full border border-neutral-400/20  rounded-2xl py-8  bg-neutral-800 justify-start p-4">

                    <div className="flex justify-between w-full items-center">
                        <h4 className="text-4xl font-bold py-4"> Free  </h4>
                        <h3 className=""><span className="text-4xl">0</span>  <span className='opacity-70 text-3xl '>$ </span> </h3>
                    </div>

                    <div className='flex flex-col justify-start items-center'>
                        <div className='flex gap-x-3 justify-start w-full items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span> All free for 14days  </span>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-start py-6 text-neutral-400 text-sm items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8 stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className='max-w-36 text-balance text-left'>
                            enjoy free services for test
                        </span>

                    </div>

                    <Link href="/" className='w-full '>
                        <button className="py-2 text-neutral-600 w-full hover:bg-black hover:text-white text-sm 
                         lg:text-lg  transition-all ease duration-400  bg-white/80 px-3 lg:px-8 rounded-full"> Get Started now </button>
                    </Link>

                </div>

                <div className="flex flex-col  w-full border relative border-neutral-400/20  rounded-2xl py-8  bg-neutral-800 justify-start p-4">

                    <div className="px-4 py-2 rounded-full absolute -top-5 left-[35%] bg-green-700 overflow-hidden max-w-36 text-center"> <span> Mounthly</span>  </div>

                    <div className="flex justify-between w-full items-center">
                        <h4 className=" text-2xl lg:text-4xl font-bold py-4"> Per Mounth </h4>
                        <h3 className=""><span className="text-4xl">5</span>  <span className='opacity-70 text-3xl '>$ </span> </h3>
                    </div>

                    <div className='flex flex-col justify-start items-center'>
                        <div className='flex gap-x-3 justify-start w-full items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span> All allows    </span>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-start py-6 text-neutral-400 text-sm items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8 stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className='max-w-36 text-balance text-left'>
                            enjoy free services for test
                        </span>

                    </div>

                    <Link href="/" className='w-full '>
                        <button className="py-2 text-neutral-600 w-full hover:bg-black hover:text-white text-sm  lg:text-lg  transition-all ease duration-400  bg-white px-3 lg:px-8 rounded-full"> Get Started now </button>
                    </Link>

                </div>


                <div className="flex flex-col  w-full border relative border-neutral-400/20  rounded-2xl py-8  bg-neutral-800 justify-start p-4">

                    <div className="px-4 py-2 rounded-full absolute -top-5 left-[35%] bg-green-700 overflow-hidden max-w-36 text-center"> <span>Annually</span>  </div>

                    <div className="flex justify-between w-full items-center">
                        <h4 className=" text-2xl lg:text-4xl font-bold py-4">Per Year <span className="text-lg text-green-500"> -10<span className='opacity-70 text-xl '>%</span></span> </h4>
                        <h3 className=""><span className="text-4xl">5</span>  <span className='opacity-70 text-3xl '>$ </span> </h3>
                    </div>

                    <div className='flex flex-col justify-start items-center'>
                        <div className='flex gap-x-3 justify-start w-full items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span> All allows    </span>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-start py-6 text-neutral-400 text-sm items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-8 stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className='max-w-36 text-balance text-left'>
                        Best plan : <span className="text-green-400">Recommended</span>
                        </span>

                    </div>

                    <Link href="/" className='w-full '>
                        <button className="py-2  w-full hover:bg-green-800 text-white  hover:text-white text-sm  lg:text-lg  transition-all ease duration-400  bg-green-500 px-3 lg:px-8 rounded-full"> Get Started now </button>
                    </Link>

                </div> */}

            </div>

        </div>
    )
}

export default Page
