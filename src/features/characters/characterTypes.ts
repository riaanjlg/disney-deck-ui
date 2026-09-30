export interface CharacterResponse {
  id: string
  name: string
  imageUrl: string
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  enemies: string[]
  allies: string[]
}

export interface CheckGuessResponse {
  correct: boolean
}
