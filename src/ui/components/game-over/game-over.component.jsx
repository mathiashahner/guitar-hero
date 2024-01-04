import './game-over.style.css'

import { Button, Modal } from '..'
import { getScore } from '../../../core'
import { useEffect, useState } from 'react'
import { arrowLeftIcon } from '../../../assets'
import { DEFAULT_GAME_STATE, useGlobalGame, useGlobalUser } from '../../../contexts'

export const GameOver = () => {
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [globalUser, setGlobalUser] = useGlobalUser()
  const [selectedMusic, setSelectedMusic] = useState({})

  useEffect(() => {
    const musicIndex = globalUser.findIndex(music => music.name === globalGame.selectedMusic.name)

    if (getScore(globalGame) > globalUser[musicIndex].score) {
      const filteredGlobalUser = globalUser.filter(music => music.name !== globalGame.selectedMusic.name)
      setGlobalUser([...filteredGlobalUser, getMusic()])
    }

    setSelectedMusic(globalUser[musicIndex])
  }, [])

  const getMusic = () => {
    return {
      score: getScore(globalGame),
      name: globalGame.selectedMusic.name,
      artist: globalGame.selectedMusic.artist,
      notesPlayed: globalGame.notesPlayed,
      totalErrors: globalGame.totalErrors,
    }
  }

  const handleClick = () => {
    setGlobalGame(DEFAULT_GAME_STATE)
  }

  return (
    <Modal isShow={true}>
      <h1 className='modal-title'>GAME OVER</h1>

      <div className='modal-body'>
        {getScore(globalGame) > selectedMusic.score && <p className='game-over-record'>NOVO RECORD</p>}

        <table>
          <thead>
            <tr>
              <th>
                {globalGame.selectedMusic.name}
                <br />
                {globalGame.selectedMusic.artist}
              </th>
              <th>Acertos</th>
              <th>Erros</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pontuação atual</td>
              <td>{globalGame.notesPlayed}</td>
              <td>{globalGame.totalErrors}</td>
              <td>{getScore(globalGame)}%</td>
            </tr>
            <tr>
              <td>Maior pontuação</td>
              <td>{selectedMusic.notesPlayed}</td>
              <td>{selectedMusic.totalErrors}</td>
              <td>{selectedMusic.score}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button src={arrowLeftIcon} alt={'Home'} handleClick={handleClick} />
    </Modal>
  )
}
