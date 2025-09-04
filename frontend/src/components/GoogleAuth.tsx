// Modules
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import dbFetch from "../utils/axios"

const GoogleAuth = () => {
    const { userId } = useContext(UserContext)

    const loginWithCode = useGoogleLogin({
        flow: "auth-code",

        onSuccess: async (codeResponse: CodeResponse) => {
            try {
                const res = await dbFetch.post("/googletoken", {
                    code: codeResponse.code,
                    userId: userId,
                })
                console.log("Refresh token salvo:", res.data)
            } catch (error) {
                console.error("Erro ao salvar refresh token:", error)
            }
        },

        onError: () => console.log("Erro ao gerar authorization code")
    })

    return (
        <div className="mb-50 mt-15">
            <button onClick={() => loginWithCode()} className="mt-2 cursor-pointer border-white border-2 p-1 rounded-md">
                Conectar Google para refresh token
            </button>
        </div>
    )
}

export default GoogleAuth
