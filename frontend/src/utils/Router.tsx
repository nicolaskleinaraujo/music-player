// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRoute from "./UserRoute"

// Pages
import Login from "../pages/Login"
import Home from "../pages/Home"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    
                    <Route element={ <UserRoute /> }>
                        <Route path="/" element={ <Home /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
