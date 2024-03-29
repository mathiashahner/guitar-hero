import './note-generation.style.css'

import { useEffect, useRef } from 'react'
import { useAudio } from '../../../hooks'
import { Button } from '../../components'
import { LINE_NOTES } from '../../../core'
import { pauseIcon, playIcon } from '../../../assets'

let notes = []

export const NoteGenerationScreen = () => {
  const downloadRef = useRef(null)
  const [audio, togglePlay, played] = useAudio('/Lembranças.mp3')

  useEffect(() => {
    // audio.currentTime = 0
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

  const handleStop = () => {
    togglePlay()

    const text = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' })
    downloadRef.current.href = URL.createObjectURL(text)
    downloadRef.current.download = 'music.json'
    downloadRef.current.click()
  }

  return (
    <div className='note-generation'>
      <Button
        src={played ? pauseIcon : playIcon}
        alt={played ? 'Stop recording' : 'Start recording'}
        handleClick={played ? handleStop : togglePlay}
      />

      <a ref={downloadRef} />
    </div>
  )
}
