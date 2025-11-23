"use client";

import ProjectTabItem from "@/components/projectTabItem";
import NoData from "@/components/noData";
import SkeletonProject from "@/components/ui/skeletonProject";
import { Project, ProjectSidebarProps } from "@/lib/type";

export default function ProjectSidebar({
  allProjectsOneUser,
  allProjectsOneUserLoading,
  privateKey,
  activeTabIndex,
  withMap,
  mapId,
  linkMap,
  onCreateProject,
  onRefreshProjects,
  onTabClick,
}: ProjectSidebarProps) {
  return (
    <div className="w-1/3 lg:flex hidden h-auto overflow-y-auto rounded-md px-2 py-2 flex-col justify-start items-start">
      <div className="flex flex-col w-full justify-start items-start gap-y-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl w-full font-bold">Yours projects</h3>
          <div className="flex gap-x-2 justify-start items-center">
            <button
              onClick={onCreateProject}
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
              onClick={onRefreshProjects}
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
          </div>
        </div>
      </div>

      <ul className="w-full flex flex-col py-3 gap-y-3 justify-center items-center">
        {allProjectsOneUserLoading && (
          <div className="py-0 w-full h-full flex justify-center items-center">
            <SkeletonProject />
          </div>
        )}

        {!allProjectsOneUserLoading && allProjectsOneUser?.length === 0 && (
          <div className="py-1 md:py-1 w-full">
            <NoData />
          </div>
        )}
        {!allProjectsOneUserLoading &&
          allProjectsOneUser?.map((item: Project, index: number) => (
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
  );
}
