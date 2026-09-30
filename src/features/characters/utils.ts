import type { CharacterResponse } from './characterTypes'

export const getFeaturedIn = (character?: CharacterResponse) => {
  if (!character) return []
  return [
    ...character.films,
    ...character.shortFilms,
    ...character.tvShows,
    ...character.videoGames,
  ]
}
