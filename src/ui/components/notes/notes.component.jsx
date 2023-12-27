import './notes.style.css'

import { Canvas } from '../canvas/canvas.component'
import { NOTE_SIZE, LINE_NOTES, NOTE_RADIUS } from '../../../core'

export const Notes = ({ notes, errors, setErrors }) => {
  const incrementErrors = isIncrement => {
    if (isIncrement) {
      setErrors({ ...errors, sequence: errors.sequence + 1, total: errors.total + 1 })
    } else {
      setErrors({ ...errors, sequence: 0 })
    }
  }

  const handleKeyDown = (key, context, frameCount) => {
    const height = context.canvas.height

    const currentNotes = notes.filter(note => {
      const y = note.timestamp * -NOTE_SIZE * 3 + frameCount + 500
      return y > height * 0.8 && y < height * 0.95
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

  const draw = (context, frameCount) => {
    const { width, height } = context.canvas
    const screenCrenter = width / 2

    notes.map(note => {
      const y = note.timestamp * -NOTE_SIZE * 3 + frameCount + 500

      if (!note.played && y > -NOTE_SIZE && y < height + NOTE_SIZE) {
        const noteIndex = LINE_NOTES.findIndex(line => line.key === note.key)
        const x = screenCrenter + LINE_NOTES[noteIndex].column

        context.fillStyle = LINE_NOTES[noteIndex].color
        context.beginPath()
        context.arc(x, y, NOTE_RADIUS, 0, 2 * Math.PI)
        context.fill()
      }
    })
  }

  return <Canvas draw={draw} handleKeyDown={handleKeyDown} />
}
