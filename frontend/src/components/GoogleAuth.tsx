// Modules
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import type { CredentialResponse, CodeResponse } from "@react-oauth/google"
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



    const handleLogin = async(credentialResponse: CredentialResponse) => {
        try {
            await dbFetch.post("/googleauth", {
                credential: credentialResponse.credential,
                userId: userId,
            })

            loginWithCode()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mb-50 mt-15">
            <GoogleLogin
                onSuccess={(credentialResponse) => { handleLogin(credentialResponse) }}
                onError={() => console.log("Erro ao logar com google")}
            />
        </div>
    )
}

export default GoogleAuth
