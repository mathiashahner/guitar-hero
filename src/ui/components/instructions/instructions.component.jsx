import './instructions.style.css'

import { Modal } from '../modal/modal.component'
import { useGlobalGame } from '../../../contexts'
import { Button } from '../button/button.component'
import { GAME_STATE, LINE_NOTES } from '../../../core'

export const Instructions = () => {
  const [globalGame, setGlobalGame] = useGlobalGame()

  const handleClick = () => {
    setGlobalGame({ ...globalGame, state: GAME_STATE.PLAYING })
  }

  return (
    <Modal isShow={globalGame.state === GAME_STATE.HOME}>
      <h1 className='modal-title'>BIRTHDAY'S GUITAR HERO</h1>

      <div className='modal-body'>
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

      <Button text={'START'} handleClick={handleClick} />
    </Modal>
  )
}
