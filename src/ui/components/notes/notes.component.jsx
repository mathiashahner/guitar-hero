import './notes.style.css'

import { Canvas } from '../canvas/canvas.component'
import { NOTE_SIZE, LINE_NOTES, NOTE_RADIUS } from '../../../core'

export const Notes = ({ notes, setError }) => {
  const handleKeyDown = (key, context, frameCount) => {
    const height = context.canvas.height

    const currentLine = notes.find((_, lineIndex) => {
      const y = lineIndex * -NOTE_SIZE + frameCount
      return y > height * 0.8 && y < height * 0.95
    })

    // console.log(currentLine)

    if (!currentLine) {
      // setError(error => error + 1)
    } else {
      currentLine.map((note, index) => {
        if (note.hasNote && !note.played && LINE_NOTES[index].key === key) {
          note.played = true
          // setError(0)
        } else {
          // setError(error => error + 1)
        }
      })
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
