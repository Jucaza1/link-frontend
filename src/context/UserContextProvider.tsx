import { useState, PropsWithChildren, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { User_DTO } from "../types/state";

export function UserContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState(null as User_DTO | null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("x-authorization") !== null);
    // console.log("UserContextProvider initialized");
    // console.log("UserContextProvider user:", user);
    // console.log("UserContextProvider isLoggedIn:", isLoggedIn);
    // console.log("------");

    useEffect(() => {
        const fetchUser = async () => {
            const userString = localStorage.getItem("user");
            let userInfo: User_DTO | undefined
            if (userString) {
                try {
                    userInfo = JSON.parse(userString)
                } catch (e: unknown) {
                    console.error("error parsing user from localStore", e)
                }
            }
            if (userInfo != undefined) {
                setUser(userInfo)
                setIsLoggedIn(true)
                return
            }
        }

        fetchUser();
    }, [isLoggedIn]);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
