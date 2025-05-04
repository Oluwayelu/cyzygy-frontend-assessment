"use client";
import { redirect } from "next/navigation";
import { deleteCookie } from "cookies-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  userData?: IUser | null;
};

const Navbar = ({ userData }: Props) => {
  const logout = () => {
    deleteCookie("token");
    deleteCookie("role");
    redirect("/");
  };
  console.log("Uesr : ", userData);
  return (
    <div className="w-full p-5 max-w-5xl mx-auto flex items-center justify-between">
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
