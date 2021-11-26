import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { getWatchlist } from '../api';

export default function NewsPanel() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const getWL = async () => {
            setWatchlist(await getWatchlist());
        };

        getWL();
    }, []);

    return (
        <div>
            <Typography variant="h2" color="lightgrey">News</Typography>
            <TableContainer >
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableBody>
                        {watchlist.map((row) => (
                            <TableRow
                                key={row.ticker}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'black' }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography color='lightgrey' >{row.ticker} "some news here (api costs money lol)"</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}