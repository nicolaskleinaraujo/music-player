// Modules
import { createContext, useState } from "react"
import type { ReactNode, Dispatch, SetStateAction } from "react"

type LoadingContextType = {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
}

type LoadingProviderProps = {
    children: ReactNode,
}

// Context
export const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => {}
})

// Provider
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}