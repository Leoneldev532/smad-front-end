"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addEmailAddress,
  createProject,
  useAddMapMutation,
  useGetAllEmailsOneProject,
  useGetAllProjectsOfOneUser,
  useGetAllUserInfo,
  useGetOneMapOfOneProjectUser,
} from "@/hook/query";
import { Email, Project } from "@/lib/type";
import { isDatePassed } from "@/lib/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { templateInfo, templateInfoType, userInfoState } from "@/lib/atom";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import ProjectCreationDialog from "@/components/dashboard/projectCreationDialog";
import EmailAdditionDialog from "@/components/dashboard/emailAdditionDialog";
import MapCreationDialog from "@/components/dashboard/mapCreationDialog";
import ExportModal from "@/components/dashboard/exportModal";
import CodeDisplayModal from "@/components/dashboard/codeDisplayModal";
import ProjectSidebar from "@/components/dashboard/projectSidebar";
import EmptyState from "@/components/dashboard/emptyState";
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";
import SkeletonProject from "@/components/ui/skeletonProject";
import ProjectTabItem from "@/components/ProjectTabItem";
import SkeletonEmailLine from "@/components/ui/skeletonEmailLine";
import TableData from "@/components/table";
import {
  generateCodeScript,
  generateCodeScriptMap,
} from "@/lib/codeGenerators";
import ProjectItemMobile from "@/components/ui/ProjectItemMobile";
import TableMap from "@/components/ui/TabMap";

