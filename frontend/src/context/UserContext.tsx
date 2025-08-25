// Modules
import { createContext, useState } from "react"
import type { ReactNode, Dispatch, SetStateAction } from "react"

type Music = {
    id: number,
    title: string,
    channel: string,
    url: string,
    filePath: string,
    playlistId: number,
}

type Playlist = {
    id: number
    name: string
    userId: number
    musics: Music[]
}

type UserContextType = {
    userId: number,
    setUserId: Dispatch<SetStateAction<number>>,
    playlists: Playlist[],
    setPlaylists: Dispatch<SetStateAction<Playlist[]>>
}

// Context
export const UserContext = createContext<UserContextType>({
    userId: 0,
    setUserId: () => {},
    playlists: [],
    setPlaylists: () => {},
})

type UserProviderProps = {
    children: ReactNode,
}

// Provider
export const UserProvider = ({ children }: UserProviderProps) => {
    const [userId, setUserId] = useState(0)
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    return (
        <UserContext.Provider value={{ userId, setUserId, playlists, setPlaylists }}>
            {children}
        </UserContext.Provider>
    )
}
