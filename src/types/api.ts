export interface ApiResponse<T> {
  data: T
}

export type PagedResponse<T> = {
  data: T[]
  total: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type PagedRequest = {
  searchTerm?: string
  pageNumber: number
  pageSize: number
}
