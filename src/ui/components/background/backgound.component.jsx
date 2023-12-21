import './background.style.css'

import { LINE_NOTES } from '../../../core'
import { String } from '../string/string.component'

export const Background = ({ error }) => {
  return (
    <div className='background'>
      <div className='background-info'>{error}</div>

      <div className='background-container'>
        {LINE_NOTES.map((line, index) => (
          <String key={index} color={line.color} />
        ))}
      </div>

      <div className='background-info'>bbb</div>
    </div>
  )
}
