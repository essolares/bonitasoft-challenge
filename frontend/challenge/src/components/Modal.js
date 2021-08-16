import "../Modal.css"

const Modal = ({children, isOpen, closeModal}) => {
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal} className="modal-close btn btn-outline-danger">X</button>
                {children}
            </div>
        </article>
    )
}

export default Modal;
