import createGlobalState from 'react-create-global-state'

const USER_LOCAL_STORAGE_KEY = 'guitar-hero-local-storage-key'

export const DEFAULT_LOCAL_STORAGE = [
  { name: 'Amanhecer no teu olhar', artist: 'Restart', maxScore: 0 },
  { name: 'Esse Amor em Mim', artist: 'Restart', maxScore: 0 },
  { name: 'Lembranças', artist: 'Restart', maxScore: 0 },
]

const localStorageValue = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
const initialUser = localStorageValue ? JSON.parse(localStorageValue) : DEFAULT_LOCAL_STORAGE

const [_useGlobalUser, GlobalUserProvider] = createGlobalState(initialUser)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setState = value => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(value))
    _setGlobalUser(value)
  }

  return [globalUser, setState]
}

export { useGlobalUser, GlobalUserProvider }
