// Modules
import Router from './utils/Router'
import dbFetch from './utils/axios'
import { useEffect, useContext } from 'react'
import { UserContext } from './context/UserContext'

function App() {
  const { setUserId, setPlaylists } = useContext(UserContext)

  const tryAuth = async() => {
    const res = await dbFetch.post("/tryauth", {
      userId: localStorage.getItem("userId")
    })

    setUserId(res.data.searchUser.id)
    setPlaylists(res.data.searchUser.playlists)
  }

  useEffect(() => {
    tryAuth()
  }, []) 

  return (
    <>
      <Router />
    </>
  )
}

export default App
