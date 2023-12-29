import './background.style.css'

import { LINE_NOTES } from '../../../core'
import { String } from '../string/string.component'

export const Background = ({ isShow, gameState }) => {
  return (
    <div className='background'>
      <div className={`background-info ${isShow ? 'left-show' : 'left-hidden'}`}>
        <p>Sequência de erros: {gameState.errorSequence}</p>
        <p>Total de erros: {gameState.totalErrors}</p>
        <p>Acertos: {gameState.notesPlayed}</p>
        <p>Score: {Math.round((gameState.notesPlayed / gameState.totalNotes) * 100)}%</p>
      </div>

      <div className={`background-container ${isShow ? 'container-show' : 'container-hidden'}`}>
        {LINE_NOTES.map((line, index) => (
          <String key={index} keyboardKey={line.key} color={line.color} />
        ))}
      </div>

      <div className={`background-info ${isShow ? 'right-show' : 'right-hidden'}`}>bbb</div>
    </div>
  )
}
