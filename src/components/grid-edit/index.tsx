import { Tooltip, IconButton, Icon } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"


interface TGridEdit {
    onClick: () => void,
    disabled?: boolean
}



const GridEdit = (props: TGridEdit) => {
    const { onClick, disabled } = props

    const { t } = useTranslation()

    return (
        <Tooltip title={t("Edit")}>
            <IconButton onClick={onClick}
                disabled={disabled}>
                <Iconfi icon='tabler:edit' />
            </IconButton>
        </Tooltip>
    )
}

export default GridEdit