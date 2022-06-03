import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

type Props = {
    size: number;
    handleSize: Function;
};

const GridSelect = ({ size, handleSize }: Props) => {
    return (
        <Grid item xs={12}>
            <ToggleButtonGroup value={size} exclusive onChange={handleSize as any} aria-label="text alignment" color="primary">
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
