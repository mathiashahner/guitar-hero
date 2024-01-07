import './instructions.style.css'

import { useState } from 'react'
import { Button, Modal } from '..'
import { GAME_STATE, LINE_NOTES } from '../../../core'
import { useGlobalGame, useGlobalUser } from '../../../contexts'
import { arrowLeftIcon, arrowRightIcon, trophyIcon } from '../../../assets'

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

  const handleStart = index => {
    handleClick()

    setGlobalGame({
      ...globalGame,
      state: GAME_STATE.PLAYING,
      selectedMusic: { name: globalUser[index].name, artist: globalUser[index].artist },
    })
  }

  const handleAwards = () => {
    handleClick()
    setGlobalGame({ ...globalGame, state: GAME_STATE.AWARDS })
  }

  return (
    <>
      <div className='modal-body'>
        <p>Selecione uma música:</p>

        <ul className='instructions-list'>
          {globalUser.map((music, index) => (
            <li key={index} onClick={() => handleStart(index)} className='instructions-item'>
              <p className='instructions-music-name'>
                {music.name}, <span>{music.artist}</span>
              </p>
              <p>{music.score}%</p>
            </li>
          ))}
        </ul>
      </div>

      <div className='modal-buttons'>
        <Button src={arrowLeftIcon} alt={'Back'} handleClick={handleClick} />
        <Button src={trophyIcon} alt={'Awards'} handleClick={handleAwards} />
      </div>
    </>
  )
}

export const Instructions = () => {
  const [globalGame] = useGlobalGame()
  const [nextInstruction, setNextInstruction] = useState(false)

  const toggleInstruction = () => {
    setNextInstruction(!nextInstruction)
  }

  return (
    <Modal isShow={globalGame.state === GAME_STATE.HOME}>
      <h1 className='modal-title'>BIRTHDAY'S GUITAR HERO</h1>

      {!nextInstruction ? (
        <FirstInstruction handleClick={toggleInstruction} />
      ) : (
        <SecondInstruction handleClick={toggleInstruction} />
      )}
    </Modal>
  )
}
