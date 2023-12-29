import './game-over.style.css'

export const GameOver = ({ isShow, gameState }) => {
  return (
    <div className={`game-over-container ${!isShow ? 'game-over-hidden' : ''}`}>
      <div className='game-over'>
        <h1>Game Over</h1>
        <p>Acertos: {gameState.notesPlayed}</p>
        <p>Erros: {gameState.totalErrors}</p>
        <p>Score: {Math.round((gameState.notesPlayed / gameState.totalNotes) * 100)}%</p>
      </div>
    </div>
  )
}
