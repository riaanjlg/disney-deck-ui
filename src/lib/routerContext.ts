import { createQueryClient } from './queryClient'

export const createRouterContext = () => {
  const queryClient = createQueryClient()

  return {
    queryClient,
  }
}
