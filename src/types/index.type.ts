export type CustomSuccessType = {
  message: string
  statusCode?: number
  reasonStatusCode?: string
  metadata: Record<string, any>
}

export type TQueryParams = {
  page: number
  limit: number
  skip?: number
  sortBy: string
  order: string
}
