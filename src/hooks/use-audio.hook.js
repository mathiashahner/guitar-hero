import { useEffect, useState } from 'react'
import { useGlobalGame } from '../contexts'

export const useAudio = url => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)
  const [globalGame, setGlobalGame] = useGlobalGame()

  const togglePlay = () => {
    setPlaying(!playing)
  }

  const onEnded = () => {
    setGlobalGame({ ...globalGame, gameOver: true })
    setPlaying(false)
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  return [playing, togglePlay, audio]
}
