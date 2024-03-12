import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TrashIcon } from "@heroicons/react/24/outline"
import PostForm  from "componens/PostForm"

function ShoppingBasket() {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])  // массив блюд, добавленных в корзину
    const [openModal, setOpenModal] = useState(false)  //  открытия окна для оформления заказа
    
    const summaOfOrders = () => {     // функция для подсчета общей суммы заказа
        return cartItems.reduce((sum, cartItem) => sum + parseFloat(cartItem.price) * cartItem.quantity, 0)
    }

    const plus = (cartItem) => {   // увеличение на 1
  
        if (cartItem) {   // изменить количество +1
            const newCartItem = {
                ...cartItem,
                quantity: cartItem.quantity + 1
            }
            // удалим старое
            let newItems = cartItems.map(cartItem => cartItem.id === newCartItem.id ? newCartItem : cartItem)
            // заменяем старый на новый
            setCartItems(newItems)
        }    
    }

    const minus = (cartItem) => {   // уменьшение на 1
       
        if (cartItem.quantity > 1) {   // изменить количество -1
            const newCartItem = {
                ...cartItem,
                quantity: cartItem.quantity - 1
            }
            // удалим старое
            let newItems = cartItems.map(cartItem => cartItem.id === newCartItem.id ? newCartItem : cartItem)
            // заменяем старый на новый
            setCartItems(newItems)
        } else {   // если количество меньше 1, то удалить товар из корзины
            // удалим старое
            let newItems = cartItems.filter(x => x.id !== cartItem.id)
            // заменяем старый на новый
            setCartItems(newItems)
        }
    }
    
    const deleteOrderFromCart = (id) => {  // удалить заказ из корзины
        const filteredOrder = cartItems.filter(cartItem => cartItem.id !== id)
        setCartItems(filteredOrder)
    }

    const emptyTrash = () => {// очистка корзины 
        setCartItems([])
    }

    const openModalWindow = () => { // открытие модального окна для отправки формы
        setOpenModal(true)
    }

    const closeModalWindow = () => {  // закрытие модального окна
        setOpenModal(false)
    }

    useEffect(() => {  //  записываем данные в Local Storage
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

    return (
        <div className="content min-h-screen">
            {cartItems.length === 0 ? (
                <div className="mt-20 text-center text-3xl md:text-6xl text-gray-400 font-thin">
                    <p>Ваша корзина пуста!</p>
                    <Link to='/'>
                        <p className="my-7 text-red-200 hover:text-gray-400 transition-all duration-3000">Перейдите для заказа</p>
                    </Link>
                </div>    
            ) : (
                <div>
                    {openModal && <PostForm closeModalWindow={closeModalWindow} emptyTrash={emptyTrash} cartItems={cartItems} restaurantId={cartItems.length > 0 ? cartItems[0].restaurantId : null} />}
                    <h2 className="my-12 text-center text-2xl md:text-4xl">Ваш заказ:</h2>
                    {cartItems.map((cartItem, index) => {
                        return (
                            <div key={cartItem.id} className="w-full md:w-full lg:w-2/3 m-auto py-4 flex justify-between items-center text-xs md:text-xl">
                                <div className="flex justify-between items-center gap-2 md:gap-6">
                                    <p>{index + 1}. </p>
                                    <img className="h-20 md:h-40 w-20 md:w-40 rounded-xl object-cover" src={cartItem.image} alt="блюдо"/>
                                    <div className="flex flex-col items-start">
                                        <p className="py-1 text-xs md:text-xl">{cartItem.name}</p>
                                        <div className="pl-5 flex justify-around items-center gap-2 md:gap-5">
                                            <button className="text-xl md:text-3xl" onClick={() => minus(cartItem)}> - </button>
                                            <p>{cartItem.quantity}</p>
                                            <button className="text-xl md:text-3xl" onClick={() => plus(cartItem)}> + </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center gap-2 md:gap-10">
                                    <p className="text-xs md:text-xl">{cartItem.price} р.</p>
                                    <button onClick={() => deleteOrderFromCart(cartItem.id)}>
                                        <TrashIcon className="w-4 md:w-6 w-4 md:h-6 stroke-red-700" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                     <p className="mt-7 text-xl md:text-3xl text-center">
                        Сумма Вашего заказа: 
                        <span className="text-red-700">{new Intl.NumberFormat().format(summaOfOrders())}</span> р.
                    </p>

                    <div className="mt-7 text-center">
                        <button 
                            className="p-3 w-full md:w-1/3 bg-yellow-400 text-xl rounded hover:bg-yellow-600 transition-all duration-3000"
                            onClick={() => openModalWindow()}
                        >
                            Оформить заказ
                        </button>
                    </div>

                    <div className="mt-7 text-right">
                        <button 
                            className="p-2 md:p-3 w-1/2 lg:w-1/5 md:w-1/3 text-sm md:text-xl border border-gray-500 rounded hover:bg-yellow-400 transition-all duration-3000"
                            onClick={() => emptyTrash()}
                        >
                            Очистить корзину
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShoppingBasket