import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    dragging: {
        opacity: 0.5,
    },
    green: {
        backgroundColor: 'lightgreen'
    },
    red: {
        backgroundColor: 'red'
    }
}));


const ItemTypes = {
    PANEL: 'panel',
};


export const DraggableGridItem = ({ itemKey, x, y, moveItem, children, className, ...rest }) => {
    const [currentItem, setCurrentItem] = useState(null);

    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PANEL,
        item: { itemKey },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.PANEL,
          drop: (item) => !itemKey ? moveItem(item.itemKey, { x, y }) : undefined,
          collect: (monitor) => {
              return ({
                isOver: !!monitor.isOver(),
              })
          },
        }),
        [x, y]
      )
    
    
    const getCellColor = () => {
        if (isOver) {
            return !!itemKey ? classes.red : classes.green;
        }

        return '';
    }

    return (
        <Grid ref={drop} item {...rest} className={`${className} ${getCellColor()}`}>
            <div onMouseDown={() => setCurrentItem(itemKey)} disabled={!!itemKey} ref={drag} className={isDragging ? classes.dragging : null}>
                {children}
            </div>
        </Grid>
    );
};

