import React, { useState } from 'react';
import { Grid, Box, Typography, Checkbox, TextField, Button } from '@mui/material';
import { addToNotifications } from '../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NotificationsModal({ticker, handleClose}) {
    const [notificationSettings, setNotificationSettings] = useState({
        high: '',
        low: ''
    });

    const addNotification = async (ticker, high, low) => {
        if (!high && !low) {
            alert('Cannot save empty notifications')
            return;
        }
        else if (high && low && high <= low) {
            alert('High cannot be lower than the low');
            return;
        }
        await addToNotifications(ticker, high, low);
        handleClose();
    }

    return (
        <Grid container sx={style}>
            <Grid item xs={12}>
                <Typography>Notification Settings</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                    id="high"
                    label="Enter high"
                    placeholder="Ex: 1000"
                    variant="outlined"
                    fullWidth
                    value={notificationSettings.high}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, high: e.target.value })}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
                <TextField
                    id="low"
                    label="Enter low"
                    placeholder="Ex: 100"
                    fullWidth
                    variant="outlined"
                    value={notificationSettings.low}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, low: e.target.value })}
                />
            </Grid>

            <Grid item xs={12} sx={{ mt: 8 }}>
                <Button variant="contained" fullWidth onClick={() => addNotification(ticker, notificationSettings.high, notificationSettings.low)} >
                    Save
                </Button>
            </Grid>
        </Grid>
    );
};
