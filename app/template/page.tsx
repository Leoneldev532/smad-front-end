"use client"
import { templateCardType } from '@/lib/type'
import React from 'react'
import FormRegisterEmail1 from '@/components/FormRegisterEmail1'
import FormRegisterEmail2 from '@/components/FormRegisterEmail2'
import FormRegisterEmail3 from '@/components/FormRegisterEmail3'
import TemplateCard from '@/components/TemplateCard'

const Page = () => {



  


    const tabTemplateCode: templateCardType[] = [
        {
            id: 0,
            name:"form 1",
            form:<FormRegisterEmail1  key={1} />
        },
        {
            id: 1,
            name:"form 2",
            form:<FormRegisterEmail2  key={2} />
        }
        ,
        {
            id: 2,
            name:"form 3",
            form:<FormRegisterEmail3  key={3} />
        }
    ]


    return (
        <main className="flex min-h-screen flex-col w-full py-5 items-start justify-between ">
            <div className="flex w-full  flex-col px-8  lg:px-0 relative   justify-start items-start">

                <h1 className="text-3xl md:text-2xl wb-gradient  py-5 text-balance">
                    Copy code of template you want {"😊"}
                </h1>
                <p className='text-neutral-400 text-md max-w-2xl mb-2 '>

                    These forms are build with : React js / Next js , tailiwind css , typescript , axios,
                
                    you maybe need to install some dependencies to make it work properly.
                    
                    you can also use it as a base to build your own form. 

                </p>
                <div className="grid sm:grid-cols-2  gap-4 grid-cols-1 lg:grid-cols-3 z-10 bg-neutral-900 gap-x-4 mt-4 relative  w-full ">

                    {tabTemplateCode?.map((option: templateCardType,index:number) => (
                        <TemplateCard key={index}  id={option.id} name={option.name}  form={option?.form}   />
                    ))

                    }

                </div>




            </div>
        </main>
    )
}

export default Page



