import Header from "componens/Header"
import HomePage from "componens/HomePage"
import RestaurantPage from "componens/RestaurantPage"
import Footer from "componens/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/restaurant/:slug" element={<RestaurantPage />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App