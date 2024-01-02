import './instructions.style.css'

import { Modal } from '../modal/modal.component'
import { useGlobalGame } from '../../../contexts'
import { GAME_STATE, LINE_NOTES } from '../../../core'

export const Instructions = ({ isShow }) => {
  const [globalGame, setGlobalGame] = useGlobalGame()

  const handleClick = () => {
    setGlobalGame({ ...globalGame, state: GAME_STATE.PLAYING })
  }

  return (
    <Modal isShow={isShow}>
      <h1 className='instructions-title'>BIRTHDAY'S GUITAR HERO</h1>

      <div className='instructions-body'>
        <p>
          &emsp;&emsp;Mor cabrito, pra comemorar seu aniversário e te inspirar, resolvi fazer este jorginho
          pra você.
        </p>
        <p>
          &emsp;&emsp;Como já vi você demonstrando interesse por música diversas vezes e até tocando algumas,
          quero te ajudar a tocar uma que eu sei que você gosta muito.
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

      <button className='instructions-start' onClick={handleClick}>
        START
      </button>
    </Modal>
  )
}
