import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles(({ palette }) => ({
    page: {
        height: '100vh',
        backgroundColor: palette.background.main,
        overflow: 'hidden',
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function getItem(i) {
    if (i === 0) return <DashboardIcon />
    else if (i === 1) return <AddIcon />
    else if (i === 2) return <VisibilityIcon />
    else if (i === 3) return <NotificationsIcon />
    else if (i === 4) return <AnnouncementIcon />
}

function generateListItems(items, handleClick, expand) {
    return items.map((item, i) => (
        generateListItem(item, i, handleClick, expand)
    ));
}

function generateListItem(item, i, handleClick, expand) {
    if (i === 1) {
        return (
            [<ListItemButton onClick={handleClick} key={i}>
                <ListItemIcon>{getItem(i)}</ListItemIcon>
                <ListItemText primary={item} />
                {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>,
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <List component="div" >
                    {generateListItem('Watchlist', 2, handleClick, expand)}
                    {generateListItem('News', 4, handleClick, expand)}
                </List>
            </Collapse>]
        )
    }
    else {
        return (
            <ListItemButton key={i}>
                <ListItemIcon>{getItem(i)}</ListItemIcon>
                <ListItemText primary={item} />
            </ListItemButton>
        )
    }
}

export default function Dashboard() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [expand, setExpand] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setExpand(!expand);
    }

    return (
        <div className={classes.page}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color="secondary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {generateListItems(['Dashboard', 'Add panel', 'Watchlist', 'Notifications'], handleClick, expand)}
                </List>
            </Drawer>
        </div>
    );
}
