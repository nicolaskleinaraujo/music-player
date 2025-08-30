// Modules
import type { Dispatch, SetStateAction } from "react"
import addMusic from "../configs/addMusic"
import { PlayIcon } from "@radix-ui/react-icons"

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
    playlists: Playlist[],
    setCurrentPlaylist: Dispatch<SetStateAction<any[]>>
    setCurrentIndex: Dispatch<SetStateAction<number>>
}

const Playlists = ({ playlists, setCurrentPlaylist, setCurrentIndex }: PlaylistsProps) => {
    const handleAddMusic = async(playlistId: number) => {
        try {
            const res = await addMusic(playlistId)
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
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center">
            {playlists && playlists.map((playlist) => (
                <div key={playlist.id}>
                    <div className="flex justify-center items-center">
                        <h2>{playlist.name}</h2>
                        <button onClick={() => handlePlay(playlist.musics, 0)}>
                            <PlayIcon 
                                className="text-black bg-[#1db954]"
                            />
                        </button>
                    </div>

                    <ul>
                        {playlist.musics.map((music, index) => (
                            <li key={music.id} onClick={() => handlePlay(playlist.musics, index)}>
                                {music.title} - {music.channel}
                            </li>
                        ))}
                    </ul>

                    <button 
                        className="border-2 border-white rounded-md p-1"
                        onClick={() => handleAddMusic(playlist.id)}
                    >
                        Adicionar Musica
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Playlists
