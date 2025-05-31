import { styled, ModalProps, Modal, Box } from '@mui/material';
import React from 'react';


interface TCustomModal extends ModalProps {
    onClose: () => void

}

const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
    zIndex: 1300,
    // display: "flex",
    // justifyContent: "center"
}))

const CustomModal = ({ open, onClose, children }: {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode
}) => {

    return (
        <StyleModal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
                <Box sx={{
                    height: "100%", width: "100%", minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Box sx={{ margin: "40px 0" }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </StyleModal>
    )
}

export default CustomModal