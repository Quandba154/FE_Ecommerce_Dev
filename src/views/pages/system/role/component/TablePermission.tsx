// ** React
import React, { useEffect, useState } from 'react';
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
import { LIST_DATA_PERMISSIONS } from 'src/configs/permission';
import Row from 'antd/lib/Row';



interface TTablePermission {
    // open: boolean,
    // onClose: () => void,
    // idRole?: string
}


const TablePermission = (props: TTablePermission) => {

    // ** Theme
    const theme = useTheme();

    // ** State
    const [isLoading, setLoading] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    const { t } = useTranslation()


    const columns: GridColDef[] = [
        {
            field: 'all',
            headerName: t('All'),
            minWidth: 80,
            maxWidth: 80,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return <>
                    {row.isParent && (
                        <Checkbox value={row?.view} />
                    )}
                </>
            }
        },
        {
            field: 'name',
            headerName: t('Name'),
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return <Typography sx={{
                    color: row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main} , 0.78s)`,
                    paddingLeft: row?.isParent ? "0" : "20px",
                    textTransform : row?.isParent ? "uppercase" : "normal"

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
                console.log("params", params);
                const { row } = params
                return <>
                    {!row.isHideView && !row.isParent && (
                        <Checkbox value={row?.view} />
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
                console.log("params", params);
                const { row } = params
                return <>
                    {!row.isHideCreate && !row.isParent && (
                        <Checkbox value={row?.create} />
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
                console.log("params", params);
                const { row } = params
                return <>
                    {!row.isHideUpdate && !row.isParent && (
                        <Checkbox value={row?.update} />
                    )}
                </>
            }
        },
        {
            field: 'delete',
            headerName: t('Delete'),
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                console.log("params", params);
                const { row } = params
                return <>
                    {!row.isHideDelete && !row.isParent && (
                        <Checkbox value={row?.delete} />
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