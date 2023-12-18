import './background.style.css'

import { String } from '../string/string.component'

export const Background = () => {
  return (
    <div className='background'>
      <div className='background-container'>
        <String color={'#00903d'} />
        <String color={'#CE0E15'} />
        <String color={'#F4E401'} />
        <String color={'#0E6CB0'} />
        <String color={'#E98C00'} />
      </div>
    </div>
  )
}
