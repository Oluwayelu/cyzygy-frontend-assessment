import React from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IUser } from "@/types/api";
import { Button } from "@/components/ui/button";
import { useReactMutation } from "@/services/apiHelpers";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteUser = ({ id, open, setOpen }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useReactMutation<IUser, null>(
    `/user/${id}`,
    "delete"
  );

  const deleteUser = () => {
    mutate(null, {
      onSuccess: ({ data }) => {
        toast.success("Success", { description: data.message });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setOpen(false);
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!";

        toast.error("An error occured", {
          description: errorMessage,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            Are you sure you want to delete this user. This action cannot be
            reversed.
          </p>
          <div className="flex items-center gap-3">
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={deleteUser} className="bg-red-500">
              {isPending ? "Deleting...." : "Delete user"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
