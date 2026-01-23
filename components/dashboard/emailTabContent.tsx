"use client";

import TableData from "@/components/table";
import NoData from "@/components/NoData";
import SkeletonEmailLine from "@/components/ui/skeletonEmailLine";
import ProjectItemMobile from "@/components/ui/ProjectItemMobile";
import ProjectTabItem from "@/components/ProjectTabItem";
import Loader from "@/components/Loader";
import SkeletonProject from "@/components/ui/skeletonProject";
import { Project, Email, EmailTabContentProps } from "@/lib/type";

export default function emailTabContent({
  allProjectsOneUser,
  allProjectsOneUserLoading,
  allEmailsOneProjectLoading,
  filterTabEmails,
  filterTabProjects,
  activeTabIndex,
  nameProjectActive,
  idProjectActive,
  privateKey,
  projectIswithName,
  currentIdProject,
  withMap,
  mapId,
  linkMap,
  onAddEmail,
  onRefreshEmails,
  onOpenExportModal,
  onCopyCode,
  isCodeCopy,
  onTabClick,
  onRefreshProjects,
}: EmailTabContentProps) {
  return (
    <>
      {!allProjectsOneUserLoading && allProjectsOneUser && (
        <div className="flex w-full rounded-lg m-0 border border-neutral-700/30 bg-neutral-900 p-3 justify-between items-start">
          <h3 className="text-sm md:text-lg flex justify-start items-center h-8 gap-x-2 font-bold">
            {nameProjectActive && (
              <>
                <span className="text-neutral-500 text-sm">Project name</span>:{" "}
                {nameProjectActive}
                {!allProjectsOneUserLoading &&
                  allProjectsOneUser &&
                  allProjectsOneUser.length > 0 && (
                    <button
                      onClick={onCopyCode}
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
                      onClick={() => idProjectActive?.length && onAddEmail()}
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
                      onClick={() =>
                        allEmailsOneProjectLoading || onRefreshEmails()
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
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </button>
                    <button
                      disabled={!idProjectActive?.length}
                      onClick={onOpenExportModal}
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
                        />
                      </svg>
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-[90vh] px-0 py-3 gap-2 flex overflow-auto flex-col justify-start items-center">
        <div className="w-full overflow-x-auto overflow-y-hidden lg:hidden h-12 justify-start items-start flex gap-x-2">
          <ul className="w-full flex py-3 gap-x-3 justify-start items-start h-full">
            {allProjectsOneUserLoading && (
              <div className="py-10 flex justify-center items-center">
                <Loader />
              </div>
            )}

            {!allProjectsOneUserLoading && filterTabProjects?.length === 0 && (
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
                    onTabClick(index, item.id, item.name, item.withName)
                  }
                  key={"p" + index}
                />
              ))}
          </ul>
          <ul className="w-full hidden lg:flex py-3 gap-x-3 justify-center items-center">
            {allProjectsOneUserLoading && (
              <div className="py-2 w-full h-full flex justify-center items-center">
                <SkeletonProject />
              </div>
            )}

            {!allProjectsOneUserLoading && filterTabProjects?.length === 0 && (
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
                  withMap={withMap}
                  mapId={mapId}
                  linkMap={linkMap}
                  refetch={onRefreshProjects}
                  isActive={index === activeTabIndex}
                  className="bg-red-500"
                  onClick={() =>
                    onTabClick(index, item.id, item.name, item.withName)
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

        {!allEmailsOneProjectLoading && filterTabEmails?.length === 0 && (
          <div className="w-full h-full flex justify-start items-start">
            <NoData />
          </div>
        )}
        {!allEmailsOneProjectLoading && filterTabEmails?.length !== 0 && (
          <>
            <div className="flex justify-center h-auto relative items-center w-full">
              <TableData
                project_Id={currentIdProject}
                withName={projectIswithName}
                refetchEmail={onRefreshEmails}
                emailsList={allProjectsOneUser ? filterTabEmails : []}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
