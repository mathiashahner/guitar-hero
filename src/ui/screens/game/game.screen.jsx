import './game.style.css'

import { GAME_STATE } from '../../../core'
import { useGlobalGame } from '../../../contexts'
import { Awards, Background, GameOver, Instructions, Notes } from '../../components'

export const GameScreen = () => {
  const [globalGame] = useGlobalGame()

  return (
    <>
      <Awards />
      <Background />
      <Instructions />
      {globalGame.state === GAME_STATE.PLAYING && <Notes />}
      {globalGame.state === GAME_STATE.GAME_OVER && <GameOver />}
    </>
  )
}
