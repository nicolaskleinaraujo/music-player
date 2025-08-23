// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import Login from "../pages/Login"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
