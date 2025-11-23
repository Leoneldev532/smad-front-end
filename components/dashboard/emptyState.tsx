"use client";

import { Button } from "@/components/ui/button";
import { EmptyStateProps } from "@/lib/type";

export default function EmptyState({ onCreateProject }: EmptyStateProps) {
  return (
    <div className="w-full px-0 py-3 gap-2 text-balance flex overflow-auto flex-col min-h-72 justify-center items-center">
      <div className="flex flex-col gap-y-4 justify-center items-center max-w-sm text-center">
        <h2 className="font-extrabold text-3xl">
          Begin with your first project now{" "}
        </h2>
        <span className="text-neutral-400">
          Get the ID project and your private key available on page account &
          billing{" "}
        </span>
        <Button
          onClick={onCreateProject}
          className="px-4 py-2 rounded-lg bg-[#dbdbdb] border border-white hover:bg-black hover:text-white"
        >
          <b className="text-2xl">+</b> <span>Create a project </span>{" "}
        </Button>
      </div>
    </div>
  );
}
