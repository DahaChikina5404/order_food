import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Button from "components/Button"

function ExpensesForm({ handleAddExpense }) {

    const [cost, setCost] = useState('') // хранится введенная пользователем сумма расхода
    const [title, setTitle] = useState('Образование') // хранится выбранная категория
    const [startDate, setStartDate] = useState(new Date()) // Выбор даты трат

    // функция обрабатывает отправленную форму
    const handleSubmitForm = (event) => {
        event.preventDefault() // предотвращаем загрузку страницы при отправлении формы 

        const sale = {
            cost: parseFloat(cost),
            title,
            startDate
        }

        handleAddExpense(sale)

        //очистка формы
        setCost('')
        setTitle('Образование')
        setStartDate(new Date())

    }

    const onChange = (event) => {  // Проверка ввода числового значения
        const oldValue = event.target.value
        const newVAlue = oldValue.replace(/\D+/, '')
        setCost(newVAlue)
    }

    return (
        <form onSubmit={handleSubmitForm} className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
            <input 
                className="pl-2 h-10 md:w-1/3 border border-solid border-slate-400 rounded"
                placeholder="00.00"
                name="cost"
                type="text"
                value={cost}
                onChange={onChange}/>
        
            <select 
                className="pl-2 h-10 md:w-1/3 border border-solid border-slate-400 rounded"
                name="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}>
                    <option>Еда</option>
                    <option>Одежда</option>
                    <option>Аренда</option>
                    <option>Образование</option>
                    <option>Развлечения</option>
                    <option>Путешествия</option>
            </select> 

            <DatePicker
                className="pl-2 h-10 border border-solid border-slate-400 rounded bg-white"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy" /> 
           
            <Button title="Добавить" />
        </form>
    )
}

export default ExpensesForm