export default function Page() {
  const user = useRecoilValue(userInfoState);

  const [idProjectActive, setIdProjectActive] = useState<string>("");
  const [nameProjectActive, setNameProjectActive] = useState<string>(" ");

  const { data: getAllUserInfo, isLoading: getAllUserInfoIsLoading } =
    useGetAllUserInfo(user?.id);

  const [privateKey, setprivateKey] = useState<string>();

  useEffect(() => {
    setprivateKey(getAllUserInfo?.privateKey?.key);
  }, [getAllUserInfo]);

  const {
    data: allProjectsOneUser,
    isLoading: allProjectsOneUserLoading,
    isError: allProjectsOneUserError,
    refetch: allProjectsOneUserRefetch,
  } = useGetAllProjectsOfOneUser(user?.id);

  const {
    data: allEmailsOneProject,
    isLoading: allEmailsOneProjectLoading,
    isError: allEmailsOneProjectError,
    refetch: allEmailsOneProjectRefetch,
  } = useGetAllEmailsOneProject(user?.id, idProjectActive);

  useEffect(() => {
    if (allProjectsOneUser) {
      setIdProjectActive(allProjectsOneUser[0]?.id);
      setNameProjectActive(allProjectsOneUser[0]?.name);
      setCurrentIdProject(allProjectsOneUser[0]?.id);
    }
  }, [allProjectsOneUser, allProjectsOneUserRefetch]);

  const handlShowEmailsOneProject = (id: string, name: string) => {
    setIdProjectActive(id);
    setNameProjectActive(name);
    setCurrentIdProject(id);
    allEmailsOneProjectRefetch();
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentIdProject, setCurrentIdProject] = useState<string>("");
  const [projectIswithName, setProjectIswithName] = useState<boolean>(false);

  const handleTabClick = (
    index: number,
    idProject: string,
    nameProject: string,
    withName: boolean,
  ) => {
    setActiveTabIndex(index);
    setCurrentIdProject(idProject);
    setProjectIswithName(withName);
    handlShowEmailsOneProject(idProject, nameProject);
  };

  const [filterTabEmails, setFilterTabEmails] = useState<
    Email[] | [] | undefined
  >([]);
  const [filterTabProjects, setFilterTabProjects] = useState<
    Project[] | [] | undefined
  >([]);

  useEffect(() => {
    setFilterTabEmails(allEmailsOneProject);
  }, [allEmailsOneProject]);

  useEffect(() => {
    setFilterTabProjects(allProjectsOneUser);
  }, [allProjectsOneUser]);

  const [isOpenCreateProject, setIsOpenCreateProject] =
    useState<boolean>(false);
  const [isOpenAddEmailDialog, setIsOpenAddEmailDialog] =
    useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [isCheckedFieldNameUser, setIsCheckedFieldNameUser] =
    useState<boolean>(false);

  const handleShowDialogAddEmail = () => {
    // if (
    //   getAllUserInfo?.privateKey?.expiresAt &&
    //   !isDatePassed(dayjs(getAllUserInfo?.privateKey?.expiresAt))
    // ) {
      setIsOpenAddEmailDialog(true);
    // }
  };

  const handleCloseDialogAddEmail = () => {
    setIsOpenAddEmailDialog(false);
  };

  const handleShowDialogCreateProject = () => {
    setIsOpenCreateProject(true);
  };
  const handleCloseDialogCreateProject = () => {
    setIsOpenCreateProject(false);
  };

  const [isOpenExportModal, setIsOpenExportModal] = useState(false);

  const handleOpenExportModal = () => {
    setIsOpenExportModal(true);
  };

  const [isOpenModalConfig, setIsOpenModalConfig] = useState(false);
  const [isCodeCopyCodeScript, setIsCodeCopyCodeScript] = useState(false);

  const mutationAddProject = useMutation({
    mutationFn: () =>
      createProject(user?.id || " ", projectName, isCheckedFieldNameUser),
    onSuccess: (data: { id: string }) => {
      toast.success("operation d'ajout reuissie");
      setIsOpenCreateProject(false);
      setCurrentIdProject(data?.id || " ");
      setIsOpenModalConfig(true);
      allProjectsOneUserRefetch();
      setProjectName("");
    },
    onError: (error) => {
      toast.error("Une erreur est survenue" + error);
    },
  });

  const mutationAddEmailAdress = useMutation({
    mutationFn: () =>
      addEmailAddress(
        user?.id || " ",
        idProjectActive,
        emailAddress,
        projectIswithName,
        name,
      ),
    onSuccess: () => {
      toast.success("operation d'ajout reuissie");
      handleCloseDialogAddEmail();
      allEmailsOneProjectRefetch();
      setEmailAddress(" ");
      setName(" ");
    },
    onError: (error) => {
      toast.error("Une erreur est survenue" + error);
    },
  });

  const handleCreateProject = (e: FormEvent) => {
    e.preventDefault();
    mutationAddProject.mutate();
  };

  const handleAddEmailAddress = (e: FormEvent) => {
    e.preventDefault();
    mutationAddEmailAdress.mutate();
  };

  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");

  const handleCloseModalExport = () => {
    setIsOpenExportModal(false);
  };

  const [isCodeCopy, setIsCodeCopy] = useState(false);

  const handleCopyCode = () => {
    setIsCodeCopy(true);
    navigator.clipboard?.writeText(idProjectActive || " ");
    setTimeout(() => {
      setIsCodeCopy(false);
    }, 1000);
  };

  const {
    data: getMap,
    refetch: refetchFunctionGetMap,
    isLoading: isLoadingGetOneMap,
  } = useGetOneMapOfOneProjectUser(user?.id, currentIdProject);

  const withMap = (getMap && getMap?.length > 0) || false;
  const linkMap = getMap?.[0]?.link || " ";
  const mapId = getMap?.[0]?.id || " ";

  const codeScript = generateCodeScript(
    projectIswithName,
    privateKey || "",
    currentIdProject,
  );

  const codeScriptMap = generateCodeScriptMap(
    privateKey || "",
    currentIdProject,
    mapId,
  );

  const handleCopyCodeScript = () => {
    setIsCodeCopyCodeScript(true);
    navigator.clipboard?.writeText(codeScript || " ");
    setTimeout(() => {
      setIsCodeCopyCodeScript(false);
    }, 1000);
  };

  const handleCloseScriptCode = () => {
    setIsOpenModalConfig(false);
  };

  const router = useRouter();

  const setDataUser = useSetRecoilState(templateInfo);
  const setTypeForm = useSetRecoilState(templateInfoType);

  const handleCustomize = () => {
    setTypeForm(projectIswithName ? "1" : "2");
    setDataUser(
      `?private_key=${privateKey}&project_id=${currentIdProject.trim()}`,
    );
    router.push("/playground");
  };

  const [isOpenAddMapDialog, setIsOpenAddMapDialog] = useState<boolean>(false);

  const [isOpenMapCreatedModal, setIsOpenMapCreatedModal] =
    useState<boolean>(false);

  const [mapLink, setMapLink] = useState<string>("");

  const { mutate: addMapMutation, isPending: isPendingAddMapMutation } =
    useAddMapMutation({
      idUser: user?.id || "",
      projectId: currentIdProject,
      link: mapLink,
      onSuccessCallBack: () => {
        setIsOpenAddMapDialog(false);
        refetchFunctionGetMap();
        setIsOpenMapCreatedModal(true);
      },
    });

  const handleAddMap = (e: FormEvent) => {
    e.preventDefault();
    addMapMutation();
  };

  const handleCopyCodeScriptMap = () => {
    setIsCodeCopyCodeScript(true);
    navigator.clipboard?.writeText(codeScriptMap || " ");
    setTimeout(() => {
      setIsCodeCopyCodeScript(false);
    }, 1000);
  };

  const handleCloseMapCreatedModal = () => {
    setIsOpenMapCreatedModal(false);
  };

  return (
    <>
      <MapCreationDialog
        isOpen={isOpenAddMapDialog}
        onClose={() => setIsOpenAddMapDialog(false)}
        mapLink={mapLink}
        setMapLink={setMapLink}
        onSubmit={handleAddMap}
        isLoading={isPendingAddMapMutation}
      />

      <CodeDisplayModal
        isOpen={isOpenModalConfig}
        onClose={handleCloseScriptCode}
        title="Copy this code and paste in your code"
        code={codeScript}
        onCopy={handleCopyCodeScript}
        isCodeCopy={isCodeCopyCodeScript}
        onCustomize={handleCustomize}
        showCustomizeButton={true}
      />

      <CodeDisplayModal
        isOpen={isOpenMapCreatedModal}
        onClose={handleCloseMapCreatedModal}
        title="Map Created Successfully"
        code={codeScriptMap}
        onCopy={handleCopyCodeScriptMap}
        isCodeCopy={isCodeCopyCodeScript}
        showCustomizeButton={false}
      />

      <ProjectCreationDialog
        isOpen={isOpenCreateProject}
        onClose={handleCloseDialogCreateProject}
        projectName={projectName}
        setProjectName={setProjectName}
        isCheckedFieldNameUser={isCheckedFieldNameUser}
        setIsCheckedFieldNameUser={setIsCheckedFieldNameUser}
        onSubmit={handleCreateProject}
        isLoading={mutationAddProject.isPending}
      />

      <ExportModal
        isOpen={isOpenExportModal}
        onClose={handleCloseModalExport}
        projectName={nameProjectActive}
        emails={filterTabEmails}
      />

      <EmailAdditionDialog
        isOpen={isOpenAddEmailDialog}
        onClose={handleCloseDialogAddEmail}
        projectName={nameProjectActive}
        projectIswithName={projectIswithName}
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
        name={name}
        setName={setName}
        onSubmit={handleAddEmailAddress}
        isLoading={mutationAddEmailAdress.isPending}
      />

      {allProjectsOneUser?.length === 0 ? (
        <EmptyState onCreateProject={handleShowDialogCreateProject} />
      ) : (
        <div className="flex flex-1 rounded-md p-2 h-full w-full justify-start items-start md:px-0 px-6 gap-4">
          <ProjectSidebar
            allProjectsOneUser={allProjectsOneUser}
            allProjectsOneUserLoading={allProjectsOneUserLoading}
            privateKey={privateKey}
            activeTabIndex={activeTabIndex}
            withMap={withMap}
            mapId={mapId}
            linkMap={linkMap}
            onCreateProject={handleShowDialogCreateProject}
            onRefreshProjects={allProjectsOneUserRefetch}
            onTabClick={handleTabClick}
          />

          <Tabs defaultValue="account" className=" w-full bg-transparent ">
            <TabsList className="bg-transparent border-b border-neutral-700 px-0 py-4 rounded-none  flex justify-start items-center">
              <TabsTrigger
                value="account"
                className="  py-2 border-b rounded-none data-[state=active]:border-white
      data-[state=active]:bg-transparent
     bg-transparent w-1/4"
              >
                Email
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="unset  border-b  rounded-none data-[state=active]:border-white
     data-[state=active]:bg-transparent  py-2 bg-transparent w-1/4"
              >
                Map
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              {!allProjectsOneUserLoading && allProjectsOneUser && (
                <div className="flex w-full rounded-lg m-0 border border-neutral-700/30 bg-neutral-900 p-3 justify-between items-start">
                  <h3 className="text-sm md:text-lg flex justify-start items-center h-8 gap-x-2 font-bold">
                    {nameProjectActive && (
                      <>
                        <span className="text-neutral-500 text-sm">
                          Project name
                        </span>
                        :{" " + nameProjectActive}
                        {!allProjectsOneUserLoading &&
                          allProjectsOneUser &&
                          allProjectsOneUser.length > 0 && (
                            <button
                              onClick={() => handleCopyCode()}
                              className="border my-1 cursor-pointer flex-shrink flex gap-x-2 hover:bg-neutral-900 transition-colors duration-300 ease justify-center items-center border-neutral-500/40 text-neutral-500 px-2 py-1 rounded-lg"
                            >
                              <span className="text-xs">ID of Project</span>
                              {isCodeCopy ? (
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
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              ) : (
                                <svg
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
                                </svg>
                              )}
                            </button>
                          )}
                      </>
                    )}
                  </h3>
                  <div className="flex justify-between gap-x-2 items-start m-0 p-0">
                    <div className="flex justify-start items-center gap-x-3">
                      {!allProjectsOneUserLoading &&
                        allProjectsOneUser &&
                        allProjectsOneUser.length > 0 && (
                          <>
                            <button
                              disabled={!idProjectActive?.length}
                              onClick={() =>
                                idProjectActive?.length &&
                                handleShowDialogAddEmail()
                              }
                              className="text-4xl bg-neutral-500/20 border border-neutral-700 px-2 py-2 rounded-md flex justify-center items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                            </button>
                            <button
                              disabled={!idProjectActive?.length}
                              onClick={() => allEmailsOneProjectRefetch()}
                              className="text-4xl bg-neutral-500/20 border border-neutral-700 px-2 py-2 rounded-md flex justify-center items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>
                            </button>
                            <button
                              disabled={!idProjectActive?.length}
                              onClick={handleOpenExportModal}
                              className="text-4xl bg-neutral-500/20 border border-neutral-700 px-2 py-2 rounded-md flex justify-center items-center"
                            >
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
                            </button>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full min-h-[90vh]   px-0 py-3 gap-2 flex overflow-auto flex-col  justify-start items-center">
                <div className="w-full   overflow-x-auto overflow-y-hidden lg:hidden  h-12 justify-start items-start flex gap-x-2">
                  <ul className="w-full flex  py-3 gap-x-3 justify-start items-start h-full ">
                    {allProjectsOneUserLoading && (
                      <div className="py-10 flex justify-center items-center">
                        <Loader />
                      </div>
                    )}

                    {!allProjectsOneUserLoading &&
                      filterTabProjects?.length === 0 && (
                        <div className="py-8">
                          <NoData />
                        </div>
                      )}

                    {!allProjectsOneUserLoading &&
                      filterTabProjects?.map((item: Project, index: number) => (
                        <ProjectItemMobile
                          name={item.name}
                          isActive={index === activeTabIndex}
                          onClick={() =>
                            handleTabClick(
                              index,
                              item.id,
                              item.name,
                              item.withName,
                            )
                          }
                          key={"p" + index}
                        />
                      ))}
                  </ul>
                  <ul className="w-full hidden lg:flex  py-3 gap-x-3 justify-center items-center ">
                    {allProjectsOneUserLoading && (
                      <div className="py-2 w-full h-full flex justify-center items-center">
                        {" "}
                        <SkeletonProject />
                      </div>
                    )}

                    {!allProjectsOneUserLoading &&
                      filterTabProjects?.length === 0 && (
                        <div className="py-8">
                          <NoData />
                        </div>
                      )}
                    {!allProjectsOneUserLoading &&
                      filterTabProjects?.map((item: Project, index: number) => (
                        <ProjectTabItem
                          project={item}
                          privateKey={privateKey || " "}
                          withName={item.withName}
                          withMap={(getMap && getMap?.length > 0) || false}
                          mapId={mapId}
                          linkMap={linkMap}
                          refetch={() => allProjectsOneUserRefetch()}
                          isActive={index === activeTabIndex}
                          className="bg-red-500"
                          onClick={() =>
                            handleTabClick(
                              index,
                              item.id,
                              item.name,
                              item.withName,
                            )
                          }
                          key={"p" + index}
                        />
                      ))}
                  </ul>
                </div>

                {allEmailsOneProjectLoading && (
                  <div className="py-3 flex justify-start w-full h-full items-start">
                    <SkeletonEmailLine />
                  </div>
                )}

                {!allEmailsOneProjectLoading &&
                  filterTabEmails?.length === 0 && (
                    <div className="w-full h-full flex justify-start items-start">
                      <NoData />
                    </div>
                  )}
                {!allEmailsOneProjectLoading &&
                  filterTabEmails?.length !== 0 && (
                    <>
                      <div className="flex justify-center h-auto  relative items-center w-full">
                        <TableData
                          project_Id={currentIdProject}
                          withName={projectIswithName}
                          refetchEmail={allEmailsOneProjectRefetch}
                          emailsList={allProjectsOneUser ? filterTabEmails : []}
                        />
                      </div>
                    </>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="password">
              <div className="w-full pt-1 flex justify-center items-center ">
                {isLoadingGetOneMap ? (
                  <SkeletonEmailLine />
                ) : getMap && getMap.length === 0 ? (
                  <button
                    onClick={() => setIsOpenAddMapDialog(true)}
                    className="px-3 py-2 rounded-lg bg-[#dbdbdb] border text-black flex justify-center
      items-center border-white hover:bg-black hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span className="text-sm">Add a Map</span>
                  </button>
                ) : (
                  <TableMap
                    mapsList={getMap || []}
                    project_Id={currentIdProject}
                    refetchMaps={refetchFunctionGetMap}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
