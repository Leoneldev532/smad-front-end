
import { projectItemMobileType } from '@/lib/type'
import { cn } from '@/lib/utils'
import React from 'react'

const ProjectItemMobile  = ({onClick,name,isActive}:{ onClick:()=>void,name:string,isActive?:boolean}) => {
    return ( 
        <button  onClick={onClick} className={cn("flex text-xs w-auto  flex-shrink-0 sm:text-sm justify-center items-center rounded-full border-neutral-500 px-3 py-2  ", isActive ? "bg-neutral-800 border-neutral-500":"bg-transparent")}>
           <span> {name} </span>
        </button>
    )
}

export default ProjectItemMobile
