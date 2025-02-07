

"use client"

import Loader from "@/components/Loader"
import ProjectTabItem from "@/components/ProjectTabItem"
import TableData from "@/components/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { addEmailAddress, createProject, useGetAllEmailsOneProject, useGetAllProjectsOfOneUser, useGetAllUserInfo } from "@/hook/query"
import { Email, Project } from "@/lib/type"
import  { isDatePassed, useGetUserInfo}  from "@/lib/utils"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query" 
import { toast } from "sonner"
import ButtonValidation from "@/components/ButtonValidation"
import NoData from "@/components/NoData"
import Message from "@/components/Message"
import Link from "next/link"
import dayjs from "dayjs"
import ProjectItemMobile from "@/components/ui/ProjectItemMobile"
import { useRecoilValue } from "recoil"
import {  userInfoState } from "@/lib/atom"
export default   function Page() {

  const user = useRecoilValue(userInfoState);

  const [idProjectActive,setIdProjectActive] = useState<string>("")
  const [nameProjectActive,setNameProjectActive] = useState<string>(" ")

  const {data:getAllUserInfo,isLoading:getAllUserInfoIsLoading} = useGetAllUserInfo(user?.id)


  const {data:allProjectsOneUser,isLoading:allProjectsOneUserLoading,isError:allProjectsOneUserError,refetch:allProjectsOneUserRefetch}  = 
  useGetAllProjectsOfOneUser(user?.id)

  const {data:allEmailsOneProject,isLoading:allEmailsOneProjectLoading,isError:allEmailsOneProjectError,refetch:allEmailsOneProjectRefetch} =
   useGetAllEmailsOneProject(user?.id,idProjectActive )





  useEffect(()=>{
    if(allProjectsOneUser){ 
    setIdProjectActive(allProjectsOneUser[0]?.id)
    setNameProjectActive(allProjectsOneUser[0]?.name)
    setCurrentIdProject(allProjectsOneUser[0]?.id)
  }
  },[allProjectsOneUser,allProjectsOneUserRefetch])
  
  const  handlShowEmailsOneProject = (id:string,name:string) =>{
    setIdProjectActive(id)
    setNameProjectActive(name)
    setCurrentIdProject(id)
    allEmailsOneProjectRefetch()
  }




  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentIdProject,setCurrentIdProject]= useState<string>("")
  const handleTabClick = (index:number,idProject:string,nameProject:string) => {
    setActiveTabIndex(index);
    setCurrentIdProject(idProject)
    handlShowEmailsOneProject(idProject,nameProject)
  };

  const [filterTabEmails,setFilterTabEmails] = useState<Email[]|[]|undefined>([])
  const [filterTabProjects,setFilterTabProjects] = useState<Project[]|[]|undefined>([])

   const handleSearchEmails = (e:ChangeEvent<HTMLInputElement>) =>{

    const searchWord = e.target.value 

    const result = allEmailsOneProject?.filter((email)=>email.email.toLowerCase().includes(searchWord.toLowerCase()))

    if(searchWord.length === 0){
    setFilterTabEmails(allEmailsOneProject)
    }

    if(!result) return ;

    if( result?.length === 0){
    setFilterTabEmails([])
    }

    if(result?.length > 0){
      setFilterTabEmails(result)
   }
   }

   const handleSearchProject = (e:ChangeEvent<HTMLInputElement>) =>{
    
    const searchWord = e.target.value 

    const result = allProjectsOneUser?.filter((project)=>project.name.toLowerCase().includes(searchWord.toLowerCase()))

    if(searchWord.length === 0){
      setFilterTabProjects(allProjectsOneUser)
    }

    if(!result) return ;

    if( result?.length === 0){
      setFilterTabProjects([])
    }

    if(result?.length > 0){
      setFilterTabProjects(result)
   }
   }

  useEffect(()=>{
    setFilterTabEmails(allEmailsOneProject)
  },[allEmailsOneProject])

  useEffect(()=>{
    setFilterTabProjects(allProjectsOneUser)
  },[allProjectsOneUser])

  const [isOpenCreateProject,setIsOpenCreateProject] = useState<boolean>(false)
  const [isOpenAddEmailDialog,setIsOpenAddEmailDialog] = useState<boolean>(false)
  const [projectName,setProjectName] = useState<string>("")

   const handleShowDialogAddEmail = ()=>{
    
    if(getAllUserInfo?.privateKey?.expiresAt && !isDatePassed(dayjs(getAllUserInfo?.privateKey?.expiresAt)) ){
    setIsOpenAddEmailDialog(true)
    }else{
      toast.error("Please subscription a new plan")
    }
   }
   const handleCloseDialogAddEmail = ()=>{
    setIsOpenAddEmailDialog(false)
   }

  
  const handleShowDialogCreateProject = () =>{
    if(getAllUserInfo?.privateKey?.expiresAt && !isDatePassed(dayjs(getAllUserInfo?.privateKey?.expiresAt))){
    setIsOpenCreateProject(true)
    }else{
      toast.error("Please subscription a new plan")
    }
  }
  const handleCloseDialogCreateProject = () =>{
    setIsOpenCreateProject(false)
  }


  const handleSetProjectName = (e:ChangeEvent<HTMLInputElement>)=>{
    setProjectName(e.target.value)
  }




  const mutationAddProject = useMutation({
    mutationFn: () => createProject(user?.id || " ",projectName), 
    onSuccess: () => {
      toast.success("operation d'ajout reuissie")
      setIsOpenCreateProject(false)
      allProjectsOneUserRefetch()
      setProjectName("")
    },
    onError:(error)=>{
      
      toast.error("Une erreur est survenue" + error)
    }
    
  });


  const mutationAddEmailAdress = useMutation({
    mutationFn: () => addEmailAddress(user?.id  || " ",idProjectActive,emailAddress), 
    onSuccess: () => {
      toast.success("operation d'ajout reuissie")
      handleCloseDialogAddEmail()
      allEmailsOneProjectRefetch()
      setEmailAddress(" ")
    },
    onError:(error)=>{
      toast.error("Une erreur est survenue" + error)
    }
    
  });




  const handleCreateProject = (e:FormEvent) =>{
    e.preventDefault()  
    mutationAddProject.mutate()
  }

  const handleAddEmailAddress = (e:FormEvent)=>{
    e.preventDefault()
    mutationAddEmailAdress.mutate()
  }

  const [emailAddress,setEmailAddress] = useState("")

  const handleSetEmailAddress = (e:ChangeEvent<HTMLInputElement>) =>{
    setEmailAddress(e.target.value)
  }


  

 
  return (
    <>
     <AlertDialog  open={isOpenCreateProject}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="">Create a project</AlertDialogTitle>
      </AlertDialogHeader>
      <form   onSubmit={handleCreateProject}>
      <AlertDialogDescription>
   
        <Input type="text" value={projectName}
         onChange={(e)=>handleSetProjectName(e)} placeholder="name"
                        className=" rounded-md border border-neutral-700" />
                       
      </AlertDialogDescription>
   
    <AlertDialogFooter className="pt-3">
      <Button type="reset"  variant="ghost" onClick={()=>handleCloseDialogCreateProject()}>Cancel</Button>
      <ButtonValidation title={"create"}  isLoading={mutationAddProject.isPending} typeButton="submit" type='positive'   />
    </AlertDialogFooter>
    </form>
  </AlertDialogContent>
</AlertDialog>


   
   <AlertDialog open={isOpenAddEmailDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="">Add email on project : {nameProjectActive}  </AlertDialogTitle>
      </AlertDialogHeader>
      <form onSubmit={(e)=>handleAddEmailAddress(e)} >
      <AlertDialogDescription>
       
        <Input type="email" required pattern={`[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`} value={emailAddress}
         onChange={(e)=>handleSetEmailAddress(e)} placeholder="monEmail@gmail.com"
                        className=" rounded-md border border-neutral-700" />
                        
      </AlertDialogDescription>
   

    <AlertDialogFooter className="my-3">
      <Button type="reset"  variant="ghost" onClick={()=>handleCloseDialogAddEmail()}>Cancel</Button>
      <ButtonValidation title={"Create"}  isLoading={mutationAddEmailAdress.isPending} typeButton="submit" type='positive'   />
    </AlertDialogFooter>
    </form>
  </AlertDialogContent>
</AlertDialog>
   
   
{allProjectsOneUser?.length === 0 ?  

    <div className="w-full    px-0 py-3 gap-2 text-balance flex overflow-auto flex-col min-h-72 justify-center items-center">
      <div className="flex flex-col gap-y-4 justify-center items-center max-w-sm  text-center ">
      <h2 className="font-extrabold text-3xl">Begin with your first project now </h2>
      <span className="text-neutral-400"> Get the ID project and your public key available on page account & billing  </span>
      <Button onClick ={()=>handleShowDialogCreateProject()} 
      className="px-4 py-2 rounded-lg bg-[#dbdbdb] border border-white hover:bg-black hover:text-white">
         <b className="text-2xl">+</b> <span>Create a project </span> </Button>

         <span className=" italic text-neutral-400 max-w-sm text-balance"> you can make a new subscription here :   <Link href="/pricing" className="underline"> <span> pricing </span></Link>
         </span> 
  </div>

  </div>

:
       
        <div className="flex flex-1  h-full w-full justify-start items-start md:px-0 px-6  gap-4  ">
        




          <div className="w-1/3 lg:flex hidden max-h-[89vh]  overflow-y-auto bg-neutral-900/20 border   rounded-xl px-3 py-3  flex-col justify-start items-start">
        
          <div className="flex flex-col w-full   justify-start items-start gap-y-2">
             <h3 className="pb-2 text-xl  w-full font-bold "> Yours projects   </h3>
              <div className="flex gap-x-2  justify-start w-full items-center">
               
                <div className="w-full flex justify-start  h-full  items-center">
                  <input  type="search" onChange={(e)=>handleSearchProject(e)}
                     className="px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full" placeholder="search..." />
                </div>

                <button onClick={()=>handleShowDialogCreateProject()} className="text-4xl bg-neutral-700/50 border-2 border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>
                <button onClick={()=> allProjectsOneUserRefetch()} className="text-4xl  bg-neutral-700/50 border-2 border-neutral-700  px-3 py-3 rounded-md flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>

              </div>
          </div>

          <ul className="w-full flex flex-col py-3 gap-y-3 justify-center items-center ">

              {allProjectsOneUserLoading && <div className="py-10 flex justify-center items-center"><Loader/></div>}  
              
           { !allProjectsOneUserLoading && filterTabProjects?.length === 0  && <div className="py-8"><NoData/></div> }
            {!allProjectsOneUserLoading && filterTabProjects?.map((item:Project,index:number)=>(
              <ProjectTabItem project={item} 
              refetch={()=>allProjectsOneUserRefetch()}
               isActive={index === activeTabIndex} className="bg-red-500" 
              onClick={()=>handleTabClick(index,item.id,item.name)} key={"p"+ index} />
             ))}

              
           </ul>
           </div>
         
           <div className="w-full h-[90vh]   px-0 py-3 gap-2 flex overflow-auto flex-col min-h-72 justify-start items-center">
           <div className="w-full  overflow-x-auto overflow-y-hidden lg:hidden  h-20 justify-start items-start flex gap-x-2">
              <ul className="w-full flex  py-3 gap-x-3 justify-start items-start h-full ">

                {allProjectsOneUserLoading && <div className="py-10 flex justify-center items-center"><Loader /></div>}

                {!allProjectsOneUserLoading && filterTabProjects?.length === 0 && <div className="py-8"><NoData /></div>}
                {!allProjectsOneUserLoading && filterTabProjects?.map((item: Project, index: number) => (
                  <ProjectItemMobile 
                    name={item.name}
                    isActive={index === activeTabIndex}
                    onClick={() => handleTabClick(index, item.id, item.name)} key={"p" + index} />
                ))}


              </ul>
           <ul className="w-full hidden lg:flex  py-3 gap-x-3 justify-center items-center ">

                {allProjectsOneUserLoading && <div className="py-10 flex justify-center items-center"><Loader /></div>}

                {!allProjectsOneUserLoading && filterTabProjects?.length === 0 && <div className="py-8"><NoData /></div>}
                {!allProjectsOneUserLoading && filterTabProjects?.map((item: Project, index: number) => (
                  <ProjectTabItem project={item}
                    refetch={() => allProjectsOneUserRefetch()}
                    isActive={index === activeTabIndex} className="bg-red-500"
                    onClick={() => handleTabClick(index, item.id, item.name)} key={"p" + index} />
                ))}


           </ul>
           </div>

           {getAllUserInfo?.privateKey?.expiresAt && isDatePassed(dayjs(getAllUserInfo.privateKey.expiresAt)) && (
                <Message text="Your plan has expired. Please renew your subscription." variant="error" />
            )}
           <h3 className="pb-2 text-sm md:text-xl flex justify-start items-center gap-x-2 w-full font-bold "> Emails 
             {nameProjectActive && <>     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="size-4 stroke-neutral-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
 {nameProjectActive}</>}  </h3>
              <div className="flex justify-between gap-x-2 w-full ">
                  <div className="w-full ">
                      <input type="search" onChange={(e)=>handleSearchEmails(e)} placeholder="Search..." 
                        className="px-3 appearance-none py-2 bg-neutral-700/50 border-2 border-neutral-700 text-white rounded-md w-full" />
                   </div> 

                   <div className="flex justify-start items-center gap-x-3">
                    {!allProjectsOneUserLoading &&  allProjectsOneUser && allProjectsOneUser?.length > 0 &&  
                   <button disabled={idProjectActive?.length === 0} onClick={()=> {idProjectActive?.length !== 0 && handleShowDialogAddEmail()}}
                    className="text-4xl bg-neutral-700/50 border-2 border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>}

                {!allProjectsOneUserLoading &&  allProjectsOneUser && allProjectsOneUser?.length > 0 &&  
                   <button disabled={idProjectActive?.length === 0} onClick={()=> allEmailsOneProjectRefetch()}
                    className="text-4xl bg-neutral-700/50 border-2 border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </button>}

                    </div>
              </div>
              
              
           { allEmailsOneProjectLoading && <div className="py-10 flex justify-center items-center"><Loader/></div>}
           { !allEmailsOneProjectLoading && filterTabEmails?.length === 0  && <div className="py-10 flex justify-center items-center"><NoData/></div> }
           {!allEmailsOneProjectLoading && filterTabEmails?.length !== 0 &&
           <>
          
              <div className="flex justify-center h-auto  relative items-center w-full">
              
              
              <TableData project_Id={currentIdProject} refetchEmail={allEmailsOneProjectRefetch} emailsList={ allProjectsOneUser ? filterTabEmails : []}  /> 
              


              </div>
              </>  }
           </div> 
        
        
          </div>

}
    </>
  )
}
