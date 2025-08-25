// Modules
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

const Home = () => {
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

            <button className="border-2 border-white rounded-md p-2">Nova Playlist</button>

            <AudioPlayer
                src="/test-audios/music_1.mp3"
                onPlay={() => console.log("Playing...")}
            />
        </div>
    )
}

export default Home
