// Modules
import "react-h5-audio-player/lib/styles.css"
import AudioPlayer from "react-h5-audio-player"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import createPlaylist from "../configs/createPlaylist"

const Home = () => {
    const { userId } = useContext(UserContext)

    const handleCreatePlaylist = async() => {
        try {
            const playlistName = prompt("Digite o nome da Playlist")

            if (!playlistName) {
                return
            }

            const res = await createPlaylist(playlistName, userId)

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center pt-8">
            <div>
                <h2>Playlist Name 1</h2>
                <ul>
                    <li>Music 1</li>
                    <li>Music 2</li>
                </ul>
            </div>

            <div>
                <h2>Playlist Name 2</h2>
                <ul>
                    <li>Music 1</li>
                    <li>Music 2</li>
                    <li>Music 3</li>
                </ul>
            </div>

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
