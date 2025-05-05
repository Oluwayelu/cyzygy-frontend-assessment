"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useReactQueryData } from "@/services/apiHelpers";
import { IUser } from "@/types/api";

const MePage = () => {
  const cachedUser = useReactQueryData<IUser>("auth-user");

  return (
    <div className="w-full">
      {cachedUser && cachedUser.data ? (
        <div className="w-full space-y-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={cachedUser.data.data!.profilePhoto} />
            <AvatarFallback>
              {cachedUser.data.data!.name.split(" ")[0][0] +
                cachedUser.data.data!.name.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">
              {cachedUser.data.data!.name}
            </h1>
            <p>{cachedUser.data.data!.email}</p>
          </div>
        </div>
      ) : (
        <div>
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default MePage;
