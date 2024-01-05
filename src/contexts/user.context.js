import createGlobalState from 'react-create-global-state'

const USER_LOCAL_STORAGE_KEY = 'guitar-hero-local-storage-key'

const DEFAULT_LOCAL_STORAGE = [
  { name: 'Amanhecer no teu olhar', artist: 'Restart', score: 0, notesPlayed: 0, totalErrors: 0 },
  { name: 'Esse amor em mim', artist: 'Restart', score: 0, notesPlayed: 0, totalErrors: 0 },
  { name: 'Lembranças', artist: 'Restart', score: 0, notesPlayed: 0, totalErrors: 0 },
]

const localStorageValue = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
const initialUser = localStorageValue ? JSON.parse(localStorageValue) : DEFAULT_LOCAL_STORAGE

const [_useGlobalUser, GlobalUserProvider] = createGlobalState(initialUser)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setState = value => {
    value.sort(comparisonFunction)
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(value))
    _setGlobalUser(value)
  }

  return [globalUser, setState]
}

const comparisonFunction = (a, b) => {
  if (a.name > b.name) return 1
  if (a.name < b.name) return -1
  return 0
}

export { useGlobalUser, GlobalUserProvider }
