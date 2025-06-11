export type TParamGetAllCities = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamCreateCity = {
  name: string
}

export type TParamEditCity = {
  id: string
  name: string
  // city?: string
}

export type TParamDeleteCity = {
  id: string
}

export type TParamDeleteMultipleCity = {
  cityIds: string[]
}
