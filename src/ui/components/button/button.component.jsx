import './button.style.css'

export const Button = ({ text, handleClick }) => {
  return (
    <button className='button' onClick={handleClick}>
      {text}
    </button>
  )
}
