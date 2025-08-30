// Modules
import type { Dispatch, SetStateAction } from "react"
import addMusic from "../configs/addMusic"

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
        <div>
            {playlists && playlists.map((playlist) => (
                <div key={playlist.id}>
                    <h2>{playlist.name}</h2>

                    <button
                        className="border-2 border-green-500 rounded-md p-1 m-2"
                        onClick={() => handlePlay(playlist.musics, 0)}
                    >
                        ▶️ Tocar Playlist
                    </button>

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
