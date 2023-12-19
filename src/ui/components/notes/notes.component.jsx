import './notes.style.css'

import { useEffect } from 'react'
import { LINE_NOTES } from '../../../core'
import { Canvas } from '../canvas/canvas.component'
import musicNotes from '../../../assets/music.json'

export const Notes = () => {
  useEffect(() => {
    const handleKeyDown = event => console.log(event.key)

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const draw = (context, frameCount) => {
    const screenCenter = context.canvas.width / 2

    musicNotes.map((line, lineIndex) => {
      const y = lineIndex * -75 + frameCount

      line.map((note, noteIndex) => {
        if (note) {
          const x = screenCenter + LINE_NOTES[noteIndex].column * 70

          context.fillStyle = LINE_NOTES[noteIndex].color
          context.beginPath()
          context.arc(x, y, 25, 0, 2 * Math.PI)
          context.fill()
        }
      })
    })
  }

  return <Canvas draw={draw} />
}
