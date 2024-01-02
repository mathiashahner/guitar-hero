import './game-over.style.css'

import { getScore } from '../../../core'
import { Modal } from '../modal/modal.component'
import { useGlobalGame } from '../../../contexts'

export const GameOver = ({ isShow }) => {
  const [globalGame] = useGlobalGame()

  return (
    <Modal isShow={isShow}>
      <h1>Game Over</h1>
      <p>Acertos: {globalGame.notesPlayed}</p>
      <p>Erros: {globalGame.totalErrors}</p>
      <p>Score: {getScore(globalGame)}%</p>
    </Modal>
  )
}
