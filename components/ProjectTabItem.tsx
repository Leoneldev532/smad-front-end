import { Project } from '@/lib/type';
import { cn, useGetUserInfo } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject, updateProject } from '@/hook/query';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from './Loader';
import ButtonValidation from './ButtonValidation';
import { useSetRecoilState } from 'recoil';
import { templateInfo, templateInfoType } from '@/lib/atom';
import { useRouter } from 'next/navigation';

const ProjectTabItem = ({
  project,
  onClick,
  isActive,
  refetch,
  className,
  privateKey,
  withName,
  withMap,
  linkMap,
  mapId
}: {
  project: Project,
  onClick: () => void,
  refetch: () => void,
  className: string,
  isActive: boolean,
  privateKey: string,
  withName: boolean,
  withMap: boolean,
  linkMap: string,
  mapId:string
}) => {
  const queryClient = useQueryClient();
  const { user } = useGetUserInfo();

  const [isProjectNameUpdate, setIsProjectNameUpdate] = useState<boolean>(false);
  const [idProject, setIdProject] = useState<string>("");
  const [newNameProject, setNewNameProject] = useState<string>("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenModalConfigEmail, setIsOpenModalConfigEmail] = useState(false);
  const [isOpenModalConfigMap, setIsOpenModalConfigMap] = useState(false);
  const [isCodeCopyCodeScriptEmail, setIsCodeCopyCodeScriptEmail] = useState(false);
  const [isCodeCopyCodeScriptMap, setIsCodeCopyCodeScriptMap] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const setDataUser = useSetRecoilState(templateInfo);
  const getUserTemplateInfoType = useSetRecoilState<string>(templateInfoType);

  const mutationUpdateProjectName = useMutation({
    mutationFn: () => updateProject(user?.id || "", project.id, newNameProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllProjectsOneUser', user?.id] });
      toast.success("Opération de modification réussie");
      handleCloseDialogDelete();
      setIsProjectNameUpdate(false);
      refetch();
    },
    onError: () => {
      toast.error("Une erreur est survenue");
    }
  });

  const mutationDeleteProject = useMutation({
    mutationFn: () => deleteProject(user?.id || "", project.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllProjectsOneUser', user?.id] });
      toast.success("Opération de suppression réussie");
      handleCloseDialogDelete();
      refetch();
    },
    onError: () => {
      toast.error("Une erreur est survenue");
    }
  });

  const handleShowDialogDelete = () => {
    setIsOpenDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setIsOpenDelete(false);
  };

  const handleDelete = () => {
    mutationDeleteProject.mutate();
  };

  const handleUpdateProjectName = () => {
    mutationUpdateProjectName.mutate();
  };

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !(event.target instanceof Node) && !inputRef.current.contains(event.target as any)) {
      setIsProjectNameUpdate(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const codeScriptEmail = `
<link rel="stylesheet" href="https://templates.smadmail.com/css/iframe.css"/>
<iframe src="https://templates.smadmail.com/ui/form-${withName ? "m1" : "m2"}.html?private_key=${privateKey}&project_id=${project?.id}" scrolling="no"></iframe>`;

  const codeScriptMap = `
<link rel="stylesheet" href="https://templates.smadmail.com/css/iframe.css"/>
<iframe src="https://templates.smadmail.com/ui/map.html?private_key=${privateKey}&project_id=${project?.id}&map_id=${mapId}" scrolling="no"></iframe>`;

  const handleCustomize = () => {
    setDataUser(`?private_key=${privateKey}&project_id=${project?.id.trim()}`);
    getUserTemplateInfoType(withName ? "1" : "2");
    router.push("/playground");
  };

  const handleCopyCodeScriptEmail = () => {
    setIsCodeCopyCodeScriptEmail(true);
    navigator.clipboard?.writeText(codeScriptEmail || " ");
    setTimeout(() => {
      setIsCodeCopyCodeScriptEmail(false);
    }, 1000);
  };

  const handleCopyCodeScriptMap = () => {
    setIsCodeCopyCodeScriptMap(true);
    navigator.clipboard?.writeText(codeScriptMap || " ");
    setTimeout(() => {
      setIsCodeCopyCodeScriptMap(false);
    }, 1000);
  };

  const handleCloseScriptCodeEmail = () => {
    setIsOpenModalConfigEmail(false);
  };

  const handleCloseScriptCodeMap = () => {
    setIsOpenModalConfigMap(false);
  };

  const handleOpenScriptCodeEmail = () => {
    setIsOpenModalConfigEmail(true);
  };

  const handleOpenScriptCodeMap = () => {
    setIsOpenModalConfigMap(true);
  };

  return (
    <>
      <AlertDialog open={isOpenModalConfigEmail}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Copy this code and paste in your code</AlertDialogTitle>
            <AlertDialogDescription>
              <div className='flex flex-col justify-start items-start py-3 w-full'>
                <textarea
                  readOnly
                  className="w-full outline border border-neutral-700/50 rounded-md bg-neutral-900 p-4"
                  rows={10}
                  value={codeScriptEmail}
                />
                <div className="flex justify-end items-center w-full gap-x-3 py-3">
                  <button
                    onClick={handleCopyCodeScriptEmail}
                    className='border cursor-pointer flex-shrink flex gap-x-2 w-full hover:bg-neutral-900 transition-colors duration-300 ease justify-center text-lg items-center border-neutral-500/40 text-neutral-500 px-2 py-2.5 rounded-lg'>
                    <span className="text-xs">Copy Code</span>
                    {isCodeCopyCodeScriptEmail ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-slate-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4 stroke-neutral-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                      </svg>
                    )}
                  </button>
                  <Button onClick={handleCloseScriptCodeEmail}>Cancel</Button>
                </div>
                <Button className="bg-yellow-500 flex gap-x-3" onClick={handleCustomize}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <span>Customize</span>
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <Button onClick={handleCloseDialogDelete}>Cancel</Button> */}
            {/* <ButtonValidation title={"confirm"} isLoading={mutationDeleteProject.isPending} typeButton="button" type='negative' onClick={() => handleDelete(project?.id)} /> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenModalConfigMap}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Copy this code and paste in your code</AlertDialogTitle>
            <AlertDialogDescription>
              <div className='flex flex-col justify-start items-start py-3 w-full'>
                <textarea
                  readOnly
                  className="w-full outline border border-neutral-700/50 rounded-md bg-neutral-900 p-4"
                  rows={10}
                  value={codeScriptMap}
                />
                <div className="flex justify-end items-center w-full gap-x-3 py-3">
                  <button
                    onClick={handleCopyCodeScriptMap}
                    className='border cursor-pointer flex-shrink flex gap-x-2 w-full hover:bg-neutral-900 transition-colors duration-300 ease justify-center text-lg items-center border-neutral-500/40 text-neutral-500 px-2 py-2.5 rounded-lg'>
                    <span className="text-xs">Copy Code</span>
                    {isCodeCopyCodeScriptMap ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-slate-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-4 stroke-neutral-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                      </svg>
                    )}
                  </button>
                  <Button onClick={handleCloseScriptCodeMap}>Cancel</Button>
                </div>
                <Button className="bg-yellow-500 flex gap-x-3" onClick={handleCustomize}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  <span>Customize</span>
                </Button>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <Button onClick={handleCloseDialogDelete}>Cancel</Button> */}
            {/* <ButtonValidation title={"confirm"} isLoading={mutationDeleteProject.isPending} typeButton="button" type='negative' onClick={() => handleDelete(project?.id)} /> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all emails of the project with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleCloseDialogDelete}>Cancel</Button>
            <ButtonValidation title={"confirm"} isLoading={mutationDeleteProject.isPending} typeButton="button" type='negative' onClick={handleDelete} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <button type="button" onClick={onClick} className={cn("py-2 flex px-3 text-sm rounded-md w-full justify-between items-center gap-x-3", className, isActive ? "bg-neutral-800" : "bg-transparent")}>
        <div className="flex gap-2 justify-start items-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-table2 grid-area-1-1">
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
          </svg>
          {isProjectNameUpdate ? (
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
          <div className="w-6 h-6 flex justify-start items-start">
            {mutationUpdateProjectName?.isPending && <Loader height="6" width="6" />}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(project.id)}>Copy project ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleOpenScriptCodeEmail}>Show code integration Email</DropdownMenuItem>
            <DropdownMenuSeparator className={`${withMap ? "block" : "hidden"}`} />
            {withMap && <DropdownMenuItem className="cursor-pointer" onClick={handleOpenScriptCodeMap}>Show code integration Map</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => { setIsProjectNameUpdate(true); setIdProject(project.id); setNewNameProject(project.name); }}>Update</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleShowDialogDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </button>
    </>
  );
};

export default ProjectTabItem;
