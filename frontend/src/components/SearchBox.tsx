// Modules
import dbFetch from "../utils/axios"
import { Link } from "react-router-dom"
import { useState } from "react"

const SearchBox = () => {
    const [query, setQuery] = useState("")
    const [suggestedMusics, setSuggestedMusics] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    const getMusicSuggestion = async(q: string) => {
        try {
            if (q === "") return
            const res = await dbFetch.get(`suggestmusic?query=${q}`)
            setSuggestedMusics(res.data.suggestions)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto text-white">
            <div className="relative">
                <input 
                    onChange={(e) => {
                        setQuery(e.target.value)
                        getMusicSuggestion(e.target.value)
                    }}
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder="Pesquisar musicas..."
                    className="w-full bg-[#121212] text-white
                        px-4 py-2 rounded-md
                        border border-gray-700
                        focus:outline-none focus:border-[#1db954]
                        placeholder-gray-400"
                />
            </div>
            {isFocused && query !== "" && suggestedMusics.length > 0 && (
                <ul className="mt-2 bg-[#181818] rounded-md overflow-hidden divide-y divide-gray-700">
                    {suggestedMusics.map((suggestedMusic, index) => (
                        <li key={index}>
                            <Link to={`/search?q=${suggestedMusic[0]}`} className="block px-4 py-2 hover:bg-white/10 transition hover:text-[#1db954] text-sm">
                                {suggestedMusic[0]}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBox
