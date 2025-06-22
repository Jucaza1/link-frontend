import { useState, PropsWithChildren, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UserInfo } from "../types/state";

export function UserContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState(null as UserInfo | null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userString = localStorage.getItem("user");
            let userInfo: UserInfo | undefined
            if (userString) {
                try {
                    userInfo = JSON.parse(userString)
                } catch (e: unknown) {
                    console.error("error parsing user from localStore", e)
                }
            }
            if (userInfo != undefined) {
                setUser(userInfo)
                setLoggedIn(true)
                return
            }
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
