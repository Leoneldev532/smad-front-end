

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
         const ProjectTabItem = ({project,onClick,isActive,refetch,className}:{project:Project,onClick:()=>void,refetch:()=>void,className:string,isActive:boolean}) => {
          
  const queryClient = useQueryClient();
  const {user} = useGetUserInfo()

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
  
         
          return (
            <>
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

                <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuSeparator />
        <DropdownMenuContent className="bg-neutral-700"  align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer"  onClick={() => navigator.clipboard.writeText(project.id)} >Copy project ID </DropdownMenuItem>
          
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
        