import './notes.style.css'

import { useAudio } from '../../../hooks'
import { useEffect, useState } from 'react'
import { useGlobalGame } from '../../../contexts'
import { Canvas } from '../canvas/canvas.component'
import { NOTE_SIZE, LINE_NOTES, NOTE_RADIUS } from '../../../core'

export const Notes = () => {
  const [notes, setNotes] = useState([])
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [audio, togglePlay] = useAudio(`/${globalGame.selectedMusic.name}.mp3`)

  useEffect(() => {
    import(`../../../assets/${globalGame.selectedMusic.name}.json`).then(jsonData => {
      const mappedNotes = jsonData.default.map(note => {
        return {
          played: false,
          index: Number(note.key),
          key: LINE_NOTES[note.key].key,
          timestamp: Number(note.timestamp),
        }
      })

      setGlobalGame({ ...globalGame, totalNotes: mappedNotes.length })
      setNotes(mappedNotes)
      // audio.currentTime = 0
      togglePlay()
    })
  }, [])

  const incrementErrors = isIncrement => {
    if (isIncrement) {
      setGlobalGame({
        ...globalGame,
        totalErrors: globalGame.totalErrors + 1,
        errorSequence: globalGame.errorSequence + 1,
      })
    } else {
      setGlobalGame({ ...globalGame, notesPlayed: globalGame.notesPlayed + 1, errorSequence: 0 })
    }
  }

  const handleKeyDown = (key, context) => {
    const hasKey = LINE_NOTES.some(line => line.key === key)

    if (hasKey) {
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
