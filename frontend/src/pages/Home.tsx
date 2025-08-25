// Modules
import dbFetch from "../utils/axios"

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center text-white gap-7 text-center">
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
        </div>
    )
}

export default Home
