import './awards.style.css'

import { useState } from 'react'
import { Button, Modal } from '..'
import { GAME_STATE } from '../../../core'
import { arrowLeftIcon } from '../../../assets'
import { DEFAULT_GAME_STATE, useGlobalGame, useGlobalUser } from '../../../contexts'

const AwardsItem = ({ music }) => {
  const [hovered, setHovered] = useState(false)

  const toggleHovered = () => {
    setHovered(!hovered)
  }

  const getTranslationValue = () => {
    if (music.score === 0) return '-100%'
    if (music.score > 75) return '0%'
    return -75 + music.score + '%'
  }

  const overlayStyle = {
    transform: `translateX(${hovered ? getTranslationValue() : '-100%'})`,
  }

  return (
    <li className='awards-item' onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
      <p className='awards-music-name'>
        {music.name}, <span>{music.artist}</span>
      </p>
      <p>{music.score}%</p>

      <p className='awards-item-hint' style={overlayStyle}>
        {music.hint}
      </p>
    </li>
  )
}

export const Awards = () => {
  const [globalUser] = useGlobalUser()
  const [globalGame, setGlobalGame] = useGlobalGame()

  const handleHome = () => {
    setGlobalGame(DEFAULT_GAME_STATE)
  }

  return (
    <Modal isShow={globalGame.state === GAME_STATE.AWARDS}>
      <h1 className='modal-title'>PREMIAÇÃO</h1>

      <div className='modal-body'>
        <p>Aqui estão algumas dicas para você encontrar seu presente:</p>

        <ul className='awards-list'>
          {globalUser.map((music, index) => (
            <AwardsItem key={index} music={music} />
          ))}
        </ul>
      </div>

      <Button src={arrowLeftIcon} alt={'Back'} handleClick={handleHome} />
    </Modal>
  )
}
