"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  userData?: IUser | null;
};

const Navbar = ({ userData }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Logout function to clear cookies and invalidate the auth-user query
  const logout = async () => {
    deleteCookie("token");
    deleteCookie("role");
    await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    await queryClient.refetchQueries({ queryKey: ["auth-user"] });
    router.push("/");
  };

  return (
    <div className="w-full p-5 max-w-5xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold">
        Cyzygy
      </Link>

      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userData.profilePhoto} />
              <AvatarFallback>
                {userData.name.split(" ")[0][0] +
                  userData.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Navbar;
