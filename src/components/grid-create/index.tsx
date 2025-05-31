import { Tooltip, IconButton, Icon, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"


interface TGridCreate {
    onClick: () => void,
    disabled?: boolean
}



const GridCreate = (props: TGridCreate) => {
    const { onClick, disabled } = props
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <Tooltip title={t("Create")}>
            <IconButton
                onClick={onClick}
                disabled={disabled}
                sx={{
                    backgroundColor: `${theme.palette.primary.main} !important`, color: `${theme.palette.common.white}`
                }} >
                <Iconfi icon='ic:round-plus' />
            </IconButton>
        </Tooltip >
    )
}

export default GridCreate