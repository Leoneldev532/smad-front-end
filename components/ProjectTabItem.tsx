

        import { Project } from '@/lib/type'
import { cn, useGetUserInfo} from '@/lib/utils'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
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
        
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProject, updateEmail, updateProject } from '@/hook/query'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonValidation from './ButtonValidation'
import Loader from './Loader'
import { useSetRecoilState } from 'recoil'
import { templateInfo } from '@/lib/atom'
import { useRouter } from 'next/navigation'
         const ProjectTabItem = ({project,onClick,isActive,refetch,className,privateKey}:
          {project:Project,onClick:()=>void,refetch:()=>void,className:string,isActive:boolean,privateKey:string}) => {
          
  const queryClient = useQueryClient();
  const {user} = useGetUserInfo()


  

  
  
  const [isprojectNameUpdate,setIsprojectNameUpdate] = useState<boolean>(false)
  const [idProject,setIdProject] = useState<string>(" ")
  const [newNameProject,setNewNameProject] = useState<string>(" ")

  const [isOpenDelete,setIsOpenDelete] = useState(false)


  const mutationUpdateProjectName = useMutation({
    mutationFn: () => updateProject(user?.id || " ",project.id,newNameProject), 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['getAllProjectsOneUser', user?.id]});
      toast.success("operation de modification reuissie")
      handleCloseDialogDelete()
      setIsprojectNameUpdate(false)
      refetch()
    },
    onError:()=>{
      toast.error("Une erreur est survenue")
    }
    
  });



  const mutationDeleteProject = useMutation({
    mutationFn: () => deleteProject(user?.id || " ",project.id), 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['getAllProjectsOneUser', user?.id]});
      toast.success("operation de suppression reuissie")
      handleCloseDialogDelete()
      refetch()
    },
    onError:()=>{
      toast.error("Une erreur est survenue")
    }
    
  });


 const inputRef = useRef<HTMLInputElement | null>(null)

  const handleShowDialogDelete = () =>{
    setIsOpenDelete(true)
  }
  const handleCloseDialogDelete = () =>{
    setIsOpenDelete(false)
  }

  const handleDelete = (projectId:string) => {
    mutationDeleteProject.mutate();
  };

  const handleUpdateProjectName = () =>{
    mutationUpdateProjectName.mutate()
  }


  const handleClickOutside = (event: any) => {
    if (inputRef.current && !(event.target instanceof Node) && !inputRef.current.contains(event.target as any)) {
      setIsprojectNameUpdate(false)
    }
};

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])
  

  const [isOpenModalConfig,setIsOpenModalConfig] = useState(false)
  const [isCodeCopyCodeScript,setIsCodeCopyCodeScript] = useState(false)


  const codeScript = `
<link rel="stylesheet"  href="https://templates.smadmail.com/css/iframe.css"/>
  <iframe src="https://templates.smadmail.com/ui/form1.html?private_key=${privateKey}&project_id=${project?.id}" scrolling="no"  ></iframe>`  


    const router  = useRouter()
   
      const setDataUser = useSetRecoilState(templateInfo)
   
     const handleCustomize = () =>{
       setDataUser(`?private_key=${privateKey}&project_id=${project?.id.trim()}`)
       router.push("/playground")
     }
   

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

  const handleOpenScriptCode = () =>{
    setIsOpenModalConfig(true)
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

            <Button className="bg-yellow-500" onClick={()=>handleCustomize()}>Customize</Button>
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

            <AlertDialog open={isOpenDelete}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete all emails of project with him .
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      
      <Button onClick={()=>handleCloseDialogDelete()}>Cancel</Button>
      <ButtonValidation title={"confirm"}  isLoading={mutationDeleteProject.isPending} typeButton="button" type='negative' onClick={()=>handleDelete(project?.id)} />

    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>




            <button type="button" onClick={onClick}  className={cn("py-2 flex px-3 text-sm rounded-md  w-full justify-between items-center gap-x-3 ",className, isActive ? "bg-neutral-800":"bg-transparent")}>
            <div  className="flex gap-2 justify-start items-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.875" 
             strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-table2 grid-area-1-1"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2
             2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg>
                  {isprojectNameUpdate ? (
                    idProject === project.id ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        disabled={mutationUpdateProjectName.isPending}
                        value={newNameProject}
                        onChange={(e) => setNewNameProject(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateProjectName();
                          }
                        }}
                      />
                    ) : (
                      <span>{project.name}</span>
                    )
                  ) : (
                    <span>{project.name}</span>
                  )}
                  <div className="w-6 h-6 flex justify-start items-start">   {mutationUpdateProjectName?.isPending &&  <Loader  height="6" width="6" /> }     </div>
                </div>

                <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuSeparator />
        <DropdownMenuContent className="bg-neutral-900"  align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer"  onClick={() => navigator.clipboard.writeText(project.id)} >Copy project ID </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer"  onClick={() => handleOpenScriptCode()} > 
                  show code integration
         </DropdownMenuItem>
          
        <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={()=>{setIsprojectNameUpdate(true) ; setIdProject(project.id) ; setNewNameProject(project.name) } } >
            Update
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() =>handleShowDialogDelete()}>
                delete
      
          </DropdownMenuItem>
        </DropdownMenuContent>
             </DropdownMenu>
              </button> 
              
            </>
          )
        }
        
        export default ProjectTabItem
        