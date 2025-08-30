// Modules
import type { AxiosResponse } from "axios"
import dbFetch from "../utils/axios"

const createPlaylist = async(userId: number): Promise<AxiosResponse | undefined> => {
    const playlistName = prompt("Digite o nome da Playlist")

    if (!playlistName) {
        return
    }

    const res = await dbFetch.post("/playlist", {
        name: playlistName,
        userId,
    })

    return res
}

export default createPlaylist
