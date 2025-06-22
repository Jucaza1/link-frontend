import { User_DTO } from "@/types/state"
import { createContext } from "react"

export const UserContext = createContext({} as UserContextType)
export type UserContextType = {
    user: User_DTO | null
    setUser: React.Dispatch<React.SetStateAction<User_DTO | null>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
