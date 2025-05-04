"use client";
import { useState } from "react";

import { IUser } from "@/types/api";
import AddUser from "@/components/AddUser";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useReactQuery, useReactQueryData } from "@/services/apiHelpers";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const cachedUser = useReactQueryData<IUser>("auth-user");
  const { data: userData, isPending: loading } = useReactQuery<IUser[]>(
    "users",
    "/user"
  );
  console.log("Caxhsdj: ", cachedUser);

  return (
    <div className="w-full space-y-5">
      <div className="w-full flex items-center justify-between">
        <h1>
          👋 Welcome back,{" "}
          <span className="font-semibold">
            {cachedUser?.data?.data?.name ?? ""}
          </span>
        </h1>
        <Button onClick={() => setOpen((prev) => !prev)}>Add User</Button>
      </div>
      <AddUser open={open} setOpen={setOpen} />
      {!loading && userData?.data ? (
        <DataTable data={userData.data.data || []} />
      ) : (
        <div>
          <Skeleton className="w-full h-[60dvh] mt-5 rounded-md" />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
