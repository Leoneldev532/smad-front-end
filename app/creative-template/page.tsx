"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useGetDevelopers } from "@/hook/query";
import { Developer } from "@/lib/type";
import { CONTRIBUTE_URL } from "@/lib/constants";

const DeveloperCard: React.FC<Developer> = ({
  developerName,
  templatename,
  portfolioLink,
  githubRepo,
  pageLink,
  image,
  languagesAndFrameworks,
}) => {
  return (
    <div className="card p-2 rounded-xl shadow  bg-neutral-600/20">
      <div className="w-full overflow-hidden rounded-xl border">
        <Image
          src={image}
          height={200}
          width={300}
          alt={`${templatename}'s image`}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <h4 className="text-lg  mt-2 flex ">
          <span className="font-bold">{templatename}</span>
        </h4>
      </div>

      <Link
        href={portfolioLink}
        target="_blank"
        className="text-neutral-400 mt-2 hover:underline underline-offset-2  py-1  text-sm "
      >
        <span className="">{developerName}</span>
        <span rel="noopener noreferrer">{" > Visit portfolio"}</span>
      </Link>

      <br />

      <Link
        href={githubRepo}
        target="_blank"
        className="text-neutral-400 mt-2 hover:underline underline-offset-2  py-1  text-sm "
      >
        <span className="">Repo Github</span>
        <span rel="noopener noreferrer">{" > Visit "}</span>
      </Link>

      <br />

      <Link
        href={pageLink}
        target="_blank"
        className="text-neutral-400 mt-2 hover:underline  underline-offset-2  py-1  text-sm "
      >
        <span className="">preview</span>
        <span rel="noopener noreferrer">{" > Link of page"}</span>
      </Link>

      <ul className="mt-2 flex flex-wrap gap-x-2 pt-6">
        {languagesAndFrameworks.map((tech, index) => (
          <li
            key={index}
            className="text-gray-400 px-3 border rounded-lg py-1 text-sm"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const fetchCache = "force-no-store";

const DeveloperGrid: React.FC = () => {
  const {
    data: developersData,
    isLoading: loading,
    error,
  } = useGetDevelopers();
  const developers = developersData?.developers || [];

  if (loading)
    return (
      <div>
        <div className="py-10 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  if (error) return <div>Error loading developers form</div>;

  const activeDevelopers = developers.filter((developer) => developer.isActive);

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <h2 className="text-2xl md:text-4xl pt-8 md:pt-0 text-center wb-gradient">
        Creative Page Forms Waitlist
      </h2>
      <span className="text-neutral-600 text-center">
        {" "}
        Copy page code and paste in your project{" "}
      </span>

      <Link
        className="text-neutral-300 underline underline-offset-1"
        href={CONTRIBUTE_URL}
      >
        Contribute here{" "}
      </Link>

      {activeDevelopers.length === 0 && (
        <div className="px-36 w-full  flex justify-center items-center">
          <div className="text-center px-4 py-2 rounded-xl border border-neutral-800">
            No page forms found
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 w-full py-8 md:px-0 px-8 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeDevelopers.map((developer) => (
          <DeveloperCard key={developer.id} {...developer} />
        ))}
      </div>
    </div>
  );
};

export default DeveloperGrid;
