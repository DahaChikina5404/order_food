import { useState } from "react"
import { Link } from "react-router-dom"

function ShoppingBasket() {

    const [cartItems, setCartItems] = useState([
        id,
        image,
        name,
        price,
        count
    ])


    const deleteOrder = (id) => {
        const filteredOrder = cartItems.filter(cartItem => cartItem.id !== id)
        setCartItems(filteredOrder)
    }




    return (
        <div className="content">
            {cartItems.length === 0 ? (
                <div className="mt-20 text-center text-3xl md:text-6xl text-gray-400 font-thin">
                    <p>Ваша корзина пуста!</p>
                    <Link to='/'>
                        <p className="mt-7 text-red-200 hover:text-gray-400">Перейдите для заказа</p>
                    </Link>
                </div>    
            ) : (
                <div>
                </div>



            )}
        </div>
    )
}

export default ShoppingBasket