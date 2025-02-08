

"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from "@/public/logo.png"
import { Separator } from './ui/separator'
import LinkSideBar, { LinkSideBarPropsType } from './LinkSideBar'
import { cn, useGetUserInfo } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Loader from './Loader'
const Header = () => {

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const { user, status } = useGetUserInfo()

    const LinkTab: LinkSideBarPropsType[] = [
        {
            title: "account & billing",
            link: "/account",
            onClick: () => handleHideDropDown(),
            type: "link",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

        },
        {
            title: "dashboard",
            link: "/dashboard",
            onClick: () => handleHideDropDown(),
            type: "link",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>


        },
        // {
        //     title: "pricing",
        //     link: "/pricing",
        //     onClick: () => handleHideDropDown(),
        //     type: "link",
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        //     </svg>



        // },
        {
            type: "button",
            title: "Sign-out",
            onClick: () => { signOut({ callbackUrl: "/login" }) },
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
            </svg>
        }

    ]

    const handleShowDropDown = () => {
        setDropdownIsOpen(true)
    }

    const handleHideDropDown = () => {
        setDropdownIsOpen(false)
    }

    const toggleShowDropDown = () => {
        if (dropdownIsOpen) {
            handleHideDropDown()
        } else {
            handleShowDropDown()
        }
    }

    return (
        <div className="flex justify-between items-center  md:px-0 px-6  pb-4 w-full min-h-8">

            <Link href="/" className='w-[200px] md:w-1/2 outline-none' tabIndex={-1}>
                <div className="flex text-md w-1/2   md:w-1/2 overflow-hidden gap-x-2 justify-start items-center h-full ">
                    <Image src={logo} className="object-contain h-8 w-8" alt="logo" />
                    <span> Smad </span>
                </div>
            </Link>

            <div className="flex gap-x-2 justify-end items-center  w-1/2   md:w-8/12">
                <Link href="/template" className="hidden md:block">

                    <button className="px-4 py-1 group  text-xs md:text-sm gap-x-4  border border-neutral-700 line1  hover:bg-neutral-600 relative overflow-hidden flex justify-center items-center rounded-lg text-center">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 group-hover:fill-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>

                        <span>   Generate config  </span>

                    </button>  </Link>

                {status === "loading" ? <div className="flex gap-x-2 md:gap-x-4  justify-end items-center ">  <Loader /> </div> :
                    status !== "unauthenticated" && user ?
                        <div className='flex rounded-4xl gap-x-2 relative   justify-center items-center  '>




                            <div className="bg-white h-8 w-8  rounded-full overflow-hidden flex justify-center items-center">
                                <Image alt={"avatar"} width="300" height="500" className="object-contain" 
                                src={`https://api.dicebear.com/9.x/lorelei/png?seed=${user?.name}`} />
                            </div>
                            <button onClick={() => toggleShowDropDown()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className={cn("size-4 transition-transform ease duration-300 ", dropdownIsOpen && "rotate-45", dropdownIsOpen && "-rotate-90",)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            
                            {dropdownIsOpen &&
                                <div className="absolute z-50 w-48 lg:w-56 top-12 left-1/2 transform -translate-x-1/2 max-[1400px]:-translate-x-[160px]   max-h-[90vh] overflow-y-auto rounded-xl bg-muted flex flex-col justify-start items-start p-4">
                                <h3 className="text-sm px-3 py-2">Menu</h3>
                                <Separator className="bg-neutral-700" />
                                <div className="w-full flex flex-col gap-y-2">
                                    {LinkTab?.map((link, index) => (
                                        <React.Fragment key={index}>
                                            <LinkSideBar LinkSideBarProps={link} />
                                            <Separator className="bg-neutral-700" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            }


                        </div> :

                        <div className="flex gap-x-2 md:gap-x-4 w-auto justify-end items-center ">
                            <Link href="/login"> <button className="px-4 py-1 text-xs md:text-sm   border border-neutral-700 line relative overflow-hidden rounded-lg text-center"> Sign-in </button>  </Link>
                            <Link href="/register"> <button className="px-4 py-1 text-xs md:text-sm border rounded-lg text-center"> Register </button>  </Link>
                        </div>


                }
            </div>
        </div>
    )
}

export default Header
