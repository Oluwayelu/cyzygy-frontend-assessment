"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useReactMutation } from "@/services/apiHelpers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAuthCookie } from "@/lib/utils";
import { SignInResponse } from "@/types/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useReactMutation<SignInResponse, FormSchema>(
    "/auth/login",
    "post"
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutate(values, {
      onSuccess: ({ data }) => {
        const role = data.data?.role;
        const token = data.data?.token;

        setAuthCookie(token, role);
        toast.success("Success", {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });

        const redirect = role === "admin" ? "/dashboard" : "/me";
        router.push(redirect);
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
    <div className="w-full p-5 h-dvh flex flex-col items-center justify-start md:justify-center space-y-5">
      <h1 className="text-2xl font-semibold">Cyzygy Assessment</h1>
      <div className="w-full md:w-1/3 p-4 bg-white shadow-xl rounded-xl">
        <h1 className="text-xl font-semibold">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="admin@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

