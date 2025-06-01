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



const UserLayout: NextPage<TProps> = ({ children }) => {
    const theme = useTheme()
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <VerticalLayout open={open} toggleDrawer={toggleDrawer} />
            <HorizontalLayout open={open} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    bgcolor: theme =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                }}
            >
                <Toolbar />
                <Container
                    sx={{
                        m: 4,
                        width: `calc(100% - 32px)`,
                        maxWidth: `calc(100% - 32px) !important`,
                        overflow: "auto",
                        maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`,
                        Height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`,
                        padding: " 0 !important", borderRadius: "15px"
                    }}>
                    {children || <Box />}
                </Container>
            </Box>
        </Box >
    );
};

export default UserLayout;
