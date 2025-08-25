// Modules
import dbFetch from "../utils/axios"

async function createPlaylist(name: string, userId: number) {
    const res = await dbFetch.post("/playlist", {
        name,
        userId,
    })

    return res.data
}

export default createPlaylist
