// ** React 
import React from 'react';
// ** Import Next.js */
import { NextPage } from 'next';

import clsx from 'clsx';
// ** MUI Imports */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Box } from '@mui/material';

// ** ICONIFY Imports */
import ListVerticalLayout from './ListVerticalLayout';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(18),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(18),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));




type TProps = {
    open: boolean,
    toggleDrawer: () => void;
}


const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
    const classes = useStyles();
    const theme = useTheme();


    return (
        <Drawer
            style={{ backgroundColor: theme.palette.background.paper }}
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <Box
                className={classes.toolbarIcon}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider />
            <ListVerticalLayout open={open}></ListVerticalLayout>
        </Drawer>
    );
}

export default VerticalLayout;