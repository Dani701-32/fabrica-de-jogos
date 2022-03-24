import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const GridSelect = ({ size, handleSize }) => {
    return (
        <Grid item align="center" xs={12}>
            <ToggleButtonGroup
                value={size}
                exclusive
                onChange={handleSize}
                aria-label="text alignment"
                color="primary"
            >
                <ToggleButton value={2}>2x2</ToggleButton>
                <ToggleButton value={3}>2x3</ToggleButton>
                <ToggleButton value={4}>2x4</ToggleButton>
                <ToggleButton value={5}>2x5</ToggleButton>
                <ToggleButton value={6}>3x4</ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    );
};

export default GridSelect;
