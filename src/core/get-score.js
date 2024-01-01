export const getScore = gameState => {
  const { totalNotes, notesPlayed, totalErrors } = gameState
  const accuracy = notesPlayed / getValidTotalNotes(totalNotes)
  const errors = totalErrors / getValidTotalNotes(totalNotes)
  const score = Math.round((accuracy - errors) * 100)
  return score < 0 ? 0 : score
}

const getValidTotalNotes = totalNotes => {
  return totalNotes === 0 ? 0 : totalNotes
}
