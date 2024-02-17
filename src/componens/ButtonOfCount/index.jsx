function ButtonOfCount({ title, changeCount }) {
    return (
        <button onClick={changeCount} className="mx-10 mt-5 mb-10 text-6xl">
            {title}
        </button>
    )
}

export default ButtonOfCount