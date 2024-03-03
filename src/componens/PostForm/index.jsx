import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Swal from "sweetalert2"

function PostForm({ closeModalWindow, emptyTrash, cartItems, restaurantId }) {

    const [customerName, setCustomerName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [isOpen] = useState(true)

    const handleSubmitForm = (event) => {  // функция обрабатывает отправленную форму
        event.preventDefault() // предотвращаем загрузку страницы при отправлении формы 

        if (customerName === '' || phone === '' || email === '') { // Условие на заполнение обязательных полей
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Заполните обязательные поля!',
                showConfirmButton: true,
            })
            return
        } 

        const requestBody = {
            customerName,
            phone,
            email,
            description,
            restaurantId,

            cartItems: cartItems.map((cartItem) => ({ 
                itemId: cartItem.itemId,
                quantity: cartItem.quantity,
                price: cartItem.price 
            }))  
        }

        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/order`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        }) 

        .then(response => {
            if (response.ok) {
                closeModalWindow()
                emptyTrash()
                Swal.fire({  // Сообщение при успешной отправке формы
                    position: 'center',
                    icon: 'success',
                    title: 'Спасибо за обращение! Наш менеджер свяжется с Вами в течение 10 минут!',
                    showConfirmButton: false,
                    timer: 3000
                })
            } else {
                Swal.fire({  // Сообщение при успешной отправке формы
                    position: 'center',
                    icon: 'error',
                    title: 'Упс... Что-то пошло не так! Попробуйте отправить заказ позднее!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
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
                                
                                <form onSubmit={handleSubmitForm} className="flex flex-col gap-5 justify-between">
                                    <input 
                                        className="p-2 h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите Ваше имя"
                                        name="customerName"
                                        type="text"
                                        value={customerName}
                                        onChange={(event) => setCustomerName(event.target.value)}
                                        />

                                    <input 
                                        className="p-2 h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите номер телефона"
                                        name="phone"
                                        type="number"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        />

                                    <input 
                                        className="p-2 h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Введите e-mail"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        />     

                                    <textarea
                                        className="p-2 h-8 w-full border border-gray-500 rounded-xl"
                                        placeholder="Комментарий:"
                                        name="email"
                                        type="text"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        >   
                                    </textarea>        
                                

                                    <div className="mt-4 flex justify-start items-center gap-2">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xl font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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