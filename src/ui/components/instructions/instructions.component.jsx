import './instructions.style.css'

import { LINE_NOTES } from '../../../core'

export const Instructions = ({ playing, togglePlaying }) => {
  return (
    <div className={`instructions-container ${playing ? 'instructions-hidden' : ''}`}>
      <div className='instructions'>
        <h1 className='instructions-title'>BIRTHDAY'S GUITAR HERO</h1>

        <div className='instructions-body'>
          <p>
            &emsp;&emsp;Mor cabrito, pra comemorar seu aniversário e te inspirar, resolvi fazer este jorginho
            pra você.
          </p>
          <p>
            &emsp;&emsp;Como já vi você demonstrando interesse por música diversas vezes e até tocando
            algumas, quero te ajudar a tocar uma que eu sei que você gosta muito.
          </p>
          <p>Para jogar, você vai utilizar as seguintes teclas:</p>

          <ul className='instructions-notes'>
            {LINE_NOTES.map((note, index) => (
              <li key={index} className='instructions-note' style={{ border: `3px solid ${note.color}` }}>
                {note.key.toUpperCase()}
              </li>
            ))}
          </ul>

          <p>Feliz aniversário, te amo muito!</p>
        </div>

        <button className='instructions-start' onClick={togglePlaying}>
          START
        </button>
      </div>
    </div>
  )
}
