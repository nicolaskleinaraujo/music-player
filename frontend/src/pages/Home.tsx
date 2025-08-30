// Modules
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import createPlaylist from "../configs/createPlaylist"
import addMusic from "../configs/addMusic"
import MusicPlayer from "../components/MusicPlayer"

const Home = () => {
    const { userId, playlists, setPlaylists } = useContext(UserContext)

    const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const handleCreatePlaylist = async() => {
        try {
            console.log(playlists)
            const res = await createPlaylist(userId)
            if (res) setPlaylists([...playlists, res.data.newPlaylist])
        } catch (error) {
            console.log(error)
        }
    }

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
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center pt-8">
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

            <button 
                className="border-2 border-white rounded-md p-2"
                onClick={() => handleCreatePlaylist()}
            >
                Nova Playlist
            </button>

            <MusicPlayer 
                playlist={currentPlaylist}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </div>
    )
}

export default Home
