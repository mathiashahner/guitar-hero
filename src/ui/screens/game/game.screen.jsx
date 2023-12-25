import './game.style.css'
import musicNotes from '../../../assets/music.json'

import { useAudio } from '../../../hooks'
import { useEffect, useState } from 'react'
import { Background, Instructions, Notes } from '../../components'

export const GameScreen = () => {
  const [notes, setNotes] = useState([])
  const [errors, setErrors] = useState({ sequence: 0, total: 0 })
  const [playing, togglePlaying] = useAudio('/Amanhecer no Teu Olhar.mp3')

  useEffect(() => {
    const mappedNotes = musicNotes.map(line => {
      return line.map(note => {
        return { hasNote: note, played: false }
      })
    })

    setNotes(mappedNotes)
  }, [])

  return (
    <>
      <Background playing={playing} errors={errors} />

      {playing && <Notes notes={notes} errors={errors} setErrors={setErrors} />}

      <Instructions playing={playing} togglePlaying={togglePlaying} />
    </>
  )
}
