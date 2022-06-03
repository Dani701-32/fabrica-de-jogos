import React from 'react';
import { Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    answers: string[];
    correct: boolean;
    handleAddItem: Function;
    handleRemoveItem: Function;
    handleItemChange: Function;
};

export default function Group({ answers, correct, handleAddItem, handleRemoveItem, handleItemChange }: Props) {
    return (
        <>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Grid container alignSelf="center" alignItems="flex-start" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography color="primary" variant="h5">
                            <b>{correct ? 'Palavras Corretas' : 'Palavras Erradas'}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleAddItem as any} variant="contained" size="small">
                            Adicionar {correct ? 'Resposta' : 'Alternativa'}
                        </Button>
                    </Grid>
                    {answers.map((item, i) => {
                        return (
                            <Grid key={i} item xs={12} md={6}>
                                <Grid container alignSelf="center" alignItems="flex-start" justifyContent="center" spacing={0}>
                                    <Grid item xs={10}>
                                        <TextField
                                            variant="outlined"
                                            label={'Item ' + (i + 1)}
                                            fullWidth
                                            size="small"
                                            inputProps={{
                                                maxLength: 12,
                                            }}
                                            color={correct ? 'success' : 'error'}
                                            value={item}
                                            onChange={(event) => handleItemChange(event, i)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            onClick={() => {
                                                handleRemoveItem(i);
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
