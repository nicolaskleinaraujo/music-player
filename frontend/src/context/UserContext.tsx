// Modules
import { createContext, useState } from "react"
import type { ReactNode, Dispatch, SetStateAction } from "react"

type UserContextType = {
    userId: number,
    setUserId: Dispatch<SetStateAction<number>>
}

// Context
export const UserContext = createContext<UserContextType>({
    userId: 0,
    setUserId: () => {}
})

type UserProviderProps = {
    children: ReactNode,
}

// Provider
export const UserProvider = ({ children }: UserProviderProps) => {
    const [userId, setUserId] = useState(0)

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}
