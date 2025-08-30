// Modules
import "react-h5-audio-player/lib/styles.css"
import AudioPlayer from "react-h5-audio-player"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import createPlaylist from "../configs/createPlaylist"
import addMusic from "../configs/addMusic"

const Home = () => {
    const { userId, playlists, setPlaylists } = useContext(UserContext)

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

    return (
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center pt-8">
            {playlists && playlists.map((playlist) => (
                <div key={playlist.id}>
                    <h2>{playlist.name}</h2>

                    <ul>
                        {playlist.musics.map((music) => (
                            <li key={music.id}>
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

            <AudioPlayer
                src="/test-audios/music_1.mp3"
                onPlay={() => console.log("Playing...")}
            />
        </div>
    )
}

export default Home
