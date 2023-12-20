import './game.style.css'

import { useAudio } from '../../../hooks'
import { Background, Notes } from '../../components'

export const GameScreen = () => {
  const [playing, togglePlay] = useAudio('/Amanhecer no Teu Olhar.mp3')

  return (
    <>
      <Background />

      {playing ? (
        <Notes />
      ) : (
        <div className='game-container'>
          <button className='game-start' onClick={togglePlay}>
            START
          </button>
        </div>
      )}
    </>
  )
}
