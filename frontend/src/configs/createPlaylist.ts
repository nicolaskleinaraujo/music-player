// Modules
import type { AxiosResponse } from "axios"
import dbFetch from "../utils/axios"

const createPlaylist = async(playlistName: string, userId: number): Promise<AxiosResponse> => {
    const res = await dbFetch.post("/playlist", {
        name: playlistName,
        userId,
    })

    return res
}

export default createPlaylist
