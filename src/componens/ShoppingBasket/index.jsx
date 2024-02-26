import { useState } from "react"
import { Link } from "react-router-dom"
import { TrashIcon } from '@heroicons/react/24/outline'

function ShoppingBasket() {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])  // массив блюд, добавленных в корзину
    // const [openModal, setOpenModal] = useState(false)  // сообщение о добавлении блюда другого рестирана в корзину
    const summaOfOrders = () => {     // функция для подсчета общей суммы заказа
        return cartItems.reduce((sum, cartItem) => sum + parseFloat(cartItem.price), 0)
    }


    // const summaOfOrder = (cartItem) => (
    //     cartItem.quantity * parseFloat(cartItem.price)
    // )
    

    const deleteOrderFromCart = (id) => {
        const filteredOrder = cartItems.filter(cartItem => cartItem.id !== id)
        setCartItems(filteredOrder)
    }

    return (
        <div className="content">
            {cartItems.length === 0 ? (
                <div className="mt-20 text-center text-3xl md:text-6xl text-gray-400 font-thin">
                    <p>Ваша корзина пуста!</p>
                    <Link to='/'>
                        <p className="my-7 text-red-200 hover:text-gray-400">Перейдите для заказа</p>
                    </Link>
                </div>    
            ) : (
                <div>
                    <h2 className="my-12 text-center text-2xl md:text-4xl">Ваш заказ:</h2>
                    {cartItems.map((cartItem, index) => {
                        return (
                            <div key={cartItem.id} className="w-full md:w-1/2 m-auto py-4 text-xl flex justify-between items-center">
                                <div className="flex justify-between items-center gap-5">
                                    <p>{index + 1}. </p>
                                    <img className="h-20 w-20 rounded-xl object-cover" src={cartItem.image} alt="блюдо"/>
                                    <p>{cartItem.price} р.</p>
                                </div>
                                
                                <div className="flex justify-between items-center gap-5">
        
                                    <p>{cartItem.quantity}</p>
                                    {/* <p className="text-3xl text-justify">Сумма: {summaOfOrder()} р.</p> */}

                                </div>

                                <button onClick={() => deleteOrderFromCart(cartItem.id)}>
                                    <TrashIcon className="w-6 h-6 stroke-red-700" />
                                </button>
                            </div>
                        )
                    })}
                     <p className="mt-7 text-xl md:text-3xl text-center">
                        Сумма Вашего заказа: 
                        <span className="text-red-700">{new Intl.NumberFormat().format(summaOfOrders())}</span> р.
                    </p>

                    <button 
                        className="p-3 my-5 w-full md:w-1/2 bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-3000"
                        // onClick={() => addOrder(item)}
                    >
                        Оформить заказ
                    </button>
                </div>
            )}
        </div>
    )
}

export default ShoppingBasket