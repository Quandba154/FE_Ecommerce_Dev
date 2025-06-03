// ** React
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
//
import { Box, useTheme, Button, Typography, IconButton, Checkbox } from '@mui/material';

// ** form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
// i18
import { useTranslation } from 'react-i18next';
// ** component
import CustomModal from 'src/components/custom-modal';
import Spinner from 'src/components/spinner';
import Iconfi from "src/components/Icon"
import CustomTextField from 'src/components/text-field';
//** redux */
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { createRoleAsync, updateRoleAsync } from 'src/stores/role/action';
// ** Service
import { getDetailsRole } from 'src/services/role';
import CustomDataGrid from 'src/components/custom-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { LIST_DATA_PERMISSIONS, PERMISSIONS } from 'src/configs/permission';
import { getAllValueOfObject } from 'src/utils';




interface TTablePermission {
    setPermissionSelected: Dispatch<SetStateAction<string[]>>
    permissionSelected: string[]
    disabled: boolean
}


const TablePermission = (props: TTablePermission) => {

    // ** Theme
    const theme = useTheme();

    // ** State
    const [isLoading, setLoading] = useState(false)

    //** Redux */
    const dispatch: AppDispatch = useDispatch();

    const { t } = useTranslation()

    // ** Props 
    const { permissionSelected, setPermissionSelected, disabled } = props

    // ** handle 
    const getValuePermission = (value: string, mode: string, parenValue?: string) => {
        try {
            return parenValue ? PERMISSIONS[parenValue]?.[value]?.[mode] : PERMISSIONS[value]
        } catch (error) {
            return ""
        }
    }

    const handleOnChangeCheckBox = (value: string) => {
        console.log("value", { value });

        const isChecked = permissionSelected.includes(value)
        if (isChecked) {
            const filtered = permissionSelected.filter((item) => item !== value)
            setPermissionSelected(filtered)
        } else {
            setPermissionSelected([...permissionSelected, value])
        }
    }

    const handleCheckAllCheckBox = (value: string, parentValue?: string,) => {
        const allValue = parentValue ? getAllValueOfObject(PERMISSIONS[parentValue][value]) : getAllValueOfObject(PERMISSIONS[value])

        const isCheckAll = allValue.every((item) => permissionSelected.includes(item))
        if (isCheckAll) {
            const filtered = permissionSelected.filter((item) => !allValue.includes(item))
            setPermissionSelected(filtered)
        } else {
            setPermissionSelected([...permissionSelected, ...allValue])
        }

    }


    const columns: GridColDef[] = [
        {
            field: 'all',
            headerName: t(''),
            minWidth: 80,
            maxWidth: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return <>
                    {row.isParent && (
                        <Checkbox value={row?.value} onChange={(e) => {
                            if (row.isParent) {

                            } else {
                                handleCheckAllCheckBox(e.target.value, row.parentValue)
                            }
                        }} />
                    )}
                </>
            }
        },
        {
            field: 'name',
            headerName: t('Name'),
            flex: 1,
            minWidth: 200,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return <Typography sx={{
                    color: row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main} , 0.78s)`,
                    paddingLeft: row?.isParent ? "0" : "20px",
                    textTransform: row?.isParent ? "uppercase" : "normal"

                }}>
                    {t(row?.name)}
                </Typography>
            }
        },
        {
            field: 'view',
            headerName: t('View'),
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const value = getValuePermission(row.value, "VIEW", row.parentValue)
                return <>
                    {!row?.isHideView && !row.isParent && (
                        <Checkbox
                            disabled={disabled}
                            value={value}
                            onChange={e => {
                                handleOnChangeCheckBox(e.target.value)
                            }}
                            checked={permissionSelected.includes(value)}
                        />
                    )}
                </>
            }
        },
        {
            field: 'create',
            headerName: t('Create'),
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const value = getValuePermission(row.value, "CREATE", row.parentValue)

                return <>
                    {!row?.isHideCreate && !row.isParent && (
                        <Checkbox
                            disabled={disabled}
                            value={value}
                            onChange={e => {
                                handleOnChangeCheckBox(e.target.value)
                            }}
                            checked={permissionSelected.includes(value)}
                        />
                    )}
                </>
            }
        },
        {
            field: 'update',
            headerName: t('Update'),
            minWidth: 120,
            maxWidth: 120,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const value = getValuePermission(row.value, "UPDATE", row.parentValue)

                return <>
                    {!row?.isHideUpdate && !row.isParent && (
                        <Checkbox
                            disabled={disabled}
                            value={value}
                            onChange={e => {
                                handleOnChangeCheckBox(e.target.value)
                            }}
                            checked={permissionSelected.includes(value)}
                        />
                    )}
                </>
            }
        },
        {
            field: 'delete',
            headerName: t('Delete'),
            minWidth: 80,
            maxWidth: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const value = getValuePermission(row.value, "DELETE", row.parentValue)

                return <>
                    {!row?.isHideDelete && !row.isParent && (
                        <Checkbox
                            disabled={disabled}
                            value={value}
                            onChange={e => {
                                handleOnChangeCheckBox(e.target.value)
                            }}
                            checked={permissionSelected.includes(value)}
                        />
                    )}
                </>
            }
        },
    ];




    return (
        <>
            {isLoading && <Spinner></Spinner>}

            <CustomDataGrid
                rows={LIST_DATA_PERMISSIONS}
                columns={columns}
                autoHeight
                hideFooter
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnMenu
            />
        </>
    )
}

export default TablePermission