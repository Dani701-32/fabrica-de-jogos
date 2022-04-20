import React from 'react';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    page: string[];
    index: number;
    onChange: Function;
    handleDelete: Function;
};

const Page = ({ page, index, onChange, handleDelete }: Props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={9}>
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
                    {page.map((word: string, i: number) => {
                        return (
                            /* @ts-ignore*/
                            <Grid item align="center" key={i} xs={12}>
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
