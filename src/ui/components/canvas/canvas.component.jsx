import './canvas.style.css'

import { useEffect, useRef } from 'react'

export const Canvas = ({ draw, handleKeyDown }) => {
  const canvasRef = useRef(null)
  const animationFrame = useRef(null)

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
      handleKeyDown(event.key, context)
    }

    const render = () => {
      resize(context)
      clear(context)
      draw(context)
      animationFrame.current = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.cancelAnimationFrame(animationFrame.current)
    }
  }, [draw, handleKeyDown])

  return <canvas className='canvas' ref={canvasRef} />
}
