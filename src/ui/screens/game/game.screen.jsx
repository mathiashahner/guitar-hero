import './game.style.css'
import musicNotes from '../../../assets/music.json'

import { useAudio } from '../../../hooks'
import { useEffect, useState } from 'react'
import { Background, Notes } from '../../components'

export const GameScreen = () => {
  const [error, setError] = useState(0)
  const [notes, setNotes] = useState([])
  const [isPlaying, togglePlay] = useAudio('/Amanhecer no Teu Olhar.mp3')

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    const mappedNotes = musicNotes.map(line => {
      return line.map(note => {
        return { hasNote: note, played: false }
      })
    })

    setNotes(mappedNotes)
  }

  return (
    <>
      <Background error={error} />

      {isPlaying ? (
        <Notes notes={notes} setError={setError} />
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
