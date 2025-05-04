import React, { useEffect } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { IUser } from "@/types/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useReactMutation, useReactQuery } from "@/services/apiHelpers";

type Props = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});
type FormSchema = z.infer<typeof formSchema>;

const UpdateUser = ({ id, open, setOpen }: Props) => {
  const queryClient = useQueryClient();
  const { data } = useReactQuery<IUser>(`user-${id}`, `/user/${id}`);
  const { mutate, isPending } = useReactMutation<IUser, FormData>(
    `/user/${id}`,
    "put"
  );
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [profilePhoto, setProfilePhoto] = React.useState<File | null>(null);

  useEffect(() => {
    if (data?.data && data?.data.data) {
      form.reset({
        firstName: data?.data.data.name.split(" ")[0],
        lastName: data?.data.data.name.split(" ")[1],
        email: data?.data.data.email,
        role: data?.data.data.role,
      });
    }
  }, [data, form, form.reset]);

  const onSubmit = (values: FormSchema) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("role", values.role);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto); // Add the file to FormData
    }

    mutate(formData, {
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
          <DialogTitle>Update user</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="w-full flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>
                  Profile Photo{" "}
                  <span className="text-gray-400">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfilePhoto(e.target.files[0]); // Store the selected file
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <Button type="submit">
                {isPending ? "Updating...." : "Update user"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
