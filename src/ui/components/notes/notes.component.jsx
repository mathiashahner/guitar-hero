import './notes.style.css'

import { useEffect, useState } from 'react'
import musicNotes from '../../../assets/music.json'

const colors = ['#00903d', '#CE0E15', '#F4E401', '#0E6CB0', '#E98C00']

const Note = ({ hasNote, color }) => {
  return <div className='note' style={{ backgroundColor: hasNote ? color : 'transparent' }} />
}

const LineNotes = ({ top, children }) => {
  return (
    <>
      {top > -50 && top < 925 && (
        <div className='line-notes' style={{ top: top }}>
          {children}
        </div>
      )}
    </>
  )
}

export const Notes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => updateNotes(), 10)

    if (notes[notes.length - 1]?.top > 1000) console.log('Fim da música')

    return () => clearInterval(interval)
  }, [notes])

  const getNotes = () => {
    const mappedNotes = musicNotes.map((lineNotes, lineIndex) => {
      const line = lineNotes.map((note, noteIndex) => {
        return {
          hasNote: note,
          color: colors[noteIndex],
        }
      })

      return { notes: line, top: lineIndex * -75 - 200 }
    })

    setNotes(mappedNotes)
  }

  const updateNotes = () => {
    const updatedNotes = notes.map(lineNotes => {
      return {
        ...lineNotes,
        top: lineNotes.top + 2,
      }
    })

    setNotes(updatedNotes)
  }

  return (
    <div className='notes'>
      {notes.map((line, lineIndex) => {
        return (
          <LineNotes key={lineIndex} top={line.top}>
            {line.notes.map((note, noteIndex) => {
              return <Note key={noteIndex} hasNote={note.hasNote} color={note.color} />
            })}
          </LineNotes>
        )
      })}
    </div>
  )
}
