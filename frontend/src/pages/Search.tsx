// Modules
import dbFetch from "../utils/axios"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import PlaylistPrompt from "../components/PlaylistPrompt"

type Music = {
    id: number,
    title: string,
    channel: string,
    url: string,
    filePath: string,
    playlistId: number,
}

const Search = () => {
    const { userId, playlists } = useContext(UserContext)

    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const [musics, setMusics] = useState<Music[]>([])
    const [showPrompt, setShowPrompt] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState("")

    const getMusics = async() => {
        try {
            // TODO add loading state
            const res = await dbFetch.get(`searchmusic?query=${query}`)
            setMusics(res.data.musics)
        } catch (error) {
            // TODO add toast error
            console.log(error)
        }
    }

    const addMusic = async(playlistId: number) => {
        // TODO add loading state
        setShowPrompt(false)

        try {
            if (selectedUrl === "") {
                return
            }

            const res = await dbFetch.post("music", {
                url: `https://www.youtube.com/watch?v=${selectedUrl}`,
                playlistId,
                userId,
            })

            console.log(res.data)
        } catch (error) {
            // TODO add toast error
            console.log(error)
        }
    }

    useEffect(() => {
        getMusics()
    }, [])

    return (
        <div>
            {/* FIXME fix this crap UI */}
            {musics && (
                <ul>
                    {musics.map((music) => (
                        <li>
                            {music.title} - <button onClick={() => { setSelectedUrl(String(music.id)), setShowPrompt(true) }}>ADICIONAR</button>
                        </li>
                    ))}
                </ul>
            )}

            {showPrompt && (
                <PlaylistPrompt
                    playlists={playlists}
                    onConfirm={(playlistId) => addMusic(playlistId)}
                    onClose={() => setShowPrompt(false)}
                />
            )}
        </div>
    )
}

export default Search
