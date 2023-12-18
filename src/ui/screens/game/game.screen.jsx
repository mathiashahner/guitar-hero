import './game.style.css'

import { useAudio } from '../../../hooks'
import { useEffect, useState } from 'react'
import { Background, Notes } from '../../components'

export const GameScreen = () => {
  const [isStart, setIsStart] = useState(false)

  const { load, play } = useAudio()

  useEffect(() => {
    load('/Amanhecer no Teu Olhar.mp3')
  }, [])

  const handleStart = () => {
    setIsStart(true)
    play()
  }

  return (
    <>
      <Background />

      {isStart ? (
        <Notes />
      ) : (
        <div className='game-container'>
          <button className='game-start' onClick={handleStart}>
            START
          </button>
        </div>
      )}
    </>
  )
}
