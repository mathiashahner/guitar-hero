import './notes.style.css'
import musicNotes from '../../../assets/music.json'

import { useEffect, useState } from 'react'
import { Canvas } from '../canvas/canvas.component'
import { NOTE_SIZE, LINE_NOTES, NOTE_RADIUS } from '../../../core'

export const Notes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const getNotes = () => {
    const mappedNotes = musicNotes.map(line => {
      return line.map(note => {
        return { hasNote: note, played: false }
      })
    })

    setNotes(mappedNotes)
  }

  const updateNotes = frameCount => {
    const updatedNotes = notes.map(line => {
      return line.map(note => {
        return { ...note, played: true }
      })
    })

    setNotes(updatedNotes)
  }

  const handleKeyDown = event => {
    // event.key
  }

  const draw = (context, frameCount) => {
    const screenCrenter = context.canvas.width / 2
    // updateNotes(frameCount)

    notes.map((line, lineIndex) => {
      const y = lineIndex * -NOTE_SIZE + frameCount

      if (y > -NOTE_SIZE && y < context.canvas.height + NOTE_SIZE) {
        line.map((note, noteIndex) => {
          if (note.hasNote && !note.played) {
            const x = screenCrenter + LINE_NOTES[noteIndex].column

            context.fillStyle = LINE_NOTES[noteIndex].color
            context.beginPath()
            context.arc(x, y, NOTE_RADIUS, 0, 2 * Math.PI)
            context.fill()
          }
        })
      }
    })
  }

  return <Canvas draw={draw} />
}
