import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getWatchlist, removeFromWatchlist } from '../api';

const useStyles = makeStyles(({ palette }) => ({
    page: {
        height: '100vh',
        backgroundColor: palette.background.main,
        overflow: 'auto',
    }
}));

export default function Watchlist() {
    const classes = useStyles();
    const [watchlist, setWatchlist] = useState([]);
    
    useEffect(() => {
        const getWL = async () => {
            setWatchlist(await getWatchlist());
        };

        getWL();
    }, []);

    const removeItem = async (ticker) => {
        await removeFromWatchlist(ticker);
        setWatchlist(await getWatchlist());
    }

    return (
        <div className={classes.page}>
            <TableContainer >
                <Table sx={{ minWidth: 650, backgroundColor: 'black' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography color='lightgrey' >Ticker</Typography></TableCell>
                            <TableCell align="right"><Typography color='lightgrey' >Current (USD)</Typography></TableCell>
                            <TableCell align="right"><Typography color='primary' >High (USD)</Typography></TableCell>
                            <TableCell align="right"><Typography color='error' >Low (USD)</Typography></TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {watchlist.map((row) => (
                            <TableRow
                                key={row.ticker}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'black' }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography color='lightgrey' >{row.ticker}</Typography>
                                </TableCell>
                                <TableCell align="right"><Typography color='lightgrey' >{row.current_value}</Typography></TableCell>
                                <TableCell align="right"><Typography color='primary' >{row.high}</Typography></TableCell>
                                <TableCell align="right"><Typography color='error' >{row.low}</Typography></TableCell>
                                <TableCell align="right"><IconButton color='error' onClick={() => removeItem(row.ticker)}><DeleteIcon fontSize='small' /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}