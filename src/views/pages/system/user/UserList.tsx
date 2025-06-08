// "use client"
import { NextPage } from 'next'
//** Mui
import {
    Box,
    Button,
    Grid,
    Typography,
    useTheme
} from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'

//*Yup
import * as yup from 'yup'

// ** React
import { useState, useEffect } from 'react'

// ** Icon
import Iconfy from 'src/components/Icon'

// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { deleteUserAsync, getAllUsersAsync, updateUserAsync } from 'src/stores/user/action'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'

// ** translation 
import i18next, { t } from "i18next"

//** Component */
import CustomDataGrid from 'src/components/custom-data-grid'
import ConfirmationDialog from 'src/components/confirmation-dialog'

import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditUser from './component/CreateEditUser'
import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'

// **Service
import { getDetailsUser } from 'src/services/user'


// *Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'
import { PERMISSIONS } from 'src/configs/permission'

// ** Utils
import { getAllValueOfObject, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Other
import toast from 'react-hot-toast'

//** Hook */
import { usePermission } from 'src/hooks/usePermission'






type TProps = {}



const UserListPage: NextPage<TProps> = () => {
    // ** State


    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })

    console.log('Current modal state:', openCreateEdit)

    const [openDeleteUser, setOpenDeleteUser] = useState({
        open: false,
        id: ""
    })

    const [sortBy, setSortBy] = useState("created asc")
    const [searchBy, setSearchBy] = useState("")
    const [permissionSelected, setPermissionSelected] = useState<string[]>([])
    const [selectedRow, setSelectedRow] = useState({
        id: "",
        name: ""
    })
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
    const [page, setPage] = useState(1)


    //* Permission
    const { VIEW, UPDATE, DELETE, CREATE } = usePermission("SYSTEM.USER", ["CREATE", "VIEW", "UPDATE", "DELETE"])
    // console.log("data>>", { data });

    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { users, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete, typeError } = useSelector((state: RootState) => state.user)
    console.log('Users data from Redux:', users)


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
    const handleGetListUsers = () => {
        console.log('Fetching users with params:', { limit: pageSize, page, search: searchBy, order: sortBy })
        dispatch(getAllUsersAsync({ params: { limit: pageSize, page, search: searchBy, order: sortBy } }))
    }


    const handleCloseConfirmDeleteUser = () => {
        setOpenDeleteUser({
            open: false,
            id: ""
        })
    }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        setSortBy(`${sortOption.field} ${sortOption.sort}`)
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        handleGetListUsers()
    }

    const handleCloseCreateEdit = () => {
        console.log('Closing modal')
        setOpenCreateEdit({
            open: false,
            id: ""
        })
    }

    const handleOpenEdit = (id: string) => {
        console.log('Opening edit modal for user:', id)
        setOpenCreateEdit({
            open: true,
            id: id
        })
    }

    const handleDeleteUser = () => {
        dispatch(deleteUserAsync(openDeleteUser.id))
    }

    const columns: GridColDef[] = [
        {
            field: 'fallName',
            headerName: t('FullName'),
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const { row } = params
                const fullName = toFullName(row?.lastName || "", row?.middleName || "", row?.firstName || "", i18next.language)
                return <Typography>{fullName}</Typography>
            }
        },
        {
            field: 'email',
            headerName: t('Email'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography>{row.email}</Typography>
            }
        },
        {
            field: 'role',
            headerName: t('Role'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography>{row.role?.name || ''}</Typography>
            }
        },
        {
            field: 'phoneNumber',
            headerName: t('phone_number'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography>{row.phone_number}</Typography>
            }
        },
        {
            field: 'city',
            headerName: t('City'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography>{row.city}</Typography>
            }
        },
        {
            field: 'action',
            headerName: t('Action'),
            minWidth: 150,
            sortable: false,
            align: "left",
            renderCell: params => {
                const { row } = params
                return (
                    <>
                        <GridEdit
                            disabled={!UPDATE}
                            onClick={() => {
                                console.log('Edit button clicked')
                                console.log('Row data:', params.row)
                                handleOpenEdit(String(params.id))
                            }}></GridEdit>
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() =>
                                setOpenDeleteUser({
                                    open: true,
                                    id: String(params.id)
                                })
                            } ></GridDelete>
                    </>
                )
            }
        },
    ];



    const PaginationComponent = () => {
        return (
            <CustomPagination pageSize={pageSize} page={page} rowLength={users.total} pageSizeOption={PAGE_SIZE_OPTION} onChangePagination={handleOnchangePagination} />
        )
    }

    const handleGetDetailUsers = async (id: string) => {
        setLoading(true)
        await getDetailsUser(id).then((res) => {
            if (res?.data) {
                // if (res?.data.permissions.includes(PERMISSIONS.ADMIN)) {
                //     setIsDisablePermission(true)
                //     setPermissionSelected(getAllValueOfObject(
                //         PERMISSIONS, [PERMISSIONS.ADMIN, PERMISSIONS.BASIC]
                //     ))
                // } else if (res?.data.permissions.includes(PERMISSIONS.BASIC)) {
                //     setIsDisablePermission(true)
                //     setPermissionSelected([PERMISSIONS.DASHBOARD])
                // } else {
                //     setIsDisablePermission(false)
                //     setPermissionSelected(res?.data?.permissions || [])
                // }
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }



    useEffect(() => {
        if (isSuccessCreateEdit) {
            if (!openCreateEdit.id) {
                toast.success(t("create-user-success"))
            } else {
                toast.success(t("update-user-success"))
            }
            handleGetListUsers()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit && typeError) {
            const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
            if (errorConfig) {
                toast.error(t(errorConfig))
            } else {
                if (openCreateEdit.id) {
                    toast.error(t("Update_user_error"))
                } else {
                    toast.error(t("Create_user_error"))
                }
            }
            dispatch(resetInitialState())
        }
        handleGetListUsers()
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit, typeError])

    useEffect(() => {
        handleGetListUsers()
    }, [sortBy, searchBy])

    useEffect(() => {
        if (selectedRow.id) {
            handleGetDetailUsers(selectedRow.id)
        }
    }, [selectedRow])


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete-user-success"))
            handleGetListUsers()
            dispatch(resetInitialState())
            handleDeleteUser()
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListUsers()
    }, [isErrorDelete, isSuccessDelete, messageDelete])

    return (
        <>
            {loading && <Spinner></Spinner>}
            <ConfirmationDialog
                open={openDeleteUser.open}
                handleClose={handleCloseConfirmDeleteUser}
                handleCancel={handleCloseConfirmDeleteUser}
                handleConfirm={handleDeleteUser}
                title={t("title_delete_user")}
                description={t("confirm_delete_user")}
            />
            <CreateEditUser open={openCreateEdit.open} onClose={handleCloseCreateEdit} idUser={openCreateEdit.id} />
            {isLoading && <Spinner />}
            <Box sx={{
                display: "flex",
                // backgroundColor: theme.palette.background.paper,
                alignItems: "center",
                padding: "20px",
                width: "100%", height: "100% !important"
            }}>
                <Box display={{
                    xs: "none",
                    sm: "flex"
                }} sx={{
                    justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: "100% !important", width: "100%",
                }}>

                    <Grid container sx={{ height: "100%", width: "100%" }} >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, mb: 4, width: "100%" }}>
                            <Box sx={{ width: "200px" }}>
                                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} ></InputSearch>
                            </Box>
                            <GridCreate
                                disabled={!CREATE}
                                onClick={() => {
                                    setOpenCreateEdit({
                                        open: true,
                                        id: ""
                                    })
                                }
                                } ></GridCreate>
                        </Box>
                        <CustomDataGrid
                            rows={users?.data ?? []}
                            columns={columns}
                            pageSizeOptions={[5]}
                            sx={{
                                ".row-selected": {
                                    backgroundColor:
                                        `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                    color: `${theme.palette.primary.main} !important`
                                }
                            }}
                            sortingMode='server'
                            onSortModelChange={handleSort}
                            sortingOrder={["desc", "asc"]}
                            autoHeight
                            getRowId={(row) => row._id}
                            disableRowSelectionOnClick
                            slots={{
                                pagination: PaginationComponent
                            }}
                            getRowClassName={(row: GridRowClassNameParams) => {
                                return row.id === selectedRow.id ? "row-selected" : ''
                            }}
                            onRowClick={(row) => {
                                setSelectedRow({ id: String(row.id), name: row?.row?.name })
                                setOpenCreateEdit({
                                    open: false,
                                    id: String(row.id)
                                })
                            }}
                            disableColumnFilter
                            disableColumnMenu
                        />
                    </Grid>
                </Box>
            </Box >
        </>
    )
}

export default UserListPage;


