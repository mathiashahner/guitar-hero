import './canvas.style.css'

import { useEffect, useRef } from 'react'

export const Canvas = ({ draw, handleKeyDown }) => {
  const frameCount = useRef(0)
  const canvasRef = useRef(null)
  const animationFrameId = useRef(null)

  const resize = context => {
    const canvas = context.canvas
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.scale(ratio, ratio)
    }
  }

  const clear = context => {
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const onKeyDown = event => {
      handleKeyDown(event.key, context, frameCount.current)
    }

    const render = () => {
      frameCount.current += 4.2
      resize(context)
      clear(context)
      draw(context, frameCount.current)
      animationFrameId.current = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.cancelAnimationFrame(animationFrameId.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [draw, handleKeyDown])

  return <canvas className='canvas' ref={canvasRef} />
}
