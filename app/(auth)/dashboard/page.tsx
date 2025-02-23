

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

import { addEmailAddress, createProject, setResendApiKey, useGetAllEmailsOneProject, useGetAllProjectsOfOneUser, useGetAllUserInfo, useGetAudience, useGetResendUser, useGetResendUserAudience } from "@/hook/query"
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
import dayjs, { Dayjs } from "dayjs"
import ProjectItemMobile from "@/components/ui/ProjectItemMobile"
import { useRecoilValue } from "recoil"
import {  userInfoState } from "@/lib/atom"
import { Resend } from 'resend';
import { ResendServerComponent } from "@/components/resendData"
import SkeletonEmailLine from "@/components/ui/skeletonEmailLine"
import SkeletonProject from "@/components/ui/skeletonProject"
import { GetAudience, SendContactToAudience } from "@/components/GetAudience"
import Loader2 from "@/components/Loader2"


export default   function Page() {

  const user = useRecoilValue(userInfoState);

  const [idProjectActive,setIdProjectActive] = useState<string>("")
  const [nameProjectActive,setNameProjectActive] = useState<string>(" ")

  const {data:getAllUserInfo,isLoading:getAllUserInfoIsLoading} = useGetAllUserInfo(user?.id)

   const [privateKey, setprivateKey] = useState<string>()

    useEffect(() => {
      setprivateKey(getAllUserInfo?.privateKey?.key)
    }, [getAllUserInfo])


  const {data:allProjectsOneUser,isLoading:allProjectsOneUserLoading,isError:allProjectsOneUserError,refetch:allProjectsOneUserRefetch}  = 
  useGetAllProjectsOfOneUser(user?.id)

  const {data:allEmailsOneProject,isLoading:allEmailsOneProjectLoading,isError:allEmailsOneProjectError,refetch:allEmailsOneProjectRefetch} =
   useGetAllEmailsOneProject(user?.id,idProjectActive )


   
  const {data:resendApiKeydata,isLoading:resendApiKeyLoading,isError:resendApiKeyError,refetch:resendApiKeyRefetch} = useGetResendUser(user?.id)




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
      // toast.error("Please subscription a new plan")
    }
   }


   const handleCloseDialogAddEmail = ()=>{
    setIsOpenAddEmailDialog(false)
   }

  
  const handleShowDialogCreateProject = () =>{
    // if(getAllUserInfo?.privateKey?.expiresAt && !isDatePassed(dayjs(getAllUserInfo?.privateKey?.expiresAt))){
    setIsOpenCreateProject(true)
    // }else{
    //   toast.error("Please subscription a new plan")
    // }
  }
  const handleCloseDialogCreateProject = () =>{
    setIsOpenCreateProject(false)
  }

  const GetCorrectFormOfTabCsvData = (data:Email[]) => {
    const newTab  = data.map((item: Email, index: number) => {
      if (typeof item === 'object' && item !== null && 'email' in item) {
        return {
          email: item.email
        };
      } else {
        console.warn(`Element invalide trouvé à l'index ${index}:`, item);
        return {
          email: 'N/A' 
        };
      }
    });
    return newTab as Email[];
  };

  // const convertToCSV = (objArray:Email[]) => {
  //   const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  //   let str = '';

  //   for (let i = 0; i < array.length; i++) {
  //     let line = '';
  //     for (let index in array[i]) {
  //       if (line !== '') line += ',';

  //       line += array[i][index];
  //     }
  //     str += line + '\r\n';
  //   }
  //   return str;
  // };


  const convertToCSV = (objArray: Email[]) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = 'emails\r\n'; // Add the header for the email column
  
    for (let i = 0; i < array.length; i++) {
      const email = array[i].email;
      str += email + '\r\n'; // Append each email to the CSV string
    }
  
    return str;
  };


  const downloadCSV = (data:Email[],fileName:string) => {
    const csvData = new Blob([convertToCSV(GetCorrectFormOfTabCsvData(data))], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  const handleSetProjectName = (e:ChangeEvent<HTMLInputElement>)=>{
    setProjectName(e.target.value)
  }


  const [isOpenExportModal,setIsOpenExportModal] = useState(false)

  const handleOpenExportModal = ()=>{
    setIsOpenExportModal(true)
  }


const [resendApiKeyState,setResendApiKeyState] = useState<string | null>(resendApiKeydata?.resendApiKey || null)


  useEffect(()=>{
    setResendApiKeyState(resendApiKeydata?.resendApiKey || " " ) 
  },[resendApiKeydata])


const [isOpenFormResendApiKey,setisOpenFormResendApiKey] = useState<boolean>(false)
const {data:allAudiences,isLoading:loadingAllAudiences,refetch:refetchAudiences} = useGetAudience(resendApiKeyState || " ")

  const handleShowInputResendApiKey =(e:any)=>{
    e.preventDefault()
    if(isOpenFormResendApiKey){
      if(resendApiKeydata?.resendApiKey === resendApiKeyState){
        
        toast.error("Key identical to the one already registered")
      }
      if(resendApiKeyState?.length === 0){
        toast.error("Veuillez remplir ce champ")
      }else{
        
        mutationAddResendApiKey.mutate()
      }
    }else{
      setisOpenFormResendApiKey(true)
    }
  }




  

  
  const mutationAddResendApiKey = useMutation({
    mutationFn: () => setResendApiKey(user?.id,resendApiKeyState), 
    onSuccess: () => {
      toast.success("operation d'ajout reuissie")
      setisOpenFormResendApiKey(false)
      // handleCloseModalExport()
      refetchAudiences()
    },
    onError:(error)=>{
      setisOpenFormResendApiKey(true)
      toast.error("Une erreur est survenue" + error)
    }
    
  });


    const [isOpenModalConfig,setIsOpenModalConfig] = useState(false)
    const [isCodeCopyCodeScript,setIsCodeCopyCodeScript] = useState(false)

  const mutationAddProject = useMutation({
    mutationFn: () => createProject(user?.id || " ",projectName), 
    onSuccess: (data:{id:string}) => {
      toast.success("operation d'ajout reuissie")
      setIsOpenCreateProject(false)
      setCurrentIdProject(data?.id || " ")
      setIsOpenModalConfig(true)
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

 

  const handleCloseModalExport = () =>{
    setIsOpenExportModal(false)
    
    setIdAudienceSelected(null)	
  }


  const handleSetEmailAddress = (e:ChangeEvent<HTMLInputElement>) =>{
    setEmailAddress(e.target.value)
  }

  const [audiencesOfUser,setAudiencesOfUser ] = useState([])
  const [idAudienceSelected,setIdAudienceSelected] = useState<string | null>(null)



  const handleSelectedAudience = (id:string) =>{
    setIdAudienceSelected(id)
  }



  const mutationSendContactResend = useMutation({
    mutationKey: ["sendContactToAudience"], // Clé unique pour cette mutation
    mutationFn: async ({ idAudience, resendApiKeyState, TabEmail }:{idAudience:string,resendApiKeyState:string,TabEmail:string[]}) => {
      return SendContactToAudience(idAudience, resendApiKeyState || " ", TabEmail || []);
    },
    onSuccess: () => {
      toast.success("Opération réussie !");
    },
    onError: (error) => {
      console.error("Erreur :", error);
      toast.error("Une erreur est survenue.");
    },
  });


const handleResendExport = async (idAudience:string) =>{

  const TabEmail =allEmailsOneProject && allEmailsOneProject?.map((item)=>item.email)
  mutationSendContactResend.mutate({ idAudience, resendApiKeyState:resendApiKeyState || " " , TabEmail :  TabEmail || []  });

  
}


const [isCodeCopy, setIsCodeCopy] = useState(false)
const [isCodeCopyPrivateApiKey, setIsCodeCopyPrivateApiKey] = useState(false)

const handleCopyCode = () => {
        setIsCodeCopy(true)
        navigator.clipboard?.writeText(idProjectActive || " ")
        setTimeout(() => {
          setIsCodeCopy(false)
        }, 1000)
      }

      const handleCopyCodePrivateApiKey = () => {
        setIsCodeCopyPrivateApiKey(true)
        navigator.clipboard?.writeText(privateKey || " ")
        setTimeout(() => {
          setIsCodeCopyPrivateApiKey(false)
        }, 1000)
      }

   
      const codeScript = `<script type="text/javascript" src="https://templates.smadmail.com/js/iframeResizer.min.js"></script>
      <iframe src="https://templates.smadmail.com/ui/form1.html?private_key=${privateKey}&project_id=${currentIdProject}"
       scrolling="no"  ></iframe>`    

     

      
  const handleCopyCodeScript = () => {
    setIsCodeCopyCodeScript(true)
    navigator.clipboard?.writeText(codeScript || " ")
    setTimeout(() => {
      setIsCodeCopyCodeScript(false)
    }, 1000)
  }

  const handleCloseScriptCode = () =>{
    setIsOpenModalConfig(false)
  }





  return (
    <>

<AlertDialog open={isOpenModalConfig}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Copy this code and paste in your code </AlertDialogTitle>
      <AlertDialogDescription>
        <div className='flex flex-col justify-start items-start py-3  w-full'>
            <textarea
              readOnly
              className="w-full outline  border border-neutral-700/50   rounded-md bg-neutral-900 p-4 "
              rows={10}
              value={codeScript}
            />
<div className="flex justify-end items-center w-full gap-x-3 py-3">
{<button  onClick={() => handleCopyCodeScript()} 
  className='border  cursor-pointer 
              flex-shrink flex gap-x-2 w-full  hover:bg-neutral-900 transition-colors 
      duration-300 ease justify-center text-lg items-center border-neutral-500/40 text-neutral-500 px-2 py-2.5 rounded-lg'> 
        <span className="text-xs"> Copy Code  </span>
  { isCodeCopyCodeScript ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

                      className="size-4 stroke-slate-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :  <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-4 stroke-neutral-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>}
            </button> }

         <Button onClick={()=>handleCloseScriptCode()}>Cancel</Button>
         </div>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      
      {/* <Button onClick={()=>handleCloseDialogDelete()}>Cancel</Button> */}
      {/* <ButtonValidation title={"confirm"}  isLoading={mutationDeleteProject.isPending} typeButton="button" type='negative' onClick={()=>handleDelete(project?.id)} /> */}

    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>



     <AlertDialog  open={isOpenCreateProject}>
  <AlertDialogContent className="bg-neutral-900">
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


<AlertDialog   open={isOpenExportModal}>
  <AlertDialogContent className="bg-neutral-900">
    <AlertDialogHeader>
      <AlertDialogTitle className="">Export mail address of project : {nameProjectActive}  </AlertDialogTitle>
      </AlertDialogHeader>

      <ul className="flex flex-col gap-y-2">
        <li><button className="px-4 py-2 w-full group  text-xs md:text-sm gap-x-4  border border-neutral-700 line1 
         hover:bg-neutral-600 relative  flex justify-center items-center rounded-lg text-center" onClick={()=>  downloadCSV(filterTabEmails || [],`${nameProjectActive}-${dayjs()}`)}> Export To CSV </button></li>
        
          {<form className="w-full flex flex-col p-4 rounded-lg gap-y-2  border border-neutral-600/40 mt-8">
          <h5 className="font-bold">Share data to Resend </h5>
          <span className="text-sm py-1 "> Your Api Key :  </span>
          <div className="flex gap-x-2">
          <input  autoComplete="off" placeholder="set yout resend Api Key"
           type="password" value={resendApiKeyState || ""} onChange={(e)=>setResendApiKeyState(e.target.value)}
                     className="px-3 appearance-none py-2 w-10/12 bg-neutral-500/20 border border-neutral-700 text-white rounded-md"
                      />

                      <button  type="submit" className="px-4 w-2/12 py-2  overflow-hidden group  text-xs md:text-sm gap-x-4  border border-neutral-700 line1 
         hover:bg-neutral-600 relative  flex justify-center items-center rounded-lg text-center" 
         onClick={(e)=> handleShowInputResendApiKey(e)}> 
         {mutationAddResendApiKey.isPending ? <><Loader2/></>  : <span>Save</span>}
            </button>

                      </div>
                      {resendApiKeydata?.resendApiKey && resendApiKeydata?.resendApiKey?.length > 0 ?  
                     <>                       
                      <div className="flex justify-between   w-full">
                          <h5>Vos audiences  </h5>
                         <span className="px-3 py-1 rounded-full bg-neutral-700"> {allAudiences?.data?.data.length} </span>  
                      </div>

                      {loadingAllAudiences && <SkeletonProject/> }

                      {allAudiences?.data?.data && allAudiences?.data?.data?.length > 0 ? <div className="flex flex-col gap-2  ">	
                        
                        <select className="bg-neutral-800 h-10 px-1 outline-none rounded-sm pr-2"
                         onChange={(e)=>handleSelectedAudience(e.target.value)} 
                        >
                          <option className="flex bg-neutral-900  gap-2" selected disabled> select One audience </option>
                        {allAudiences?.data?.data.map((item:any,index:number)=>(
                        <option key={index +  "io"} value={item?.id} className="flex bg-neutral-900  gap-2">
                          {item?.name}
                        </option>
                           ))}

                        </select>

                     

                      </div> :
                       <p className="w-full text-center font-bold">
                           No audiences find !! 
                        </p>}
                        </> :   
                        <p>Please set your resend APi Key </p>
                        }
            <li>
          <button  style={{opacity:idAudienceSelected === null ? "0.3": "1",pointerEvents:idAudienceSelected === null ? "none": "auto"}} 
           type="button" className="px-4 py-2 w-full group  text-xs md:text-sm gap-x-4  border border-neutral-700 line1 
         hover:bg-neutral-600 relative  flex justify-center items-center rounded-lg text-center" 
         onClick={()=> handleResendExport(idAudienceSelected || " ")}
         > 
         {mutationSendContactResend.isPending ? <><span>En cours</span><Loader2/></>  : <span>Set as Contact Resend</span>}
            </button></li>


          </form>
               }  
        
        
        
      </ul> 

      <div className="w-full flex justify-end items-center">
           <Button className="w-full " onClick={()=>handleCloseModalExport()}>Cancel</Button>
      </div>    
  
  </AlertDialogContent>
</AlertDialog>

   
   <AlertDialog open={isOpenAddEmailDialog}>
  <AlertDialogContent className="bg-neutral-900" >
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
      <span className="text-neutral-400"> Get the ID project and your private key available on page account & billing  </span>
      <Button onClick ={()=>handleShowDialogCreateProject()} 
      className="px-4 py-2 rounded-lg bg-[#dbdbdb] border border-white hover:bg-black hover:text-white">
         <b className="text-2xl">+</b> <span>Create a project </span> </Button>

         {/* <span className=" italic text-neutral-400 max-w-sm text-balance"> you can make a new subscription here :   <Link href="/pricing" className="underline"> <span> pricing </span></Link> */}
         {/* </span>  */}  
  </div>

  </div>

:
       
        <div className="flex flex-1   rounded-md p-2 h-full w-full justify-start items-start md:px-0 px-6  gap-4  ">
        




          <div className="w-1/3 lg:flex hidden h-auto  overflow-y-auto     rounded-md px-3 py-3  flex-col justify-start items-start">
        
          <div className="flex flex-col w-full   justify-start items-start gap-y-2">
                

  {/* {!allProjectsOneUserLoading && allProjectsOneUser && allProjectsOneUser?.length > 0  && <button  onClick={() => handleCopyCodePrivateApiKey()} 
  className='border my-1 cursor-pointer 
              flex-shrink flex gap-x-2 w-full hover:bg-neutral-900 transition-colors 
      duration-300 ease justify-center text-lg items-center border-neutral-500/40 text-neutral-500 px-2 py-2 rounded-lg'> 
        <span className="text-xs"> Copy private API  key  </span>
  { isCodeCopyPrivateApiKey ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

                      className="size-4 stroke-slate-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :  <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-4 stroke-neutral-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>}
            </button> } */}


             <h3 className=" text-xl  w-full font-bold "> Yours projects   </h3>
              <div className="flex gap-x-2  justify-start w-full items-center">
               
                <div className="w-full flex justify-start  h-full  items-center">
                  <input  type="search" onChange={(e)=>handleSearchProject(e)}
                     className="px-3 appearance-none py-2 bg-neutral-500/20 border border-neutral-700 text-white rounded-md w-full" placeholder="search..." />
                </div>

                <button onClick={()=>handleShowDialogCreateProject()} className="text-4xl bg-neutral-500/20 border border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>
                <button onClick={()=> allProjectsOneUserRefetch()} className="text-4xl  bg-neutral-500/20 border border-neutral-700  px-3 py-3 rounded-md flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>

              </div>
          </div>

          <ul className="w-full flex flex-col py-3 gap-y-3 justify-center items-center ">

              {allProjectsOneUserLoading && <div className="py-0 w-full h-full flex justify-center items-center">
                <SkeletonProject/>
                </div>}  
              
           { !allProjectsOneUserLoading && filterTabProjects?.length === 0  && <div className="py-1 md:py-1  w-full"><NoData/></div> }
            {!allProjectsOneUserLoading && filterTabProjects?.map((item:Project,index:number)=>(
              <ProjectTabItem project={item} 
              privateKey={privateKey || " "}
              refetch={()=>allProjectsOneUserRefetch()}
               isActive={index === activeTabIndex} className="bg-red-500" 
              onClick={()=>handleTabClick(index,item.id,item.name)} key={"p"+ index} />
             ))}

              
           </ul>
           </div>
         
           <div className="w-full min-h-[90vh]   px-0 py-3 gap-2 flex overflow-auto flex-col  justify-start items-center">
           <div className="w-full   overflow-x-auto overflow-y-hidden lg:hidden  h-12 justify-start items-start flex gap-x-2">
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

                {allProjectsOneUserLoading && <div className="py-2 w-full h-full flex justify-center items-center"> <SkeletonProject/></div>}

                {!allProjectsOneUserLoading && filterTabProjects?.length === 0 && <div className="py-8"><NoData /></div>}
                {!allProjectsOneUserLoading && filterTabProjects?.map((item: Project, index: number) => (
                  <ProjectTabItem project={item}
                    privateKey={privateKey || " "}
                    refetch={() => allProjectsOneUserRefetch()}
                    isActive={index === activeTabIndex} className="bg-red-500"
                    onClick={() => handleTabClick(index, item.id, item.name)} key={"p" + index} />
                ))}


           </ul>
           </div>




           {/* {getAllUserInfo?.privateKey?.expiresAt && isDatePassed(dayjs(getAllUserInfo.privateKey.expiresAt)) && (
                <Message text="Your plan has expired. Please renew your subscription." variant="error" />
            )} */}


            <div className=" flex w-full p-0 m-0   justify-between items-start ">

           <h3 className=" text-sm md:text-lg    flex justify-start items-center h-8  gap-x-2 font-bold "> Emails 
             {nameProjectActive &&
              <>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="size-4 stroke-neutral-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
 {nameProjectActive} 
  
  {!allProjectsOneUserLoading && allProjectsOneUser && allProjectsOneUser?.length > 0  && <button  onClick={() => handleCopyCode()} className='border my-1 cursor-pointer 
              flex-shrink flex gap-x-2 hover:bg-neutral-900 transition-colors 
      duration-300 ease justify-center items-center border-neutral-500/40 text-neutral-500 px-2 py-1 rounded-lg'> 
        <span className="text-xs">ID of Project</span>
  { isCodeCopy ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"

                      className="size-4 stroke-slate-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg> :  <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-4 stroke-neutral-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>}
            </button> } </>
            
            }
  </h3>

            
             

           </div>



              <div className="flex justify-between gap-x-2 items-start m-0 p-0  w-full ">
                  <div className="w-full flex justify-start items-start  ">
                      <input type="search" onChange={(e)=>handleSearchEmails(e)} placeholder="Search..." 
                        className="px-3 appearance-none py-2 bg-neutral-500/20 border border-neutral-700 text-white rounded-md w-full" />
                   </div> 

                   <div className="flex justify-start items-center gap-x-3">
                    {!allProjectsOneUserLoading &&  allProjectsOneUser && allProjectsOneUser?.length > 0 &&  
                   <button disabled={idProjectActive?.length === 0} onClick={()=> {idProjectActive?.length !== 0 && handleShowDialogAddEmail() }}
                    className="text-4xl bg-neutral-500/20 border border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>}

                {!allProjectsOneUserLoading && !allEmailsOneProjectLoading &&  allProjectsOneUser && allProjectsOneUser?.length > 0 &&  
                   <button disabled={idProjectActive?.length === 0} onClick={()=> allEmailsOneProjectRefetch()}
                    className="text-4xl bg-neutral-500/20 border border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </button>}


                {!allProjectsOneUserLoading && !allEmailsOneProjectLoading &&  allProjectsOneUser && allProjectsOneUser?.length > 0 &&  
                   <button disabled={idProjectActive?.length === 0} onClick={()=> handleOpenExportModal()}
                    className="text-4xl bg-neutral-500/20 border border-neutral-700   px-3 py-3 rounded-md flex justify-center items-center"> 
            
                  
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            className="size-4"
                          >
                            <path
                              fill="currentColor"
                              d="M13 14h-2a9 9 0 0 0-7.968 4.81A10 10 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8l-10 8z"
                            ></path>
                          </svg>

                </button>}

                    </div>
              </div>
              
              
           { allEmailsOneProjectLoading && <div className="py-3 flex justify-start w-full h-full items-start"><SkeletonEmailLine/></div>}
           { !allEmailsOneProjectLoading && filterTabEmails?.length === 0  && <div className="w-full h-full flex justify-start items-start"><NoData/></div> }
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
