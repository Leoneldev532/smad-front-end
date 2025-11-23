"use client";

import TableMap from "@/components/ui/tabMap";
import SkeletonEmailLine from "@/components/ui/skeletonEmailLine";
import { Map, MapTabContentProps } from "@/lib/type";

export default function mapTabContent({
  getMap,
  isLoadingGetOneMap,
  currentIdProject,
  onAddMap,
  onRefreshMaps,
}: MapTabContentProps) {
  return (
    <div className="w-full pt-1 flex justify-center items-center">
      {isLoadingGetOneMap ? (
        <SkeletonEmailLine />
      ) : getMap && getMap.length === 0 ? (
        <button
          onClick={onAddMap}
          className="px-3 py-2 rounded-lg bg-[#dbdbdb] border text-black flex justify-center items-center border-white hover:bg-black hover:text-white"
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
          refetchMaps={onRefreshMaps}
        />
      )}
    </div>
  );
}
