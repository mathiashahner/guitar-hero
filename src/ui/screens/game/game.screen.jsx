import './game.style.css'

import { useState } from 'react'
import { useAudio } from '../../../hooks'
import { Background, Instructions, Notes } from '../../components'

export const GameScreen = () => {
  const [errors, setErrors] = useState({ sequence: 0, total: 0 })
  const [playing, togglePlaying, audio] = useAudio('/Amanhecer no Teu Olhar.mp3')

  return (
    <>
      <Background playing={playing} errors={errors} />

      {playing && <Notes audio={audio} errors={errors} setErrors={setErrors} />}

      <Instructions playing={playing} togglePlaying={togglePlaying} />
    </>
  )
}
