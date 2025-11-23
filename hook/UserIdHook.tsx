import React, { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/lib/atom";
import Loader2 from "@/components/loader2";
import Loader from "@/components/loader";
import { UserInfoProviderProps } from "@/lib/type";

const UserInfoProvider: React.FC<UserInfoProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { data: session, status } = useSession() as any;

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserInfo({
        id: session.user.id as any,
        name: session.user.name as any,
      });
    } else if (status === "unauthenticated") {
      setUserInfo({ id: null, name: null });
    } else {
    }
  }, [session, status, setUserInfo]);

  if (status === "loading") {
    return <Loader />;
  }

  return <>{children}</>;
};

export default UserInfoProvider;
