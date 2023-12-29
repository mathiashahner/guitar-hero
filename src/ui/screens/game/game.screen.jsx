import './game.style.css'

import { useAudio } from '../../../hooks'
import { useEffect, useState } from 'react'
import { INITIAL_GAME_STATE } from '../../../core'
import { Background, GameOver, Instructions, Notes } from '../../components'

export const GameScreen = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [playing, togglePlaying, audio] = useAudio('/Amanhecer no Teu Olhar.mp3')

  useEffect(() => {
    if (gameState.errorSequence >= 5) {
      setGameState({ ...INITIAL_GAME_STATE, gameOver: true })
      togglePlaying()
    }
  }, [gameState, togglePlaying])

  return (
    <>
      <Background isShow={playing} gameState={gameState} />

      {playing && <Notes audio={audio} gameState={gameState} setGameState={setGameState} />}

      <Instructions isShow={!playing && !gameState.gameOver} togglePlaying={togglePlaying} />

      <GameOver isShow={!playing && gameState.gameOver} gameState={gameState} />
    </>
  )
}
