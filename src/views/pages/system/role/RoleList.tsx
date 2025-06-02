// "use client"
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
    Box,

    Grid,
    useTheme
} from '@mui/material'
// ** Form
import { Controller, useForm } from 'react-hook-form'
// ** Components
import CustomTextField from 'src/components/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** REGEX
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
// ** React
import { useState, useEffect } from 'react'
// ** Icon
import Iconfy from 'src/components/Icon'
// ** Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import facebookSvg from '/public/svgs/facebook.svg'
// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { changePasswordMeAsync } from 'src/stores/auth/action'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
// ** Other
import toast from 'react-hot-toast'
// ** translation 
import { t } from "i18next"
import { useTranslation } from 'react-i18next';
import { useAuth } from 'src/hooks/useAuth'
import { deleteRoleAsync, getAllRolesAsync } from 'src/stores/role/action'
import CustomDataGrid from 'src/components/custom-data-grid'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import CustomPagination from 'src/components/custom-pagination'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './component/CreateEditRole'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'
import TablePermission from './component/TablePermission'






type TProps = {}



const RoleListPage: NextPage<TProps> = () => {
    // ** State
    const [page, setPage] = useState(PAGE_SIZE_OPTION[0])
    const [pageSize, setPageSize] = useState(1)
    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })

    const [openDeleteRole, setOpenDeleteRole] = useState({
        open: false,
        id: ""
    })

    const [sortBy, setSortBy] = useState("created asc")
    const [searchBy, setSearchBy] = useState("")



    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { roles, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete, typeError } = useSelector((state: RootState) => state.role)




    //** router */
    const router = useRouter()

    // schema
    const schema = yup
        .object()
        .shape({

        })

    // ** Theme
    const theme = useTheme();

    // ** Fetch api
    const handleGetListRoles = () => {
        dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }))
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => { }

    const handleCloseCreateEdit = () => {
        setOpenCreateEdit({
            open: false,
            id: ""
        })
    }

    const handleDeleteRole = () => {
        dispatch(deleteRoleAsync(openDeleteRole.id))
    }


    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        setSortBy(`${sortOption.field} ${sortOption.sort}`)
    }

    const handleCloseConfirmDeleteRole = () => {
        setOpenDeleteRole({
            open: false,
            id: ""
        })
    }



    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('Name'),
            flex: 1
        },
        {
            field: 'action',
            headerName: t('Action'),
            minWidth: 150,
            sortable: false,
            align: "left",
            renderCell: params => {
                const { row } = params
                console.log("row", { row });

                return (
                    <Box sx={{ width: "100%" }}>
                        {!row?.permissions?.some((per: string) => ["ADMIN.GRANTED", "BASIC.PUBLIC"]?.includes(per)) ? (
                            <>
                                <GridEdit onClick={() => setOpenCreateEdit({
                                    open: true,
                                    id: String(params.id)
                                })}></GridEdit>
                                <GridDelete onClick={() =>
                                    setOpenDeleteRole({
                                        open: true,
                                        id: String(params.id)
                                    })
                                } ></GridDelete>
                            </>
                        ) : (
                            <Iconfy icon="material-symbols-light:lock-outline" fontSize={30} />
                        )}
                    </Box >
                )
            }
        },
    ];



    // const PaginationComponent = () => {
    //     return (
    //         <CustomPagination pageSize={pageSize} page={page} rowLength={roles.total} pageSizeOption={PAGE_SIZE_OPTION} onChangePagination={handleOnchangePagination} />
    //     )
    // }

    useEffect(() => {
        handleGetListRoles()
    }, [sortBy, searchBy])

    useEffect(() => {
        if (isSuccessCreateEdit) {
            if (openCreateEdit.id) {
                toast.success(t("update-role-success"))
            } else {
                toast.success(t("create-role-success"))
            }
            handleGetListRoles()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit && typeError) {
            const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
            if (errorConfig) {
                toast.error(t(errorConfig))
            } else {
                if (openCreateEdit.id) {
                    toast.error(t("Update_role_error"))
                } else {
                    toast.error(t("Create_role_error"))
                }
            }
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit, typeError])


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete-role-success"))
            handleGetListRoles()
            dispatch(resetInitialState())
            handleDeleteRole()
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isErrorDelete, isSuccessDelete, messageDelete])

    return (
        <>
            <ConfirmationDialog
                open={openDeleteRole.open}
                handleClose={handleCloseConfirmDeleteRole}
                handleCancel={handleCloseConfirmDeleteRole}
                handleConfirm={handleDeleteRole}
                title={t("title_delete_role")}
                description={t("confirm_delete_role")}
            />
            <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
            {isLoading && <Spinner />}
            <Box sx={{ backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", padding: "20px", width: "100%", height: "100% !important" }}>
                <Box display={{
                    xs: "none",
                    sm: "flex"
                }} sx={{
                    justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: "100% !important", width: "100%",
                }}>

                    <Grid container sx={{ height: "100%", width: "100%" }} spacing={10}>
                        <Grid item md={4} xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                <Box sx={{ width: "200px" }}>
                                    <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} ></InputSearch>
                                </Box>
                                <GridCreate onClick={() => setOpenCreateEdit({
                                    open: true,
                                    id: ""
                                })} ></GridCreate>
                            </Box>
                            <Box sx={{ maxHeight: "100%" }}>
                                <CustomDataGrid
                                    rows={roles.data}
                                    columns={columns}
                                    pageSizeOptions={[5]}
                                    // checkboxSelection
                                    sortingMode='server'
                                    onSortModelChange={handleSort}
                                    sortingOrder={["desc", "asc"]}
                                    autoHeight
                                    getRowId={(row) => row._id}
                                    disableRowSelectionOnClick
                                    // slots={{
                                    //     pagination: PaginationComponent
                                    // }}
                                    disableColumnFilter
                                    disableColumnMenu
                                />
                            </Box>
                        </Grid>
                        <Grid item md={8} xs={12} sx={{ maxHeight: "100%" }}>
                            <TablePermission></TablePermission>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default RoleListPage;


