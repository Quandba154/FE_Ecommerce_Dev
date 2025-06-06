import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import { createRole, deleteRole, getAllRole, updateRole } from 'src/services/role'

//** Types */
import { TParamCreateRole, TParamEditRole, TParamGetAllRoles } from 'src/types/role/role'

export const serviceName = 'role'

export const getAllRolesAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamGetAllRoles }) => {
    const response = await getAllRole(data)

    return response
  }
)

export const createRoleAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamCreateRole) => {
  const response = await createRole(data)
  return response
})

export const updateRoleAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamEditRole) => {
  const response = await updateRole(data)

  return response
})

export const deleteRoleAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteRole(id)
  return response
})
