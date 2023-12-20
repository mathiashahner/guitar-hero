import { useEffect, useState } from 'react'

export const useAudio = url => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing])

  return [playing, togglePlay]
}
