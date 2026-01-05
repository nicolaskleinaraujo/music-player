// Modules
import dbFetch from "../utils/axios"
import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import { LoadingContext } from "../context/LoadingContext"

const useAuth = () => {
    const { setUserId } = useContext(UserContext)
    const { setLoading } = useContext(LoadingContext)

    const [authUserId, setAuthUserId] = useState(0)
    const [authLoading, setAuthLoading] = useState(true)

    const fetchData = async() => {
        try {
            const res = await dbFetch.post("/tryauth", {
                userId: localStorage.getItem("userId")
            })

            setAuthUserId(res.data.searchUser.id)
            setUserId(res.data.searchUser.id)

            setLoading(false)
            setAuthLoading(false)
        } catch (error) {
            setAuthLoading(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { authUserId, authLoading }
}

export default useAuth
