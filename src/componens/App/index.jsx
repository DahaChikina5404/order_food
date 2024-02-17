import Header from "componens/Header"
import HomePage from "componens/HomePage"
import RestaurantPage from "componens/RestaurantPage/MenuOfRestaurant"
import ShoppingBasket from "componens/ShoppingBasket"
import IconTrash from "componens/IconTrash"
import Footer from "componens/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/restaurant/:slug" element={<RestaurantPage />}/>
                <Route path="shopping" element={<ShoppingBasket />}/>
            </Routes>
            <IconTrash />
            <Footer />
        </BrowserRouter>
    )
}

export default App