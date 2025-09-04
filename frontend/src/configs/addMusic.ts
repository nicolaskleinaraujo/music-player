// Modules
import type { AxiosResponse } from "axios"
import dbFetch from "../utils/axios"

const addMusic = async(playlistId: number, userId: number): Promise<AxiosResponse | undefined> => {
    const url = prompt("Digite a URL da musica")

    if (!url) {
        return
    }

    const res = await dbFetch.post("/music", {
        url,
        playlistId,
        userId,
    })

    return res
}

export default addMusic
