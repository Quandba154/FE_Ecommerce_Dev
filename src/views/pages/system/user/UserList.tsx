// "use client"
import { NextPage } from 'next'
//** Mui
import {
    Box,
    Button,
    ChipProps,
    Grid,
    styled,
    Typography,
    useTheme
} from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'
import { GridRowSelectionModel } from '@mui/x-data-grid'

//*Yup
import * as yup from 'yup'

// ** React
import { useState, useEffect, useMemo } from 'react'

// ** Icon
import Iconfy from 'src/components/Icon'

// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { deleteMultipleUserAsync, deleteUserAsync, getAllUsersAsync, updateUserAsync } from 'src/stores/user/action'
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
import { deleteMultipleUser, getDetailsUser } from 'src/services/user'


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
import TableHeader from 'src/components/table-header'
import i18n from 'src/configs/i18n'
import { Chip } from '@mui/material'
import { getAllRole } from 'src/services/role'
import CustomSelect from 'src/components/custom-select'






type TProps = {}

type TSelectedRow = { id: string, role: { name: string, permission: string[] } }

const ActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: "#00529C29",
    color: "#00529c",
    fontSize: "14px",
    padding: "8px 4px"
}))

const DeactivateUserStyled = styled(Chip)<ChipProps>(({ theme }) => ({
    backgroundColor: `rgba(${theme.palette.primary.main}, 0.78)`,
    color: theme.palette.primary.main,
    fontSize: "14px",
    padding: "8px 4px",
    fontWeight: 600
}))



