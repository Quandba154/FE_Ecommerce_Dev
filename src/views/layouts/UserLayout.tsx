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
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <VerticalLayout open={open} handleDrawerClose={handleDrawerClose} />
            <HorizontalLayout open={open} handleDrawerOpen={handleDrawerOpen} />
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
                <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
                    {children || <Box />}
                </Container>
            </Box>
        </Box>
    );
};

export default UserLayout;
