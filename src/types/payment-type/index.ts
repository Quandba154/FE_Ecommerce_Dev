export type TParamsGetPaymentTypes = {
  limit?: number
  page?: number
  search?: string
  order?: string
}
export type TParamsCreatePaymentType = {
  email: string
}

export type TParamsEditPaymentType = {
  id: string
  name: string
}

export type TParamsDeletePaymentType = {
  id: string
}

export type TParamsDeleteMultiplePaymentType = {
  paymentTypeIds: string[]
}
