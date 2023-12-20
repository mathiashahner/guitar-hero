import './canvas.style.css'

import { useEffect, useRef } from 'react'

export const Canvas = ({ draw }) => {
  const canvasRef = useRef(null)

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

  const clean = context => {
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const render = () => {
      frameCount += 4.31
      resize(context)
      clean(context)
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas className='canvas' ref={canvasRef} />
}
