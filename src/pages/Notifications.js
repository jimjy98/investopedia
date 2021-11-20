import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { getNotifications, removeFromNotifications } from '../api';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNot = async () => {
            setNotifications(await getNotifications());
        };

        getNot();
    }, []);

    const removeItem = async (ticker) => {
        await removeFromNotifications(ticker);
        setNotifications(await getNotifications());
    }

    return (
        <TableContainer >
            <Table sx={{ minWidth: 650, backgroundColor: 'black' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><Typography color='lightgrey' >Ticker</Typography></TableCell>
                        <TableCell align="right"><Typography color='primary' >High (USD)</Typography></TableCell>
                        <TableCell align="right"><Typography color='error' >Low (USD)</Typography></TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.map((row) => (
                        <TableRow
                            key={row.ticker}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'black' }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography color='lightgrey' >{row.ticker}</Typography>
                            </TableCell>
                            <TableCell align="right"><Typography color='primary' >{row.above}</Typography></TableCell>
                            <TableCell align="right"><Typography color='error' >{row.below}</Typography></TableCell>
                            <TableCell align="right"><IconButton color='error' onClick={() => removeItem(row.ticker)}><DeleteIcon fontSize='small' /></IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}