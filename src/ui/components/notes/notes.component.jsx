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

    const currentLine = notes.find((_, lineIndex) => {
      const y = lineIndex * -NOTE_SIZE + frameCount
      return y > height * 0.8 && y < height * 0.95
    })

    if (!currentLine) {
      incrementErrors(true)
    } else {
      const hasNote = currentLine.reduce((result, note, index) => {
        if (note.hasNote && !note.played && LINE_NOTES[index].key === key) {
          note.played = true
          return true
        }
        return result
      }, false)

      incrementErrors(!hasNote)
    }
  }

  const draw = (context, frameCount) => {
    const screenCrenter = context.canvas.width / 2

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

  return <Canvas draw={draw} handleKeyDown={handleKeyDown} />
}
