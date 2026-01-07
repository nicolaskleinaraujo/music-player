// Modules
import dbFetch from "../utils/axios"
import { useContext, useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { LoadingContext } from "../context/LoadingContext"
import { FaArrowLeft, FaPlus } from "react-icons/fa"
import PlaylistPrompt from "../components/PlaylistPrompt"

type Music = {
    id: number,
    title: string,
    channelTitle: string,
}

const Search = () => {
    const { userId, playlists, setPlaylists } = useContext(UserContext)
    const { setLoading } = useContext(LoadingContext)

    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const navigate = useNavigate()

    const [musics, setMusics] = useState<Music[]>([])
    const [showPrompt, setShowPrompt] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState("")

    const getMusics = async() => {
        try {
            if (query === "") {
                navigate("/")
                return
            }

            setLoading(true)

            const res = await dbFetch.get(`searchmusic?query=${query}`)

            setMusics(res.data.musics)
            setLoading(false)
        } catch (error) {
            // TODO add toast error
            console.log(error)
        }
    }

    const addMusic = async(playlistId: number) => {
        setShowPrompt(false)
        setLoading(true)

        try {
            if (selectedUrl === "") {
                setLoading(false)
                return
            }

            const res = await dbFetch.post("music", {
                url: `https://www.youtube.com/watch?v=${selectedUrl}`,
                playlistId,
                userId,
            })

            if(res.status === 201) {
                setPlaylists(prevPlaylists => prevPlaylists.map(playlist => {
                    if (playlist.id === playlistId) {
                        return {
                            ...playlist,
                            musics: [...playlist.musics, res.data.music]
                        }
                    }

                    return playlist
                }))

                setLoading(false)
                navigate("/")
            }

            // TODO add error capture if add music fails
        } catch (error) {
            // TODO add toast error
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getMusics()
    }, [])

    return (
        <div className="text-white w-full max-w-3xl mx-auto px-4 my-10">
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
                >
                    <FaArrowLeft />
                    Voltar
                </button>
            </div>


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
                                    {music.channelTitle}
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
