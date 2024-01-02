import './game.style.css'

import { useEffect } from 'react'
import { useAudio } from '../../../hooks'
import { useGlobalGame } from '../../../contexts'
import { Background, GameOver, Instructions, Notes } from '../../components'

export const GameScreen = () => {
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [playing, togglePlaying, audio] = useAudio(`/${globalGame.selectedMusic.name}.mp3`)

  useEffect(() => {
    if (globalGame.errorSequence >= 5) {
      setGlobalGame({ ...globalGame, errorSequence: 0, gameOver: true })
      togglePlaying()
    }
  }, [globalGame, togglePlaying])

  return (
    <>
      <Background isShow={playing} />

      {playing && <Notes audio={audio} />}

      <Instructions isShow={!playing && !globalGame.gameOver} togglePlaying={togglePlaying} />

      <GameOver isShow={!playing && globalGame.gameOver} />
    </>
  )
}
