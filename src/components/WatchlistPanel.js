import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material';

function createData(ticker, current_value, high, low) {
    return { ticker, current_value, high, low };
}

const rows = [
    createData('APPL', 159, 6.0, 24),
    createData('GOOGL', 237, 9.0, 37),
    createData('TSLA', 262, 16.0, 24),
];

export default function WatchlistPanel() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 500 }} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.ticker}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'black' }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography color='lightgrey' >{row.ticker}</Typography>
                            </TableCell>
                            <TableCell align="center"><Typography color='lightgrey' >{row.current_value}</Typography></TableCell>
                            <TableCell align="center"><Typography color='lightgrey' >{row.high}</Typography></TableCell>
                            <TableCell align="center"><Typography color='lightgrey' >{row.low}</Typography></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}