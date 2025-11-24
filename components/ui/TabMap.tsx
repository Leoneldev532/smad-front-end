import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import time from "../time";
import { useGetUserInfo } from "@/lib/utils";
import { useDeleteMapMutation, useUpdateMapMutation } from "@/hook/query";
import { Input } from "../ui/input";
import Loader from "../loader";
import { MapResponse, Map, Project } from "@/lib/type";
/* eslint-disable semi */

const TableMap = ({
  mapsList,
  project_Id,
  refetchMaps,
}: {
  mapsList: Map[];
  project_Id: string;
  refetchMaps: () => void;
}) => {
  const [selectedIdArray, setSelectedIdArray] = useState<string[]>([]);
  const [checkAllActived, setCheckAllActivated] = useState<boolean>(false);
  const { user } = useGetUserInfo();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);

  // States for modification
  const [isUpdateLink, setIsUpdateLink] = useState<boolean>(false);
  const [linkUpdateValue, setLinkUpdateValue] = useState<string>("");
  const [linkIdUpdateValue, setLinkIdUpdateValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Handling individual selection
  const handleSelected = (status: CheckedState, id: string) => {
    if (status) {
      setSelectedIdArray((prev) => (!prev.includes(id) ? [...prev, id] : prev));
    } else {
      setSelectedIdArray(selectedIdArray.filter((elem) => elem !== id));
    }
  };

  // Handling selection of all elements
  const handleCheckedAll = (status: CheckedState) => {
    if (status) {
      mapsList?.forEach((map) => handleSelected(true, map.id));
      setCheckAllActivated(true);
    } else {
      setSelectedIdArray([]);
      setCheckAllActivated(false);
    }
  };

  // Reset selection when the list changes
  useEffect(() => {
    setSelectedIdArray([]);
  }, [mapsList]);

  // Mutation to delete a map
  const mutationDeleteMap = useDeleteMapMutation({
    idUser: String(user?.id),
    projectId: project_Id,
    mapId: selectedMapId || "",
  });

  type UpdateMapData = MapResponse; // Adjust this type if `updateMap` returns a different type
  type UpdateMapError = { message: string }; // Adjust this type if the error structure is different
  type UpdateMapVariables = void; // Adjust this type if `updateMap` takes arguments

  const { mutateAsync: updateMap } = useUpdateMapMutation({
    idUser: String(user?.id),
    projectId: project_Id,
    link: linkUpdateValue,
    mapId: linkIdUpdateValue,
    onSuccessCallBack: () => {
      refetchMaps();
      setIsUpdateLink(false);
    },
  });

  const mutationUpdateMap = useMutation<UpdateMapData, UpdateMapError, string>({
    mutationFn: () => updateMap(),
    onError: (err) => {
      toast.error("Erreur lors de la mise à jour: " + err.message);
    },
  });

  const handleShowDialogDelete = (mapId: string) => {
    setSelectedMapId(mapId);
    setIsOpenDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setIsOpenDelete(false);
    setSelectedMapId(null);
  };

  const handleDelete = () => {
    if (selectedMapId) {
      mutationDeleteMap.mutate(undefined, {
        onSuccess: () => {
          handleCloseDialogDelete();
          refetchMaps();
          toast.success("Map supprimée avec succès");
        },
      });
    }
  };

  // Handling modification
  const handleUpdateLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkUpdateValue(e.target.value);
  };

  const handleValidateLink = (mapId: string) => {
    mutationUpdateMap.mutate(mapId);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsUpdateLink(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedMapsList = mapsList
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <>
      <AlertDialog open={isOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the map
              from the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleCloseDialogDelete}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={mutationDeleteMap.isPending}
            >
              {mutationDeleteMap.isPending ? "Deleting..." : "Confirm"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table className="border rounded-md overflow-hidden relative">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 flex gap-x-3 justify-start items-center">
              <Checkbox
                checked={
                  selectedIdArray.length === mapsList?.length && checkAllActived
                }
                onCheckedChange={handleCheckedAll}
                id="terms-all"
              />
              <span>Select</span>
            </TableHead>
            <TableHead className="w-2/3">Link</TableHead>
            <TableHead className="w-1/2">Date</TableHead>
            <TableHead className="w-1/2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {sortedMapsList?.map((map) => {
            console.log("map.createdAt type:", typeof map?.createdAt, "value:", map?.createdAt);
            return (
            <TableRow key={map.id} className="py-0 h-8 w-full max-h-8">
              <TableCell className="font-medium w-1/6">
                <Checkbox
                  checked={selectedIdArray.includes(map.id)}
                  onCheckedChange={(status) => handleSelected(status, map.id)}
                  id={`terms-${map.id}`}
                />
              </TableCell>
              <TableCell className="font-medium w-2/3 flex items-center gap-2">
                {isUpdateLink && linkIdUpdateValue === map.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <Input
                      type="text"
                      className="w-full min-w-[200px]"
                      disabled={mutationUpdateMap.isPending}
                      ref={inputRef}
                      value={linkUpdateValue}
                      onChange={handleUpdateLink}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleValidateLink(map.id);
                        }
                      }}
                    />
                    {mutationUpdateMap.isPending && (
                      <Loader height="6" width="6" />
                    )}
                  </div>
                ) : (
                  <a
                    href={map.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-words max-w-[200px] overflow-hidden"
                  >
                    {map.link}
                  </a>
                )}
              </TableCell>
              <TableCell className="font-medium w-1/2">
                <time dateTime={new Date(map.createdAt).toLocaleDateString()} >
  {new Date(map?.createdAt).toLocaleDateString()}
                </time>
              </TableCell>
              <TableCell className="font-medium w-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-neutral-900">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigator.clipboard.writeText(map.link)}
                    >
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setLinkUpdateValue(map.link);
                        setLinkIdUpdateValue(map.id);
                        setIsUpdateLink(true);
                      }}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-500"
                      onClick={() => handleShowDialogDelete(map.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="bg-neutral-700/30 w-full hover:bg-neutral-700/30">
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell colSpan={2}></TableCell>
            <TableCell className="flex w-full gap-x-2">
              <span className="w-full">{mapsList?.length} item(s)</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableMap;
