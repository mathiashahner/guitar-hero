import './background.style.css'

import { LINE_NOTES } from '../../../core'
import { String } from '../string/string.component'

export const Background = ({ playing, errors }) => {
  return (
    <div className='background'>
      <div className={`background-info ${playing ? 'left-show' : 'left-hidden'}`}>
        <p>Sequência de erros: {errors.sequence}</p>
        <p>Total de erros: {errors.total}</p>
      </div>

      <div className={`background-container ${playing ? 'container-show' : 'container-hidden'}`}>
        {LINE_NOTES.map((line, index) => (
          <String key={index} color={line.color} />
        ))}
      </div>

      <div className={`background-info ${playing ? 'right-show' : 'right-hidden'}`}>bbb</div>
    </div>
  )
}
