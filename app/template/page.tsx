"use client"
import News1 from '@/public/news1.png'
import News2 from '@/public/news2.png'
import News3 from '@/public/news3.png'
import { selectOptionType } from '@/lib/type'
import React, { useState } from 'react'
import SelectOption from '@/components/selectOption'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import CodeHighlightWriter from '@/components/CodeSectionWritter'
import { logicEmailSubmition, logicImportString, TabTemplateCode } from './listTemplateCode'
import { toast } from 'sonner'
import { componentStructure } from './mainGenerateCodeFunc'
import FormRegisterEmail from '@/components/TestNewsLive2'

const Page = () => {



    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [codeSelected, setCodeSelected] = useState<string | null>(null);

    const handleOptionClick = (id: number) => {
        setSelectedId(id);
    };

    const [isTyping, setIsTyping] = useState(false)

    const handleTypingComplete = () => {
            setIsTyping(false)
    };


    const tabSelectionOption: selectOptionType[] = [
        {
            id: 1,
            image: News1,
            isSelected: false
        },
        {
            id: 2,
            image: News2,
            isSelected: false
        }
        ,
        {
            id: 3,
            image: News3,
            isSelected: false
        }
    ]


    


    const { data: session, status } = useSession();


    const [isStartedGeneration, setIsStartedGeneration] = useState(false)

    const pathname = usePathname();
    const router = useRouter()

    const handleGenerateConfig = () => {

        // if(!session){
        //     router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        // }else{
        if (!selectedId) {
            toast.error("select One model")
        } else {

            setIsStartedGeneration(true)
            setIsTyping(true)
            // setCodeSelected(TabTemplateCode?.find((code)=>code?.id === selectedId)?.code)
        }


        // }

    }

    const finalCode = componentStructure("formRegisterEmail", logicImportString, logicEmailSubmition, TabTemplateCode?.find((code: any) => code?.id === selectedId)?.code || " ")


    const [isCodeCopy, setIsCodeCopy] = useState(false)
    
    const handleCopyCode = () => {
      setIsCodeCopy(true)
      navigator.clipboard?.writeText(finalCode || " ")
      setTimeout(() => {
        setIsCodeCopy(false)
      }, 1000)
    }
  

    return (
        <main className="flex min-h-screen flex-col items-center justify-between md:p-24">

            <div className="flex w-full  flex-col px-8 md:px-0 relative   justify-start items-start">

                <h1 className="text-3xl md:text-5xl wb-gradient max-w-4xl py-5 text-balance">
                    Choose One Model template
                </h1>
                {/* <EmailRegisterForm/>
                <TestNewsLive2/> */}
                <div className="grid sm:grid-cols-2  gap-4 grid-cols-1 lg:grid-cols-3 z-10 bg-neutral-900 gap-x-4 mt-4 relative  xl:px-8 w-full ">

                    {tabSelectionOption?.map((option: selectOptionType,index:number) => (
                        <SelectOption key={index} image={option.image} id={option.id} isSelected={selectedId === option.id} onClick={() => { handleOptionClick(option.id || 0); setIsTyping(true) }} />
                    ))

                    }

                </div>


                <div className="line-v-tree h-full w-2 relative "> </div>
                <div className="line-v-tree-circle h-[175px] w-96 rounded-full md:block hidden  bg-neutral-900 border border-t-transparent z-0 border-neutral-600 top-[17%]  left-[20%]   absolute "> </div>

                <div className=" w-full flex justify-center py-8 items-center ">
                    <button onClick={() => handleGenerateConfig()} className={`px-4 py-2 bg-neutral-900 group line1  z-10 text-xs md:text-sm gap-x-4  border border-neutral-700 
                      hover:bg-neutral-600 relative overflow-hidden flex justify-center items-center rounded-lg
                       text-center `}>

                        {isTyping ? <div className="animate-spin h-5 w-5 border-2 
                          border-b-transparent border-r-transparent border-white rounded-full"></div>

                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"size-4 group-hover:fill-white"}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>}

                        <span>   Generate config  </span>

                    </button>
                </div>

                <div className="w-full  flex justify-end z-10 items-center flex-col">
                    <div className="flex flex-col w-[90%]  md:max-w-xl relative  w-full border-2 border-neutral-400/30 border-dashed  bg-neutral-900 h-96 overflow-auto justify-start items-center rounded-lg">
                        {selectedId &&
                            <CodeHighlightWriter
                                onTypingComplete={handleTypingComplete}
                                key={selectedId + "kkkk"}
                                code={finalCode}
                            />

                        }
                        {selectedId && !isTyping &&
                        <div className="absolute top-0 left-[87%] mt-4 ">
                        {isCodeCopy ?

<button onClick={() => handleCopyCode()} className="p-2 flex justify-center  border items-center rounded-md ">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

    className="size-4 stroke-slate-300">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
</button>

:
<button onClick={() => handleCopyCode()} className="p-2 flex justify-center border-slate-500/60 border items-center rounded-md ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4 stroke-slate-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
    />
  </svg>
</button>
}

                         </div>    
                             }
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Page



