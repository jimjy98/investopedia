import React, { useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import { Toolbar, AppBar as MuiAppBar, IconButton, Drawer as MuiDrawer, List, Divider, ListItemButton, ListItemIcon, ListItemText, Collapse, CssBaseline, Box, Typography } from '@mui/material';
import { 
  Menu as MenuIcon, 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon, 
  Dashboard as DashboardIcon, 
  Add as AddIcon, 
  Visibility as VisibilityIcon, 
  Notifications as NotificationsIcon,
  Announcement as AnnouncementIcon,
  ExpandLess, 
  ExpandMore 
                    } from '@mui/icons-material';
import { makeStyles, } from '@mui/styles';
import { styled, useTheme } from '@mui/material/styles';

import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/Watchlist";
import Notifications from './pages/Notifications';

const drawerWidth = 240;

const useStyles = makeStyles(({ palette }) => ({
  drawer: {
    flex: 0,
  },
  page: {
    height: '100vh',
    backgroundColor: palette.background.main,
    overflow: 'hidden',
  },
  gridItem: {
    border: '1px solid lightgrey',
    borderRadius: '25px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
    width: '35%',
    marginRight: '2%',
  }
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

function getIcon(i) {
  if (i === 0) return <DashboardIcon />
  else if (i === 1) return <VisibilityIcon />
  else if (i === 2) return <AddIcon />
  else if (i === 3) return <NotificationsIcon />
  else if (i === 4) return <AnnouncementIcon />
}

function generateListItems(items, handleClick, expand, handleHideWatchlist, handleHideNewsPanel) {
  return items.map((item, i) => (
    generateListItem(item, i, handleClick, expand, handleHideWatchlist, handleHideNewsPanel)
  ));
}

function generateListItem(item, i, handleClick, expand, handleHideWatchlist, handleHideNewsPanel) {
  if (!item.path) {
    return (
      [<ListItemButton onClick={handleClick} key={i}>
        <ListItemIcon>{getIcon(i)}</ListItemIcon>
        <ListItemText primary={item.name} />
        {expand ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>,
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" >
          <ListItemButton key='1' sx={{ pl: 4 }} onClick={handleHideWatchlist}>
            <ListItemIcon>{getIcon(1)}</ListItemIcon>
            <ListItemText primary='Watchlist' />
          </ListItemButton>
          <ListItemButton key='4' sx={{ pl: 4 }} onClick={handleHideNewsPanel}>
            <ListItemIcon>{getIcon(4)}</ListItemIcon>
            <ListItemText primary='News' />
          </ListItemButton>
        </List>
      </Collapse>]
    )
  }
  else {
    return (
      <Link to={item.path}>
        <ListItemButton key={i}>
          <ListItemIcon>{getIcon(i)}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
    )
  }
}

const pages = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Watchlist', path: '/watchlist' },
  { name: 'Add panel' },
  { name: 'Notifcations', path: '/notifications' },
];

export const App = () => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [hideWatchlist, setHideWatchlist] = useState(false);
  const [hideNewsPanel, setHideNewsPanel] = useState(true);
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="background">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" align="center" color="primary">Investopedia</Typography>
        </Toolbar>
      </AppBar>

      <Box display="flex">
        <Drawer className={classes.drawer} variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {generateListItems(pages, () => setExpand(!expand), expand, () => setHideWatchlist(!hideWatchlist), () => setHideNewsPanel(!hideNewsPanel))}
          </List>
        </Drawer>
        
        <Box mt={8} flex={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<Dashboard hideWatchlist={hideWatchlist} hideNewsPanel={hideNewsPanel} />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="notifications" element={<Notifications />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
