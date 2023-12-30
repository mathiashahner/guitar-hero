import './game-over.style.css'

import { Modal } from '../modal/modal.component'

export const GameOver = ({ isShow, gameState }) => {
  return (
    <Modal isShow={isShow}>
      <h1>Game Over</h1>
      <p>Acertos: {gameState.notesPlayed}</p>
      <p>Erros: {gameState.totalErrors}</p>
      <p>Score: {Math.round((gameState.notesPlayed / gameState.totalNotes) * 100)}%</p>
    </Modal>
  )
}
