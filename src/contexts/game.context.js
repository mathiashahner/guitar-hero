import { GAME_STATE } from '../core'
import { DEFAULT_LOCAL_STORAGE } from './user.context'
import createGlobalState from 'react-create-global-state'

export const DEFAULT_GAME_STATE = {
  selectedMusic: { name: DEFAULT_LOCAL_STORAGE[0].name, artist: DEFAULT_LOCAL_STORAGE[0].artist },
  totalNotes: 0,
  notesPlayed: 0,
  totalErrors: 0,
  errorSequence: 0,
  state: GAME_STATE.HOME,
}

const [useGlobalGame, GlobalGameProvider] = createGlobalState(DEFAULT_GAME_STATE)

export { useGlobalGame, GlobalGameProvider }
