import api from '#/lib/apiClient.ts'
import type { PagedRequest, PagedResponse } from '#/types/api.ts'
import type { CharacterResponse, CheckGuessResponse } from './characterTypes'

export const charactersService = {
  getAll: async (
    query: PagedRequest,
  ): Promise<PagedResponse<CharacterResponse>> => {
    const response = await api.get('/characters', {
      params: {
        ...query,
      },
    })
    return response.data
  },

  getById: async (id: string): Promise<CharacterResponse> => {
    const response = await api.get(`/characters/${id}`)
    return response.data
  },

  getNames: async (): Promise<string[]> => {
    const response = await api.get('/characters/names')
    return response.data
  },

  getRandom: async (): Promise<CharacterResponse> => {
    const response = await api.get('/characters/random')
    return response.data
  },

  checkGuess: async (body: {
    id: string
    name: string
  }): Promise<CheckGuessResponse> => {
    const response = await api.post('/characters/check-guess', body)
    return response.data
  },
}
