export const NOTE_GAP = 20
export const NOTE_RADIUS = 25
export const NOTE_SIZE = NOTE_RADIUS * 2 + NOTE_GAP

export const LINE_NOTES = [
  { color: '#00903d', key: 'a', column: -2 * NOTE_SIZE },
  { color: '#CE0E15', key: 's', column: -1 * NOTE_SIZE },
  { color: '#F4E401', key: 'd', column: 0 * NOTE_SIZE },
  { color: '#0E6CB0', key: 'f', column: 1 * NOTE_SIZE },
  { color: '#E98C00', key: 'g', column: 2 * NOTE_SIZE },
]

export const GAME_STATE = {
  HOME: 0,
  PLAYING: 1,
  GAME_OVER: 2,
  AWARDS: 3,
}
