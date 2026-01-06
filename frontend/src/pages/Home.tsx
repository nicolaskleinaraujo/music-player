// Modules
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import createPlaylist from "../configs/createPlaylist"
import MusicPlayer from "../components/MusicPlayer"
import Playlists from "../components/Playlists"
import SearchBox from "../components/SearchBox"

const Home = () => {
    const { userId, playlists, setPlaylists } = useContext(UserContext)

    const [currentPlaylist, setCurrentPlaylist] = useState<any[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const handleCreatePlaylist = async() => {
        try {
            const res = await createPlaylist(userId)
            if (res) setPlaylists([...playlists, res.data.newPlaylist])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center pt-8">
            <SearchBox />

            <Playlists 
                playlists={playlists}
                currentPlaylist={currentPlaylist}
                setCurrentPlaylist={setCurrentPlaylist}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />

            <button 
                className="border-2 border-white rounded-md p-2 mb-40"
                onClick={() => handleCreatePlaylist()}
            >
                Nova Playlist
            </button>

            <MusicPlayer 
                musics={currentPlaylist}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </div>
    )
}

export default Home
