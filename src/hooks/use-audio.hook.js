import { GAME_STATE } from '../core'
import { useGlobalGame } from '../contexts'
import { useEffect, useState } from 'react'

export const useAudio = path => {
  const [audio] = useState(new Audio(path))
  const [playing, setPlaying] = useState(false)
  const [globalGame, setGlobalGame] = useGlobalGame()

  const togglePlay = () => {
    setPlaying(!playing)
  }

  const onEnded = () => {
    setPlaying(false)

    setTimeout(() => {
      setGlobalGame(game => {
        return { ...game, state: GAME_STATE.GAME_OVER }
      })
    }, 100)
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  useEffect(() => {
    if (globalGame.errorSequence >= 5) {
      onEnded()
    }
  }, [globalGame.errorSequence])

  useEffect(() => {
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  return [audio, togglePlay, playing]
}
