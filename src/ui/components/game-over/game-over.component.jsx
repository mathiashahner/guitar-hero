import './game-over.style.css'

import { getScore } from '../../../core'
import { useEffect, useState } from 'react'
import { Modal } from '../modal/modal.component'
import { DEFAULT_GAME_STATE, useGlobalGame, useGlobalUser } from '../../../contexts'

export const GameOver = () => {
  const [globalGame, setGlobalGame] = useGlobalGame()
  const [globalUser, setGlobalUser] = useGlobalUser()
  const [selectedMusic, setSelectedMusic] = useState({})

  useEffect(() => {
    const newScore = getScore(globalGame)
    const musicIndex = globalUser.findIndex(music => music.name === globalGame.selectedMusic.name)

    if (newScore > globalUser[musicIndex].score) {
      const filteredGlobalUser = globalUser.filter(music => music.name !== globalGame.selectedMusic.name)

      setGlobalUser([
        ...filteredGlobalUser,
        {
          score: newScore,
          name: globalGame.selectedMusic.name,
          artist: globalGame.selectedMusic.artist,
          notesPlayed: globalGame.notesPlayed,
          totalErrors: globalGame.totalErrors,
        },
      ])
    }

    setSelectedMusic(globalUser[musicIndex])
  }, [])

  const handleClick = () => {
    setGlobalGame(DEFAULT_GAME_STATE)
  }

  return (
    <Modal isShow={true}>
      <h1 className='modal-title'>GAME OVER</h1>

      <div className='modal-body'>
        {getScore(globalGame) > selectedMusic.score && <p>NOVO RECORD</p>}

        <table>
          <thead>
            <tr>
              <th>{`${globalGame.selectedMusic.name} ${globalGame.selectedMusic.artist}`}</th>
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

      <button className='instructions-start' onClick={handleClick}>
        INÍCIO
      </button>
    </Modal>
  )
}
