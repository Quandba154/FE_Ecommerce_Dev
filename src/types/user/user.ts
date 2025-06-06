export type TParamGetAllUsers = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamCreateUser = {
  name: string
}

export type TParamEditUser = {
  name: string
  id: string
  permissions?: string[]
}

export type TParamDeleteUser = {
  name: string
  id: string
}
