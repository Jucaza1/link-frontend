import { UserInfo } from "@/types/state"
import { createContext } from "react"

export const UserContext = createContext({} as UserContextType)
export type UserContextType = {
    user: UserInfo | null
    setUser: (user: UserInfo | null) => void
    isLoggedIn: boolean
    setIsLoggedIn: (loggedIn: boolean) => void
}
