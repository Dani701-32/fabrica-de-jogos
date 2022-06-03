import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

type Props = {
    pieces: number;
    handlePieces: Function;
};

const PiecesSelect = ({ pieces, handlePieces }: Props) => {
    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Typography variant="subtitle1">Quantidade de peças:</Typography>
            </Grid>
            <ToggleButtonGroup value={pieces} exclusive onChange={handlePieces as any} aria-label="text alignment" color="primary">
                <ToggleButton value={2}>2</ToggleButton>
                <ToggleButton value={3}>3</ToggleButton>
                <ToggleButton value={4}>4</ToggleButton>
                <ToggleButton value={6}>6</ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    );
};

export default PiecesSelect;
