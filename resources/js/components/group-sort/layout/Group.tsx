import React from 'react';
import { Button, Grid, IconButton, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { groupObj } from '../../../types';

type Props = {
    group: groupObj;
    index: number;
    handleTitleChange: Function;
    handleAddItem: Function;
    handleItemChange: Function;
    handleRemoveItem: Function;
};

export default function Group({
    group,
    index,
    handleTitleChange,
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
}: Props) {
    return (
        <>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Grid container alignSelf="center" alignItems="flex-start" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            variant="filled"
                            value={group.title}
                            onChange={(event) => handleTitleChange(event, index)}
                            inputProps={{
                                maxLength: 185,
                            }}
                            fullWidth
                            required
                        />
                    </Grid>
                    {group.items.length < 5 && (
                        <Grid item xs={12}>
                            <Button onClick={() => handleAddItem(index)} variant="contained" size="small">
                                Adicionar Item
                            </Button>
                        </Grid>
                    )}
                    {group.items.map((item, i) => {
                        return (
                            <Grid key={i} item xs={12} md={6}>
                                <Grid
                                    container
                                    alignSelf="center"
                                    alignItems="flex-start"
                                    justifyContent="center"
                                    spacing={0}
                                >
                                    <Grid item xs={10}>
                                        <TextField
                                            variant="outlined"
                                            label={'Item ' + (i + 1)}
                                            fullWidth
                                            size="small"
                                            inputProps={{
                                                maxLength: 12,
                                            }}
                                            value={item}
                                            onChange={(event) => handleItemChange(event, index, i)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            onClick={() => {
                                                handleRemoveItem(index, i);
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </>
    );
}
