"use client";
import Loader from "@/components/loader";
import { useGetAllUserInfo } from "@/hook/query";
import { userInfoState } from "@/lib/atom";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const Page = () => {
  const user = useRecoilValue(userInfoState);

  const { data: getAllUserInfo, isLoading: getAllUserInfoIsLoading } =
    useGetAllUserInfo(user?.id);

  const [privateKey, setprivateKey] = useState<string>();

  useEffect(() => {
    setprivateKey(getAllUserInfo?.privateKey?.key);
  }, [getAllUserInfo]);

  const [isCodeCopy, setIsCodeCopy] = useState(false);

  const handleCopyCode = () => {
    setIsCodeCopy(true);
    navigator.clipboard?.writeText(privateKey || " ");
    setTimeout(() => {
      setIsCodeCopy(false);
    }, 1000);
  };

  const firstPart = privateKey?.substring(0, 7);
  const secondPart = privateKey?.substring(20, 27);

  return (
    <div className="flex justify-center flex-col py-16 items-center w-full h-full ">
      {getAllUserInfoIsLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col justify-center  w-full h-full items-center">
            <div className="bg-white h-24 w-24  rounded-full overflow-hidden flex justify-center items-center">
              <Image
                alt={"avatar"}
                width="300"
                height="500"
                className="object-contain h-24 w-24 rounded-full "
                src={`https://api.dicebear.com/9.x/lorelei/png?seed=${user?.name}`}
              />
            </div>
            <h2 className="py-2">
              Your Account : <b>{user?.name}</b>{" "}
            </h2>

            <div className="flex flex-col  justify-center items-center  gap-x-2">
              <h3> your private key api </h3>

              <div className="flex justify-center py-2 items-center gap-x-2">
                <div className="border rounded-md px-3 py-1  flex justify-center items-center">
                  <span>{firstPart}</span>
                  <span
                    className="pt-2 font-extrabold
                       "
                  >
                    **************
                  </span>
                  <span>{`${secondPart}`}</span>
                </div>
                {isCodeCopy ? (
                  <button
                    onClick={() => handleCopyCode()}
                    className="p-3 flex hover:bg-neutral-900 justify-center  border items-center rounded-md "
                  >
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
                  </button>
                ) : (
                  <button
                    onClick={() => handleCopyCode()}
                    className="p-3 hover:bg-neutral-900 flex justify-center  border items-center rounded-md "
                  >
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
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
