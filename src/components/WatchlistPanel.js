import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { getWatchlist } from '../api';

export default function WatchlistPanel() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const getWL = async () => {
            setWatchlist(await getWatchlist());
        };

        getWL();
    }, []);

    return (
        <div>
            <Typography variant="h2" color="lightgrey">Watchlist</Typography>
            <TableContainer >
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableBody>
                        {watchlist.map((row) => (
                            <TableRow
                                key={row.ticker}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'black' }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography color='lightgrey' >{row.ticker}</Typography>
                                </TableCell>
                                <TableCell align="center"><Typography color='lightgrey' >${row.current_value}</Typography></TableCell>
                                <TableCell align="center"><Typography color='primary' >${row.high}</Typography></TableCell>
                                <TableCell align="center"><Typography color='error' >${row.low}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}