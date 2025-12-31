// Modules
import { useState } from "react"

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

type PlaylistPromptProps = {
    playlists: Playlist[]
    onConfirm: (playlist: number) => void
    onClose: () => void
}


const PlaylistPrompt = ({ playlists, onConfirm, onClose }: PlaylistPromptProps) => {
    const [selected, setSelected] = useState<number | null>(null)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-lg bg-zinc-900 p-4 text-white">
                <h2 className="mb-3 text-lg font-semibold">Escolha uma playlist</h2>

                <ul className="mb-4 space-y-2">
                    {playlists.map((playlist) => (
                        <li key={playlist.id}>
                            <button
                                onClick={() => setSelected(playlist.id)}
                                className={`w-full rounded-md px-3 py-2 text-left transition
                                ${selected === playlist.id ? "bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"}`}
                            >
                                {playlist.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-md px-4 py-2 bg-zinc-700 hover:bg-zinc-600"
                    >
                        Cancelar
                    </button>

                    <button
                        disabled={!selected}
                        onClick={() => selected && onConfirm(selected)}
                        className="rounded-md px-4 py-2 bg-green-600 disabled:opacity-50"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPrompt
