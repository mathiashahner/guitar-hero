import { GAME_STATE } from '../core'
import createGlobalState from 'react-create-global-state'

export const DEFAULT_GAME_STATE = {
  totalNotes: 0,
  notesPlayed: 0,
  totalErrors: 0,
  errorSequence: 0,
  selectedMusic: {},
  state: GAME_STATE.HOME,
}

const [useGlobalGame, GlobalGameProvider] = createGlobalState(DEFAULT_GAME_STATE)

export { useGlobalGame, GlobalGameProvider }
