import './notes.style.css'
import musicNotes from '../../../assets/music.json'

import { useEffect, useState } from 'react'
import { Canvas } from '../canvas/canvas.component'
import { NOTE_SIZE, LINE_NOTES, NOTE_RADIUS } from '../../../core'

export const Notes = ({ audio, errors, setErrors }) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const mappedNotes = musicNotes.map(note => {
      return {
        ...note,
        played: false,
        timestamp: Number(note.timestamp),
        index: LINE_NOTES.findIndex(line => line.key === note.key),
      }
    })

    setNotes(mappedNotes)
  }, [])

  const incrementErrors = isIncrement => {
    if (isIncrement) {
      setErrors({ ...errors, sequence: errors.sequence + 1, total: errors.total + 1 })
    } else {
      setErrors({ ...errors, sequence: 0 })
    }
  }

  const handleKeyDown = (key, context) => {
    const height = context.canvas.height
    const heightToPlayNote = height * 0.9

    const currentNotes = notes.filter(note => {
      const y = getNoteHeight(note, heightToPlayNote)
      return y > height * 0.85 && y < height * 0.95
    })

    const hasNote = currentNotes.reduce((result, note) => {
      if (!note.played && note.key === key) {
        note.played = true
        return true
      }
      return result
    }, false)

    incrementErrors(!hasNote)
  }

  const draw = context => {
    const { width, height } = context.canvas
    const screenCrenter = width / 2
    const heightToPlayNote = height * 0.9
    const upperLimit = audio.currentTime + height / 200
    const lowerLimit = audio.currentTime - height / 1000

    for (const note of notes) {
      if (note.timestamp < lowerLimit) continue
      if (note.timestamp > upperLimit) break

      if (!note.played) {
        const x = screenCrenter + LINE_NOTES[note.index].column
        const y = getNoteHeight(note, heightToPlayNote)

        context.fillStyle = LINE_NOTES[note.index].color
        context.beginPath()
        context.arc(x, y, NOTE_RADIUS, 0, 2 * Math.PI)
        context.fill()
      }
    }
  }

  const getNoteHeight = (note, heightToPlayNote) => {
    return heightToPlayNote + (audio.currentTime - note.timestamp) * NOTE_SIZE * 3
  }

  return <Canvas draw={draw} handleKeyDown={handleKeyDown} />
}
