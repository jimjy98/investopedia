import React, { useState } from 'react';
import { InputAdornment, TextField, Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import WatchlistPanel from '../components/WatchlistPanel';
import Chart from '../components/Chart';
import priceData from '../assets/data.json';
import { DashboardGrid } from '../components/DashboardGrid';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const useStyles = makeStyles(({ palette }) => ({
    page: {
        height: '100vh',
        backgroundColor: palette.background.main,
        overflow: 'hidden',
    },
    gridItem: {
        border: '1px solid lightgrey',
        borderRadius: '25px',
    },
    drawer: {
        flex: 0,
    },
    grid: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
        width: '35%',
        marginRight: '2%',
    }
}));

const ROWS = 2;
const COLS = 2;

export default function Dashboard() {
    const classes = useStyles();
    const [ticker, setTicker] = useState('');
    const [hideChart, setHideChart] = useState(true);

    function onHideChart() {
        setHideChart(!hideChart);
    }

    const [items, setItems] = useState({
        watchlistPanel: { component: <WatchlistPanel />, x: 0, y: 0 },
     })

    const moveItem = (itemKey, { x, y }) => {
        const temp = {...items};
        temp[itemKey] = { ...temp[itemKey], x, y };

        setItems(temp);
    };

    return (
        <div className={classes.page}>
            <Box display="flex">
                <Box flex="1">
                    <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "20%" }}>
                        <TextField 
                            id="ticker" 
                            label="Ticker code" 
                            variant="outlined" 
                            value={ticker} 
                            focused 
                            onChange={(e) => setTicker(e.target.value)}
                            inputProps={{
                                style: { color: 'white', textTransform: 'uppercase' },
                                onKeyPress: (event) => (event.key === 'Enter') ? onHideChart(hideChart) : null
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton color="primary" onClick={() => onHideChart(hideChart)} >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {!hideChart && <Chart ticker={ticker} data={priceData} />}
                    </Box>
                    
                    <DndProvider backend={HTML5Backend}>
                        <DashboardGrid moveItem={moveItem} rows={ROWS} cols={COLS} items={items} />
                    </DndProvider>
                    
                </Box>
            </Box>
        </div>
    );
}
