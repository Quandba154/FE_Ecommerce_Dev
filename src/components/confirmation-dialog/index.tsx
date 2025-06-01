import { styled, InputBase, useTheme, Dialog, DialogTitle, DialogActions, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';


interface TConfirmationDialog {
    handleClose: () => void,
    open: boolean,
    title: string,
    description: string
    handleConfirm: () => void
    handleCancel: () => void
}

const CustomStyleContent = styled(DialogContentText)(() => ({
    padding: "10px 20px"
}))



const ConfirmationDialog = (props: TConfirmationDialog) => {
    // ** Props
    const { open, handleClose, description, title, handleCancel, handleConfirm } = props

    // ** Translation
    const { t } = useTranslation()

    // ** Hook
    const theme = useTheme()


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Iconfi icon="ep:warning" fontSize={100} color={theme.palette.warning.main}></Iconfi>
            </Box>
            <DialogTitle sx={{ textAlign: "center" }} >
                <Typography variant='h4' sx={{ fontWeight: "600 !important" }}>
                    {title}
                </Typography>
            </DialogTitle>
            <CustomStyleContent>
                <DialogContentText sx={{ textAlign: "center" }}>
                    {description}
                </DialogContentText>
            </CustomStyleContent>
            <DialogActions>
                <Button variant='contained' onClick={handleConfirm} sx={{ padding: '4px 10px !important', borderRadius: "4px !important" }}
                >{t("confirm")}</Button>
                <Button color="error" onClick={handleCancel} variant='outlined' sx={{ color: "red !important", padding: '4px 10px !important', borderRadius: "4px !important" }}>
                    {t("cancel")}
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog