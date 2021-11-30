import React, { useEffect, useState } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import moment from 'moment';
import splineData from '../assets/spline.json';
import candleStickData from '../assets/candlestick.json';

import { addToWatchlist, tickerExists, removeFromWatchlist, addToNotifications, notificationExists, removeFromNotifications } from '../api';

export default function Chart({ ticker }) {

    const [tickerDoesExist, setTickerExists] = useState(false);
    const [notificationDoesExist, setNotificationExists] = useState(false);
    const [chartType, setChartType] = useState('spline');

    useEffect(() => {
        tickerExists(ticker).then((exists) => {
            setTickerExists(exists);
        });
        notificationExists(ticker).then((exists) => {
            setNotificationExists(exists);
        });
    })

    function handleTickerExists() {
        if (tickerDoesExist) {
            removeFromWatchlist(ticker);
            setTickerExists(false);
        }
        else if (!tickerDoesExist) {
            addToWatchlist(ticker);
            setTickerExists(true);
        }
    }
    function handleNotificationExists() {
        if (notificationDoesExist) {
            removeFromNotifications(ticker);
            setNotificationExists(false);
        }
        else if (!notificationDoesExist) {
            addToNotifications(ticker);
            setNotificationExists(true);
        }
    }

    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {

        yAxis: [{
            offset: 20,

            labels: {
                formatter: function () {
                    return numberFormat.format(this.value)
                }
                ,
                x: -15,
                style: {
                    "color": "#000", "position": "absolute"

                },
                align: 'left'
            },
        },

        ],
        tooltip: {
            shared: true,
            formatter: function () {
                return numberFormat.format(this.y, 0) + '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
            }
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                gapSize: 6,

            }
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: ticker.toUpperCase()
        },
        chart: {
            height: 600,
        },

        credits: {
            enabled: false
        },

        legend: {
            enabled: true
        },
        xAxis: {
            type: 'date',
        },
        // eslint-disable-next-line
        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d',
            }, {
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            },
            {
                type: 'all',
                text: 'All'
            }],
            selected: 4
        },
        series: [{
            name: 'Price',
            type: chartType,

            data: chartType === 'spline' ? splineData : candleStickData,
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    };
    return (
        <div>
            <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={(event, value) => setChartType(value)}
                aria-label="text alignment"
                color='primary'
            >
                <ToggleButton value="spline"><Typography color='lightgrey'>Spline</Typography></ToggleButton>
                <ToggleButton value="candlestick"><Typography color='lightgrey'>Candlestick</Typography></ToggleButton>
            </ToggleButtonGroup>
            <ReactHighcharts config={configPrice} />
            {tickerDoesExist ?
                <Button
                    variant="contained"
                    color='error'
                    startIcon={<RemoveCircleIcon fontSize="small" />}
                    onClick={() => handleTickerExists()}
                >
                    Remove from Watchlist
                </Button> :
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={() => handleTickerExists()}
                >
                    Add to Watchlist
                </Button>
            }
            {notificationDoesExist ?
                <Button
                    variant="contained"
                    color='error'
                    startIcon={<RemoveCircleIcon fontSize="small" />}
                    onClick={() => handleNotificationExists()}
                >
                    Remove from Notifications
                </Button> :
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon fontSize="small" />}
                    onClick={() => handleNotificationExists()}
                >
                    Add to Notifications
                </Button>
            }
        </div>
    );

}