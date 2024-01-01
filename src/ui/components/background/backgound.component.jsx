import './background.style.css'

import { String } from '../string/string.component'
import { okIcon, errorIcon } from '../../../assets'
import { LINE_NOTES, getScore } from '../../../core'

export const Background = ({ isShow, gameState }) => {
  return (
    <div className='background'>
      <div className={`background-info ${!isShow ? 'left-hidden' : ''}`}>
        <div>
          <p className='background-text-title'>Amanhacer no teu olhar</p>
          <p className='background-text-small'>Restart</p>
        </div>
      </div>

      <div className={`background-container ${!isShow ? 'container-hidden' : ''}`}>
        {LINE_NOTES.map((line, index) => (
          <String key={index} keyboardKey={line.key} color={line.color} />
        ))}
      </div>

      <div className={`background-info-right ${!isShow ? 'right-hidden' : ''}`}>
        <p className='background-text-score'>{getScore(gameState)}%</p>

        <div>
          <p className='background-text'>{gameState.notesPlayed}</p>
          <img className='background-icon' src={okIcon} alt='Errors' />
        </div>

        <div>
          <p className='background-text'>{gameState.totalErrors}</p>
          <img className='background-icon' src={errorIcon} alt='Errors' />
        </div>
      </div>
    </div>
  )
}
