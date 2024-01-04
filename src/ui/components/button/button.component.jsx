import './button.style.css'

export const Button = ({ src, alt, handleClick }) => {
  return (
    <button className='button' onClick={handleClick}>
      <img className='button-img' src={src} alt={alt} />
    </button>
  )
}
