import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import { createRole, deleteRole, getAllRole, updateRole } from 'src/services/role'

import { TParamCreateRole, TParamDeleteRole, TParamEditRole, TParamGetAllRoles } from 'src/types/role/role'

export const getAllRolesAsync = createAsyncThunk('role/get-all', async (data: { params: TParamGetAllRoles }) => {
  const response = await getAllRole(data)

  return response
})

export const createRoleAsync = createAsyncThunk('role/create', async (data: TParamCreateRole) => {
  const response = await createRole(data)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

export const updateRoleAsync = createAsyncThunk('role/update', async (data: TParamEditRole) => {
  const response = await updateRole(data)

  // if (response?.data) {
    return response
  // }

  console.log('res', { response })

  // return {
  //   data: null,
  //   message: response?.response?.data?.message,
  //   typeError: response?.response?.data?.typeError
  // }
})

export const deleteRoleAsync = createAsyncThunk('role/delete', async (id: string) => {
  const response = await deleteRole(id)

  // if (response?.data) {
    return response
  // }

  // return {
  //   data: null,
  //   message: response?.response?.data?.message,
  //   typeError: response?.response?.data?.typeError
  // }
})
