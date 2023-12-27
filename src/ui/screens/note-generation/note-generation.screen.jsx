import './note-generation.style.css'

import { useEffect, useRef } from 'react'
import { useAudio } from '../../../hooks'
import { LINE_NOTES } from '../../../core'

let notes = []

export const NoteGenerationScreen = () => {
  const downloadRef = useRef(null)
  const [playing, togglePlay, audio] = useAudio('/Amanhecer no Teu Olhar.mp3')

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleKeyDown = ({ key }) => {
    const pressedNote = LINE_NOTES.find(note => note.key === key)

    if (pressedNote) {
      notes.push({
        key: pressedNote.key,
        timestamp: audio.currentTime.toFixed(2),
      })
    }
  }

  const handleStart = () => {
    togglePlay()
  }

  const handleStop = () => {
    togglePlay()

    const text = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' })
    downloadRef.current.href = URL.createObjectURL(text)
    downloadRef.current.download = 'music.json'
    downloadRef.current.click()
  }

  return (
    <div className='note-generation'>
      <button className='instructions-start' onClick={playing ? handleStop : handleStart}>
        {playing ? 'Stop recording' : 'Start recording'}
      </button>

      <a ref={downloadRef} />
    </div>
  )
}
