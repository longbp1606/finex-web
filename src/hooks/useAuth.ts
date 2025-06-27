import { getProfile, ProfileType } from "@/services/authAPI";
import cookieUtils from "@/services/cookieUtils";
import { useCallback, useEffect, useState } from "react";

type JwtType = {
    iat: number;
    exp: number;
    iss: string;
    sub: string;
}

const getAccountID = () => {
    const decoded = cookieUtils.decodeJwt() as JwtType;
    if (!decoded || !decoded.sub) return null;

    return decoded.sub;
}

const useAuth = () => {
    const [AccountID, setAccountID] = useState<string | null>(getAccountID());
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<ProfileType>();

    const token = cookieUtils.getToken();

    const checkTokenExpiration = useCallback(() => {
        if (token) {
            const decoded = cookieUtils.decodeJwt() as JwtType;

            if (!decoded || decoded.exp < Date.now() / 1000) {
                cookieUtils.clear();
                return;
            }
        }
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data.data);
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        const token = cookieUtils.getToken();

        if (!token) {
            return;
        }

        try {
            setLoading(true);

            setAccountID(getAccountID());

            fetchProfile();
        } finally {
            setLoading(false);
        }

        const interval = setInterval(checkTokenExpiration, 1000);

        return () => clearInterval(interval);
    }, [checkTokenExpiration]);

    return { AccountID, loading, profile };
}

export default useAuth;