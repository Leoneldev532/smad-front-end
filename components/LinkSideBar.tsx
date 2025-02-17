

    import Link from 'next/link'
import React, { ReactNode } from 'react'
    
    export type LinkSideBarPropsType = {
        icon:ReactNode,
        title:string,
        link?:string,
        type?:"link" | "button",
        onClick?:()=>void
    }
    const LinkSideBar = ({LinkSideBarProps}:{LinkSideBarProps:LinkSideBarPropsType}) => {
      return (
        <>
        {
            LinkSideBarProps.type === "link" ? 
            <Link href={LinkSideBarProps?.link || " "} onClick={LinkSideBarProps?.onClick}
             className="flex justify-start items-center px-3 py-2 hover:bg-neutral-700/30   text-sm  gap-x-2  ">
            {LinkSideBarProps?.icon && LinkSideBarProps?.icon }
            <span> {LinkSideBarProps?.title} </span>
            </Link>
            :
            <button onClick={LinkSideBarProps?.onClick} 
            className="flex justify-start items-center px-3 py-2 hover:bg-neutral-700/30   text-sm  gap-x-2  ">
            {LinkSideBarProps?.icon && LinkSideBarProps?.icon }
            <span> {LinkSideBarProps?.title} </span>

            </button>
        }
        
        </>
      )
    }
    
    export default LinkSideBar
    