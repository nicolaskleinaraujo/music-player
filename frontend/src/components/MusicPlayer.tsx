// Modules
import "react-h5-audio-player/lib/styles.css"
import AudioPlayer from "react-h5-audio-player"
import dbFetch from "../utils/axios"
import { useEffect, useState } from "react"

interface MusicPlayerProps {
    playlist: any[]
    currentIndex: number
    setCurrentIndex: (index: number) => void
}

const MusicPlayer = ({ playlist, currentIndex, setCurrentIndex }: MusicPlayerProps) => {
    const currentMusic = playlist[currentIndex]
    const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!currentMusic) return

        const fetchMusic = async() => {
            try {
                const response = await dbFetch.get(`/music?fileName=${currentMusic.filePath}`, {
                    responseType: "blob",
                })

                const url = URL.createObjectURL(response.data)
                setAudioUrl(url)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMusic()

        return () => {
            if (audioUrl) URL.revokeObjectURL(audioUrl)
        }
    }, [currentMusic])

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <AudioPlayer
                src={audioUrl}
                autoPlay
                showJumpControls={false}
                showSkipControls={true}
                onClickNext={() => setCurrentIndex(currentIndex + 1)}
                onClickPrevious={() => setCurrentIndex(currentIndex - 1)}
                onEnded={() => setCurrentIndex(currentIndex + 1)}
            />
        </div>
    )
}

export default MusicPlayer
