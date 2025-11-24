import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Email } from "@/lib/type";
import { Checkbox } from "./ui/checkbox";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

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
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteEmail, updateEmail } from "@/hook/query";
import { toast } from "sonner";
import { Input } from "./ui/input";
import Loader from "./loader";
import { useGetUserInfo } from "@/lib/utils";
import ButtonValidation from "./buttonValidation";
import time from "./time";
import EmailsTodayChart from "./chart";
/* eslint-disable semi */

const TableData = ({
  emailsList,
  project_Id,
  withName,
  refetchEmail,
}: {
  emailsList: Email[] | [] | undefined;
  withName: boolean;
  project_Id: string;
  refetchEmail: () => void;
}) => {
  const [selectedIdArray, setSelectedIdArray] = useState<string[]>([]);

  const handleSelected = (status: CheckedState, id: string) => {
    if (status) {
      setSelectedIdArray((prev) => {
        if (!prev.includes(id)) {
          return [...prev, id];
        }
        return prev;
      });
    } else {
      if (selectedIdArray.includes(id)) {
        let newTab = selectedIdArray.filter((elem) => elem !== id);
        setSelectedIdArray(newTab);
      }
    }
  };

  const [checkAllActived, setCheckAllActivated] = useState<boolean>(false);

  const handleCheckedAll = (status: CheckedState) => {
    if (status) {
      emailsList?.forEach((email) => {
        handleSelected(true, email.id);
      });

      setCheckAllActivated(true);
    } else {
      setSelectedIdArray([]);

      setCheckAllActivated(false);
    }
  };

  useEffect(() => {
    setSelectedIdArray([]);
  }, [emailsList]);

  const { user } = useGetUserInfo();

  const [isOpenDialogDeleteEmail, setisOpenDialogDeleteEmail] =
    useState<boolean>(false);
  const [idEmailSelected, setIdEmailSelected] = useState<string>("");

  const handleShowModalDeleteEmail = () => {
    setisOpenDialogDeleteEmail(true);
  };

  const handleCloseModalDeleteEmail = () => {
    setisOpenDialogDeleteEmail(false);
  };

  const mutationDeleteEmailOneProject = useMutation({
    mutationFn: (emailId: string) =>
      deleteEmail(user?.id || " ", project_Id, emailId),
    onSuccess: () => {
      toast.success("Opération de suppression réussie");
      handleCloseModalDeleteEmail();
      refetchEmail();
    },
    onError: (err) => {
      toast.error("Une erreur est survenue" + err);
    },
  });

  const [isUpdateEmail, setIsUpdateEmail] = useState<boolean>(false);
  const [emailUpdateValue, setEmailUpdateValue] = useState<string>(" ");
  const [emailIdUpdateValue, setEmailIdUpdateValue] = useState<string>(" ");

  const handleUpdateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailUpdateValue(e.target.value);
  };

  const mutationUpdateEmailOneProject = useMutation({
    mutationFn: (emailId: string) =>
      updateEmail(user?.id || " ", project_Id, emailId, emailUpdateValue),
    onSuccess: () => {
      toast.success("Opération de modification réussie");
      refetchEmail();
      setIsUpdateEmail(false);
    },
    onError: (err) => {
      toast.error("Une erreur est survenue" + err);
    },
  });

  const handleValidateEmail = (emailId: string) => {
    mutationUpdateEmailOneProject.mutate(emailId);
  };

  const handleDeleteEmail = (emailId: string) => {
    mutationDeleteEmailOneProject.mutate(emailId);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current?.contains(event.target as any)) {
      setIsUpdateEmail(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedEmailsList = emailsList
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <>
      <AlertDialog open={isOpenDialogDeleteEmail}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              emails of project with him.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="ghost"
              onClick={() => handleCloseModalDeleteEmail()}
            >
              Cancel
            </Button>
            <ButtonValidation
              title={"delete"}
              isLoading={mutationDeleteEmailOneProject?.isPending}
              typeButton="button"
              type="negative"
              onClick={() => handleDeleteEmail(idEmailSelected)}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table className="border rounded-md overflow-hidden  relative">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 flex gap-x-3  justify-start items-center">
              <Checkbox
                checked={
                  selectedIdArray.length === emailsList?.length &&
                  checkAllActived
                }
                onCheckedChange={(status) => handleCheckedAll(status)}
                key={"all"}
                id="terms"
              />
              <span>Select</span>
            </TableHead>
            <TableHead className={`w-1/3 ${!withName && "hidden"}`}>
              {withName && "Name"}
            </TableHead>
            <TableHead className="w-1/2 ">Email</TableHead>
            <TableHead className="w-1/2">Date</TableHead>
            <TableHead className="w-1/2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto ">
          {sortedEmailsList?.map((email) => {
            console.log("email.createdAt type:", typeof email?.createdAt, "value:", email?.createdAt);
            return (
              <TableRow key={email.id} className="py-0 h-8 w-full max-h-8">
              <TableCell className="font-medium w-1/6">
                <Checkbox
                  checked={selectedIdArray.includes(email.id)}
                  onCheckedChange={(status) => handleSelected(status, email.id)}
                  key={email?.id}
                  id="terms"
                />
              </TableCell>
              <TableCell
                className={`font-medium ${!withName && "hidden"} w-1/6`}
              >
                {withName && <span>{email?.name}</span>}
              </TableCell>
              <TableCell className="font-medium w-full flex justify-start gap-4 items-center">
                {isUpdateEmail ? (
                  emailIdUpdateValue === email.id ? (
                    <Input
                      type="text"
                      className="w-full min-w-72 "
                      disabled={mutationUpdateEmailOneProject.isPending}
                      ref={inputRef}
                      value={emailUpdateValue}
                      onChange={(e) => handleUpdateEmail(e)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleValidateEmail(email.id);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col w-full">
                      <span>{email.email}</span>
                      <div className="flex w-full text-xs text-neutral-500">
                        <span>{email?.country}</span>
                        <span>{" - " + email?.referrer}</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col  w-full">
                    <span>{email.email}</span>
                    <div className="flex text-xs w-full text-neutral-500">
                      <span>{email?.country}</span>
                      <span>{" - " + email?.referrer}</span>
                    </div>
                  </div>
                )}

                <div className="w-6 h-6 flex justify-center items-center">
                  {emailIdUpdateValue === email.id &&
                    mutationUpdateEmailOneProject?.isPending && (
                      <Loader height="6" width="6" />
                    )}
                </div>
              </TableCell>
              <TableCell className={"font-medium  w-1/6"}>
                <span>
                  <time dateTime={new Date(email?.createdAt).toLocaleDateString()}>
                    {new Date(email?.createdAt).toLocaleDateString()}
                  </time>
                </span>
              </TableCell>
              <TableCell className="font-medium w-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8   w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-neutral-900">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigator.clipboard.writeText(email.email)}
                    >
                      Copy email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setEmailUpdateValue(email?.email);
                        setEmailIdUpdateValue(email?.id);
                        setIsUpdateEmail(true);
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setIdEmailSelected(email.id);
                        handleShowModalDeleteEmail();
                      }}
                    >
                      delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
        <TableFooter className=" w-full">
          <TableRow className="bg-neutral-700/30   w-full hover:bg-neutral-700/30">
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell colSpan={1}></TableCell>
            <TableCell
              className={`${!withName && "hidden"}`}
              colSpan={1}
            ></TableCell>
            <TableCell></TableCell>
            <TableCell className=" flex w-full gap-x-2 ">
              <span className="w-full ">{emailsList?.length} row(s)</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableData;
