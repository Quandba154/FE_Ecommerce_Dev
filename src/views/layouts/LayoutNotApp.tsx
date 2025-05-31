//** React */
import React from 'react';
//** Next.js */
import { NextPage } from 'next';
// ** MUI Imports */
import {
    Box,
    CssBaseline,
    Container,
    Toolbar,
    useTheme,
} from '@mui/material';

// ** View */
import VerticalLayout from './VerticalLayout';
import HorizontalLayout from './HorizontalLayout';

type TProps = {
    children: React.ReactNode;
};


const LayoutNotApp: NextPage<TProps> = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HorizontalLayout open={false} toggleDrawer={() => { }} isHideMenu />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    bgcolor:
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                }}
            >
                <Toolbar />
                <Container sx={{ m: 4, width: "calc(100vw-32px)", maxWidth: "unset !important", overflow: "auto", maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`, padding: " 0 !important", borderRadius: "15px" }}>
                    {children || <Box />}
                </Container>
            </Box>
        </Box>
    );
};

export default LayoutNotApp;
