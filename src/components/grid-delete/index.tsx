import { Tooltip, IconButton, Icon } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"


interface TGridDelete {
    onClick: () => void,
    disabled?: boolean
}



const GridDelete = (props: TGridDelete) => {
    const { onClick, disabled } = props
    const { t } = useTranslation()

    return (
        <Tooltip title={t("Delete")}>
            <IconButton
                onClick={onClick}
                disabled={disabled}
            >
                <Iconfi icon='mdi:delete-outline' />
            </IconButton>
        </Tooltip>
    )
}

export default GridDelete