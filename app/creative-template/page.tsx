"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/components/Loader';

interface Developer {
  id: string;
  developerName: string;
  portfolioLink: string;
  image: string;
  languagesAndFrameworks: string[];
  pageLink: string;
  isActive: boolean;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperCard: React.FC<Developer> = ({
  developerName,
  portfolioLink,
  image,
  languagesAndFrameworks,
  code
}) => {
  const [isCodeCopy, setIsCodeCopy] = useState(false);

  const handleCopyCode = (code: string) => {
    setIsCodeCopy(true);
    navigator.clipboard?.writeText(code || " ");
    setTimeout(() => {
      setIsCodeCopy(false);
    }, 1000);
  };

  return (
    <div className="card p-2 rounded-xl shadow bg-neutral-600/20">
      <div className="w-full overflow-hidden rounded-xl border">
        <Image src={image} height={200} width={300} alt={`${developerName}'s image`} className="w-full h-48 object-cover rounded-lg" />
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <h2 className="text-xl font-bold mt-2">{developerName}</h2>

        {isCodeCopy ? (
          <button onClick={() => handleCopyCode(code)} className="p-3 flex hover:bg-neutral-900 justify-center border items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-slate-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>
        ) : (
          <button onClick={() => handleCopyCode(code)} className="p-3 hover:bg-neutral-900 flex justify-center border items-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-slate-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
          </button>
        )}
      </div>
      <Link href={portfolioLink} target="_blank" rel="noopener noreferrer"
       className="text-neutral-400 underline underline-offset-1 text-sm">Visit portfolio</Link>
      <ul className="mt-2 flex flex-wrap gap-x-2 pt-6">
        {languagesAndFrameworks.map((tech, index) => (
          <li key={index} className="text-gray-400 px-3 border rounded-lg py-1 text-sm">{tech}</li>
        ))}
      </ul>
    </div>
  );
};

const DeveloperGrid: React.FC = () => {
  const { isLoading, error, data: developers } = useQuery<{ developers: Developer[] }, Error>({
    queryKey: ['developers'],
    queryFn: async () => {
      const response = await axios.get('/api/developerForm',{
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      return response.data;
    },
    gcTime:5* 60 * 1000,
    // staleTime: Infinity,
  });

  if (isLoading) return <div><div className="py-10 flex justify-center items-center"><Loader /></div></div>;
  if (error) return <div>Error loading developers</div>;

  const activeDevelopers = developers?.developers?.filter(developer => developer.isActive) || [];

  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <h2 className="text-2xl md:text-4xl pt-8 md:pt-0 text-center wb-gradient">Creative Page Forms Waitlist</h2>
      <span className="text-neutral-600 text-center"> Copy page code and paste in your project </span>

      <Link className="text-neutral-300 underline underline-offset-1" href="https://contribute.smadmail.com"  >Contribute here </Link>

      {activeDevelopers.length === 0 && <div className="px-36 w-full  flex justify-center items-center">
        <div className="text-center px-4 py-2 rounded-xl border border-neutral-800">No page forms found</div></div>}
      <div className="grid grid-cols-1 w-full py-8 md:px-0 px-8 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeDevelopers.map(developer => (
          <DeveloperCard key={developer.id} {...developer} />
        ))}
      </div>
    </div>
  );
};

export default DeveloperGrid;
