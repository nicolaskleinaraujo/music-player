// Modules
import dbFetch from "../utils/axios"
import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { FaPlus } from "react-icons/fa"
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
        <div className="text-white w-full max-w-3xl mx-auto px-4 my-10">
            <h1 className="text-xl font-bold mb-6 text-center">
                Resultados para{" "}
                <span className="text-[#1db954]">{query}</span>
            </h1>

            {musics && (
                <ul className="divide-y divide-gray-700">
                    {musics.map((music, index) => (
                        <li 
                            key={index}
                            className="
                                flex items-center justify-between px-3 py-2
                                hover:bg-white/10 rounded-md transition group"
                        >
                            <span className="w-6 text-gray-400">
                                {index + 1}
                            </span>

                            <div className="flex-1 ml-3">
                                <p className="text-sm font-medium">
                                    {music.title}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {music.channel}
                                </p>
                            </div>

                            <button 
                                onClick={() => { setSelectedUrl(String(music.id)), setShowPrompt(true) }}
                                className="
                                    opacity-0 group-hover:opacity-100 flex items-center gap-2
                                    text-sm text-[#1db954] hover:scale-105 transition cursor-pointer"
                            >
                                <FaPlus />
                                Adicionar
                            </button> 
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
