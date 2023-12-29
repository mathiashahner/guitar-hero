import './string.style.css'

export const String = ({ keyboardKey, color }) => {
  return (
    <div className='string-container'>
      <div className='string' style={{ backgroundColor: color }} />
      <div className='string-circle' style={{ border: `4px solid ${color}`, color: color }}>
        {keyboardKey.toUpperCase()}
      </div>
    </div>
  )
}
