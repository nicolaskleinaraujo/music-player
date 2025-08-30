// Modules
import "react-h5-audio-player/lib/styles.css"
import AudioPlayer from "react-h5-audio-player"
import dbFetch from "../utils/axios"
import { useEffect, useState } from "react"

const MusicPlayer = ({ filename }: { filename: string }) => {
    const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!filename) return

        const fetchMusic = async() => {
            try {
                const response = await dbFetch.get(`/music?fileName=${filename}`, {
                    responseType: "blob",
                })

                const url = URL.createObjectURL(response.data)
                setAudioSrc(url)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMusic()

        return () => {
            if (audioSrc) URL.revokeObjectURL(audioSrc)
        }
    }, [filename])

    return (
        <AudioPlayer
            src={audioSrc}
            autoPlay={true}
        />
    )
}

export default MusicPlayer