const UserListPage: NextPage<TProps> = () => {
    // ** State


    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })


    const [openDeleteUser, setOpenDeleteUser] = useState({
        open: false,
        id: ""
    })

    const [openDeleteMultipleUser, setOpenDeleteMultipleUser] = useState(false)

    const [sortBy, setSortBy] = useState("created desc")
    const [searchBy, setSearchBy] = useState("")
    const [permissionSelected, setPermissionSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
    const [page, setPage] = useState(1)

    const [selectedRow, setSelectedRow] = useState<TSelectedRow[]>([])

    const [optionRoles, setOptionRoles] = useState<{ label: string, value: string }[]>([])

    const [roleSelected, setRoleSelected] = useState("")

    const [filterBy, setFilterBy] = useState<Record<string, string>>({})





    //* Permission
    const { VIEW, UPDATE, DELETE, CREATE } = usePermission("SYSTEM.USER", ["CREATE", "VIEW", "UPDATE", "DELETE"])
    // console.log("data>>", { data });

    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { users, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete, typeError
        , isSuccessMultipleDelete, isErrorMultipleDelete, messageMultipleDelete } = useSelector((state: RootState) => state.user)


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
    const fetAllRoles = async () => {
        setLoading(true)
        await getAllRole({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data.roles
            if (data) {
                setOptionRoles(data?.map((item: { name: string; _id: string }) => ({ label: item.name, value: item._id })))
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    };

    const handleGetListUsers = () => {
        const query = { params: { limit: pageSize, page, search: searchBy, order: sortBy, ...filterBy } }
        dispatch(getAllUsersAsync(query))
    }


    const handleCloseConfirmDeleteUser = () => {
        setOpenDeleteUser({
            open: false,
            id: ""
        })
    }

    const handleCloseConfirmDeleteMultipleUser = () => {
        setOpenDeleteMultipleUser(false)
    }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        if (sortOption) {
            setSortBy(`${sortOption.field} ${sortOption.sort}`)
        } else {
            setSortBy("createdAt desc")
        }
    }

    const handleCloseCreateEdit = () => {
        setOpenCreateEdit({
            open: false,
            id: ""
        })
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
        // handleGetListUsers()
    }


    // const handleOpenEdit = (id: string) => {
    //     setOpenCreateEdit({
    //         open: true,
    //         id: id
    //     })
    // }

    const handleDeleteUser = () => {
        dispatch(deleteUserAsync(openDeleteUser.id))
    }

    const handleDeleteMultipleUser = () => {
        dispatch(deleteMultipleUserAsync({
            userIds: selectedRow?.map((item: TSelectedRow) => item.id)
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleUser(true)
                console.log("delete", { selectedRow });
                break;
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: i18n.language === "vi" ? "lastName" : "firstName",
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
                return <Typography>{row.phoneNumber}</Typography>
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
            field: 'status',
            headerName: t('Status'),
            flex: 1,
            minWidth: 180,
            maxWidth: 180,
            renderCell: params => {
                const { row } = params
                return <>
                    {row.status ? (
                        <ActiveUserStyled label={t("Active")}>

                        </ActiveUserStyled>
                    ) :
                        <DeactivateUserStyled label={t("Blocking")}>

                        </DeactivateUserStyled>
                    }
                </>
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
                                setOpenCreateEdit({
                                    open: true,
                                    id: String(params.id)
                                })
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

    const memoDisabledDeleteUser = useMemo(() => {
        return selectedRow.some((item: TSelectedRow) => item?.role?.permission?.includes(PERMISSIONS.ADMIN))
    }, [selectedRow])


    useEffect(() => {
        handleGetListUsers()
    }, [sortBy, searchBy, i18n.language, page, pageSize, filterBy])

    useEffect(() => {
        setFilterBy({ roleId: roleSelected })
    }, [roleSelected])

    useEffect(() => {
        fetAllRoles()
    }, [])


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
        if (isSuccessDelete) {
            toast.success(t("delete-user-success"))
            handleGetListUsers()
            dispatch(resetInitialState())
            handleCloseConfirmDeleteUser()
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListUsers()
    }, [isErrorDelete, isSuccessDelete, messageDelete])

    useEffect(() => {
        if (isSuccessMultipleDelete) {
            toast.success(t("delete-multiple-user-success"))
            handleGetListUsers()
            dispatch(resetInitialState())
            handleCloseConfirmDeleteMultipleUser()
            setSelectedRow([])
        } else if (isErrorMultipleDelete && messageMultipleDelete) {
            toast.error(t("Delete_multiple_user_error"))
            dispatch(resetInitialState())
        }
        handleGetListUsers()
    }, [isErrorMultipleDelete, isSuccessMultipleDelete, messageMultipleDelete])

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
            <ConfirmationDialog
                open={openDeleteMultipleUser}
                handleClose={handleCloseConfirmDeleteMultipleUser}
                handleCancel={handleCloseConfirmDeleteMultipleUser}
                handleConfirm={handleDeleteMultipleUser}
                title={t("title_delete_multiple_user")}
                description={t("confirm_delete_multiple_user")}
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
                        {!selectedRow?.length && (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, mb: 4, width: "100%" }}>
                                <Box sx={{ width: "200px" }} >
                                    <CustomSelect
                                        fullWidth
                                        onChange={(e: any) => {
                                            setRoleSelected(String(e.target.value))
                                        }}
                                        options={optionRoles}
                                        value={roleSelected}
                                        placeholder={t("Select")}
                                    />
                                </Box>
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
                        )}

                        {selectedRow?.length > 0 && (
                            <TableHeader
                                numRow={selectedRow?.length}
                                onClear={() => setSelectedRow([])}
                                actions={[{ label: t("Xoá"), value: "delete", disabled: memoDisabledDeleteUser }]}
                                handleAction={handleAction}
                            />
                        )}
                        <CustomDataGrid
                            rows={users?.data ?? []}
                            columns={columns}
                            sx={{
                                ".row-selected": {
                                    backgroundColor:
                                        `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                    color: `${theme.palette.primary.main} !important`
                                }
                            }}
                            checkboxSelection={true}
                            sortingMode='server'
                            onSortModelChange={handleSort}
                            sortingOrder={["desc", "asc"]}
                            autoHeight
                            getRowId={(row) => row._id}
                            disableRowSelectionOnClick
                            slots={{
                                pagination: PaginationComponent
                            }}
                            rowSelectionModel={selectedRow?.map((item) => item.id)}
                            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
                                const formatData: any = row.map(id => {
                                    const findRow: any = users?.data?.find((item: any) => item._id === id)
                                    if (findRow) {
                                        return { id: findRow?._id, role: findRow?.role }

                                    }
                                })
                                setSelectedRow(formatData)
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


