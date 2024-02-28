import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import Swal from "sweetalert2"

function PostForm({ closeModalWindow, cartItems }) {
    let [isOpen] = useState(true)

    const [customerName, setCustomerName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmitForm = (event) => {  // функция обрабатывает отправленную форму
        event.preventDefault() // предотвращаем загрузку страницы при отправлении формы 

        const requestBody = {
            customerName,
            phone,
            email,
            description,
            restaurantId,

            cartItems: [
                itemId,
                quantity,
                price 
            ]
        }
    }

    useEffect(() => {  // Отправка данных на сервер
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/order`)
        .then(response => response.json())
        .then(json => setCartItems(json))
    }, [])

    {cartItems((cartItem) => (<pre key={cartItem.id}>
            {JSON.stringify(cartItem)}
        </pre>
        ))
    }
  

    if (response) {  // Сообщение при успешной отправке формы
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Спасибо за обращение! Наш менеджер свяжется с Вами в течение 10 минут!',
            showConfirmButton: false,
            timer: 3000
        })
    }
        

       
    if (surname === '' || phone === '' || mail === '') { // Условие на заполнение обязательных полей
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Заполните обязательные поля!',
            showConfirmButton: true,
        })
        return
    } 
        
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalWindow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/35" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="my-5 text-3xl font-medium text-gray-900"
                                >
                                    Для оформления заказа заполните все поля
                                </Dialog.Title>
                                
                                <form className="flex flex-col gap-5 justify-between">
                                    <input 
                                        className="h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите Ваше имя"
                                        name="customerName"
                                        type="text"
                                        value={customerName}
                                       // onChange={onChange}
                                        />

                                    <input 
                                        className="h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите номер телефона"
                                        name="phone"
                                        type="number"
                                        value={phone}
                                       // onChange={onChange}
                                        />

                                    <input 
                                        className="h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите e-mail"
                                        name="email"
                                        type="text"
                                        value={email}
                                      //  onChange={onChange}
                                        />     

                                    <textarea
                                        className="h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Комментарий:"
                                        name="email"
                                        type="text"
                                        value={description}
                                      //  onChange={onChange}
                                        >   
                                    </textarea>        
                                

                                    <div className="mt-4 flex justify-start items-center gap-2">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleSubmitForm()}
                                        >
                                            Отправить заявку
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModalWindow}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>  
    )
}

export default PostForm