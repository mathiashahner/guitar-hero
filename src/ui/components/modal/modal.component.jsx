import './modal.style.css'

export const Modal = ({ isShow, children }) => {
  return (
    <div className={`modal-container ${!isShow ? 'modal-hidden' : ''}`}>
      <div className='modal'>{children}</div>
    </div>
  )
}
