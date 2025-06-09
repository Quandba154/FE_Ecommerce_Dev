export type TParamGetAllUsers = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamCreateUser = {
  password?: string
  firstName?: string
  middleName?: string
  lastName?: string
  email: string
  role: string
  phoneNumber: string
  address?: string
  avatar?: string
  status?: number
  // city?: string
}

export type TParamEditUser = {
  id: string
  password?: string
  firstName?: string
  middleName?: string
  lastName: string
  email: string
  role: string
  phoneNumber: string
  address?: string
  avatar?: string
  status?: number
  // city?: string
}

export type TParamDeleteUser = {
  name: string
  id: string
}

export type TParamDeleteMultipleUser = {
  userIds: string[]
}
