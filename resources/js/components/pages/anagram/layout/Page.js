import React from 'react';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Page = ({ page, index, onChange, handleDelete }) => {
    return (
        <Grid item xs={6} md={4} lg={3} key={index}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container spacing={3} align="center" alignItems="center">
                    <Grid item xs={9}>
                        <Typography variant="subtitle1">
                            Pag {index + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            onClick={() => {
                                handleDelete(index);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    {page.map((word, i) => {
                        return (
                            <Grid item key={i} xs={12}>
                                <TextField
                                    label="Palavra"
                                    name="word"
                                    variant="outlined"
                                    value={word}
                                    inputProps={{
                                        maxLength: 16
                                    }}
                                    onChange={(event) => {
                                        onChange(event, index, i);
                                    }}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Page;
