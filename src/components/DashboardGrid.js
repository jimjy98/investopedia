import React from 'react';
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DraggableGridItem } from './DraggableGridItem';

const useStyles = makeStyles(() => ({
    container: {
        border: '3px solid green',
        borderWidth: 'thin'
    },
    cell: {
        border: '3px solid green',
        borderWidth: 'thin'
    },
}));

export const DashboardGrid = ({ rows, cols, items, moveItem }) => {
    const classes = useStyles();


    const generateGridData = () => {
        const initialGrid = [...Array(rows).fill(null)].map(() => [...Array(cols).fill({
            component: <Box width={200} height={200} bg="white" />
        })]);

        Object.entries(items).forEach(([key, { component, x, y }]) => {
            initialGrid[x][y] = { component, key };
        });

        return initialGrid;
    };

    const gridData = generateGridData();

    const renderCols = (row) => [...Array(cols).keys()].map((col) => {
        return (
            <DraggableGridItem 
                itemKey={gridData[row][col].key} 
                x={row} 
                y={col} 
                moveItem={moveItem} 
                className={classes.cell} 
                xs={12 / cols}
            >
                {gridData[row][col].component}
            </DraggableGridItem>
        );
    });

    const renderRows = () => [...Array(rows).keys()].map((row) => (
        <Grid item container xs={12}>
            {renderCols(row)}
        </Grid>
    ));

    return (
        <Grid className={classes.container} container>
            {renderRows()}
        </Grid>
    )
};