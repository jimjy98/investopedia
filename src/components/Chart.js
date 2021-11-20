import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import moment from 'moment';

import { addToWatchlist, tickerExists, removeFromWatchlist } from '../api';

export default function Chart({ ticker, data }) {

    const [tickerDoesExist, setTickerExists] = React.useState(false);

    useEffect(() => {
        tickerExists(ticker).then((exists) => {
            setTickerExists(exists);
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
            type: 'spline',

            data: data,
            tooltip: {
                valueDecimals: 2
            },

        }
        ]
    };
    return (
        <div>
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
        </div>
    )
}