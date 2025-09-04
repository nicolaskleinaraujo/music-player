// Modules
import type { Dispatch, SetStateAction } from "react"
import addMusic from "../configs/addMusic"
import { FaPlay } from "react-icons/fa"

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

interface PlaylistsProps {
    userId: number,
    playlists: Playlist[],
    currentPlaylist: any[]
    setCurrentPlaylist: Dispatch<SetStateAction<any[]>>
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>
}

const Playlists = ({ userId, playlists, currentPlaylist, setCurrentPlaylist, currentIndex, setCurrentIndex }: PlaylistsProps) => {
    const handleAddMusic = async(playlistId: number, userId: number) => {
        try {
            const res = await addMusic(playlistId, userId)
            if (res) location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handlePlay = (musics: any[], index: number) => {
        setCurrentPlaylist(musics)
        setCurrentIndex(index)
    }

    return (
        <div className="flex flex-col justify-center items-center text-white gap-10 text-center w-full max-w-2xl mx-auto">
            {playlists && playlists.map((playlist) => (
                <div key={playlist.id} className="w-full">
                    <div className="flex items-center justify-center mb-3">
                        <h2 className="text-lg font-bold mr-4">{playlist.name}</h2>
                        <button 
                            onClick={() => handlePlay(playlist.musics, 0)}
                            className="flex items-center justify-center w-8 h-8 bg-[#1db954] rounded-full hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200"
                        >
                            <FaPlay className="w-4 h-4 text-black fill-black cursor-pointer" />
                        </button>
                    </div>

                    <ul className="divide-y divide-gray-700">
                        {playlist.musics.map((music, index) => (
                            <li
                                key={music.id}
                                onClick={() => handlePlay(playlist.musics, index)}
                                className={
                                    `flex items-center justify-between px-3 py-2 hover:bg-white/10 cursor-pointer group hover:rounded-md
                                    ${
                                        currentPlaylist.length !== 0 ? 
                                            currentPlaylist[currentIndex].id === music.id ? 
                                                "text-[#1db954]" : 
                                                "text-white"
                                        : "text-white"
                                    }`
                                }
                            >

                                <span className="w-6 text-gray-400 group-hover:hidden">{index + 1}</span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePlay(playlist.musics, index)
                                    }}
                                    className="hidden group-hover:flex items-center justify-center w-6 h-6 bg-[#1db954] rounded-full"
                                >
                                    <FaPlay className="w-3 h-3 fill-black cursor-pointer" />
                                </button>

                                <div className="flex-1 text-left ml-2">
                                    <p className="text-sm font-medium">{music.title}</p>
                                    <p className="text-xs text-gray-400">{music.channel}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="mt-3 border-2 border-white rounded-md px-3 py-1 hover:bg-white/10 transition"
                        onClick={() => handleAddMusic(playlist.id, userId)}
                        >
                        Adicionar Música
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Playlists
