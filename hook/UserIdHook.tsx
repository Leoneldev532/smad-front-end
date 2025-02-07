import React, { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/lib/atom';
import Loader2 from '@/components/Loader2';
import Loader from '@/components/Loader';

interface UserInfoProviderProps {
    children: ReactNode;
}

const UserInfoProvider: React.FC<UserInfoProviderProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { data: session, status } = useSession() as any;

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setUserInfo({ id: session.user.id as any, name: session.user.name as any });
            // console.log("Session chargée et infos utilisateur définies :", { id: session.user.id, name: session.user.name });
        } else if (status === 'unauthenticated') {
            setUserInfo({ id: null, name: null });
            // console.log("Utilisateur déconnecté, infos utilisateur réinitialisées");
        } else {
            // console.log("Statut de la session :", status, "Données de la session :", session);  // Débogage
        }
    }, [session, status, setUserInfo]);

    if (status === 'loading') {
        return <Loader/>;
    }

    return <>{children}</>;
};

export default UserInfoProvider;
