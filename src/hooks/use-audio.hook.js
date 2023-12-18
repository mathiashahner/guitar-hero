import { useMemo } from 'react'

export const useAudio = () => {
  let audio

  const load = path => {
    audio = new Audio(path)
  }

  const play = () => {
    audio.play()
  }

  return useMemo(
    () => ({
      load,
      play,
    }),
    []
  )
}
