"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useReactQuery } from "@/services/apiHelpers";
import { IUser } from "@/types/api";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data, isLoading } = useReactQuery<IUser>("auth-user", "/auth");

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full min-h-dvh">
      <Navbar userData={data?.data.data} />
      <div className="w-full p-5 max-w-5xl mx-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
