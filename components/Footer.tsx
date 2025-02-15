


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import leoy from "@/public/leoy.png"

const Footer = () => {
        return (
                <div className="flex justify-start  px-8 items-center w-full h-full">
                <div className='flex w-full border-t  pt-3  border-neutral-600/40 justify-between items-center'>

                        <Link className='flex gap-x-1 md:gap-x-3  md:text-sm text-xs justify-center items-center text-neutral-400' href="https://leonelyimga.com">
                                <div className="bg-orange-400 w-8 md:h-10 h-8 md:w-10 rounded-full">
                                        <Image alt="leonel Yimga" src={leoy} className="object-contain" />
                                </div>
                                <span className=''>By Leonel Yimga </span>
                        </Link>

                        <div className='text-xs md:text-sm'>
                                <span> Contact Support  </span>
                                <Link className="underline" href="mailto:leonelyimga@gmail.com">
                                        here
                                </Link>
                        </div>

                </div>
                </div>
        )
}

export default Footer
