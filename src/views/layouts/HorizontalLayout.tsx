//** React */
import React from 'react';
import clsx from 'clsx';
// ** Material UI Imports
import { makeStyles } from '@material-ui/core/styles'; // Thêm useTheme
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// ** next imports 
import { NextPage } from 'next';
// ** iCONIFY Imports
import IconifyIcon from "src/components/Icon"
import UserDropdown from 'src/views/layouts/Components/user-dropdown';
// darkmode
import ModeToggle from './Components/mode-toggle';
import { AppBarProps, Badge, Button, duration, easing, styled } from '@mui/material';
import LanguageDropdown from './Components/language-dropdown';
// ** hook
import { useAuth } from 'src/hooks/useAuth';
//router
import { useRouter } from 'next/router';
// CONFIG ROUTE
import { ROUTE_CONFIG } from 'src/configs/route';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        margin: "0 20px",
        paddingRight: "30px",
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
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
}));

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: prop => prop !== "open"
// })<AppBarProps>(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen
//     })
// }))

type TProps = {
    open: boolean,
    handleDrawerOpen: () => void,
    isHideMenu?: boolean;
}

const HorizontalLayout: NextPage<TProps> = ({ open, handleDrawerOpen, isHideMenu }) => {
    const classes = useStyles();

    const { user } = useAuth()

    const router = useRouter();


    return (
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                {!isHideMenu && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <IconifyIcon icon="ic:round-menu" />
                    </IconButton>
                )}
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                </Typography>
                <LanguageDropdown></LanguageDropdown>
                <ModeToggle></ModeToggle>
                {user ? (
                    <UserDropdown />
                ) : (
                    <Button sx={{ ml: 2, width: "auto" }} variant='contained' color='primary' onClick={() => router.push(ROUTE_CONFIG.LOGIN)}>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar >
    );
}

export default HorizontalLayout;