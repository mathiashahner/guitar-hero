import './instructions.style.css'

import { useState } from 'react'
import { Button, Modal } from '..'
import { GAME_STATE, LINE_NOTES } from '../../../core'
import { arrowRightIcon, playIcon } from '../../../assets'
import { useGlobalGame, useGlobalUser } from '../../../contexts'

const FirstInstruction = ({ handleClick }) => {
  return (
    <>
      <div className='modal-body'>
        <p>
          &emsp;&emsp;Mor cabrito, pra comemorar seu aniversário e te inspirar, resolvi fazer este jorginho
          pra você.
        </p>
        <p>
          &emsp;&emsp;Como já vi você demonstrando interesse por música diversas vezes e até tocando algumas,
          quero te ajudar a tocar algumas que eu sei que você gosta muito.
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

      <Button src={arrowRightIcon} alt={'Next'} handleClick={handleClick} />
    </>
  )
}

const SecondInstruction = ({ handleClick }) => {
  const [globalUser] = useGlobalUser()
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [selectedMusic, setSelectedMusic] = useState(-1)

  const handleSelect = index => {
    setSelectedMusic(index)

    setGlobalGame({
      ...globalGame,
      selectedMusic: { name: globalUser[index].name, artist: globalUser[index].artist },
    })
  }

  return (
    <>
      <div className='modal-body'>
        <p>Selecione uma música:</p>

        <ul className='instructions-list'>
          {globalUser.map((music, index) => (
            <li
              key={index}
              onClick={() => handleSelect(index)}
              className={`instructions-item ${selectedMusic === index ? 'instructions-item-select' : ''}`}
            >
              <p>{music.name}</p>
              <p>{music.score}%</p>
            </li>
          ))}
        </ul>
      </div>

      <Button src={playIcon} alt={'Play'} handleClick={handleClick} />
    </>
  )
}

export const Instructions = () => {
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [nextInstruction, setNextInstruction] = useState(false)

  const handleNext = () => {
    setNextInstruction(true)
  }

  const handleStart = () => {
    setNextInstruction(false)
    setGlobalGame({ ...globalGame, state: GAME_STATE.PLAYING })
  }

  return (
    <Modal isShow={globalGame.state === GAME_STATE.HOME}>
      <h1 className='modal-title'>BIRTHDAY'S GUITAR HERO</h1>

      {!nextInstruction ? (
        <FirstInstruction handleClick={handleNext} />
      ) : (
        <SecondInstruction handleClick={handleStart} />
      )}
    </Modal>
  )
}
