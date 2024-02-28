import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TrashIcon } from "@heroicons/react/24/outline"
import PostForm  from "componens/PostForm"

function ShoppingBasket() {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])  // массив блюд, добавленных в корзину
    const [openModal, setOpenModal] = useState(false)  //  открытия окна для оформления заказа
    
    const summaOfOrders = () => {     // функция для подсчета общей суммы заказа
        return cartItems.reduce((sum, cartItem) => sum + parseFloat(cartItem.price), 0)
    }

    const plus = (cartItem) => {   // увеличение на 1
  
        if (cartItem) {   // изменить количество +1
            const newCartItem = {
                ...cartItem,
                quantity: cartItem.quantity + 1
            }
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== newCartItem.itemId)
            // заменяем старый на новый
            setCartItems([...newItems, newCartItem])
        }    
    }

    const minus = (cartItem) => {   // уменьшение на 1
       
        if (cartItem) {   // изменить количество -1
            const newCartItem = {
                ...cartItem,
                quantity: cartItem.quantity - 1
            }
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== newCartItem.itemId)
            // заменяем старый элемент на новый
            setCartItems([...newItems, newCartItem])
        }

        if (cartItem.quantity <= 1) {  // если количество меньше 1, то удалить товар из корзины
            const newCartItem = {
                ...cartItem
            }
            // удалим старое
            let newItems = cartItems.filter(cartItem => cartItem.itemId !== newCartItem.itemId)
            // заменяем старый на новый
            setCartItems(newItems)
        }
    }

    // const summaOfOrder = (cartItem) => (
    //     cartItem.quantity * parseFloat(cartItem.price)
    // )
    
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
        <div className="content">
            {cartItems.length === 0 ? (
                <div className="mt-20 text-center text-3xl md:text-6xl text-gray-400 font-thin">
                    <p>Ваша корзина пуста!</p>
                    <Link to='/'>
                        <p className="my-7 text-red-200 hover:text-gray-400 transition-all duration-3000">Перейдите для заказа</p>
                    </Link>
                </div>    
            ) : (
                <div>
                    {openModal && <PostForm closeModalWindow={closeModalWindow} cartItems={cartItems}/>}
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
                                    <button className="text-3xl" onClick={() => minus(cartItem)}> - </button>
                                    <p>{cartItem.quantity}</p>
                                    <button className="text-3xl" onClick={() => plus(cartItem)}> + </button>
                                    
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
                            className="p-3 w-1/2 lg:w-1/5 md:w-1/3 text-xl border border-gray-500 rounded hover:bg-yellow-400 transition-all duration-3000"
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