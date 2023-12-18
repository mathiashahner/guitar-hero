import './string.style.css'

export const String = ({ color }) => {
  return (
    <div className='string-container'>
      <div className='string' style={{ backgroundColor: color }} />
      <div className='string-circle' style={{ backgroundColor: color }} />
    </div>
  )
}
