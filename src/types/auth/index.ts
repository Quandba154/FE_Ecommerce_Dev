export type TLoginAuth = {
  email: string
  password: string
}
export type TRegisterAuth = {
  email: string
  password: string
  // name: string
  // phone: string
  // address: string
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
}
