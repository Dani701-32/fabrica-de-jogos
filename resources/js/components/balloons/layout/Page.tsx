import React from 'react';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    answers: string[];
    index: number;
    handleRemoveQuestion: Function;
    handleAnswerChange: Function;
};

export default function Page({
    answers,
    index,
    handleRemoveQuestion,
    handleAnswerChange
}: Props) {
    return (
        /* @ts-ignore */
        <Grid item align="center" xs={12} sm={6} md={4} lg={3}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                {/* @ts-ignore */}
                <Grid container align="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">
                            Pagina {(index + 1).toString()}
                        </Typography>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={2}>
                        <IconButton
                            onClick={() => {
                                handleRemoveQuestion(index);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12} key={index}>
                        <Grid container alignItems="center" spacing={2}>
                            {answers.map((answer: string, i: number) => {
                                return (
                                    <Grid item xs={12} key={i}>
                                        {i === 0 ? (
                                            <Grid container spacing={2}>
                                                {/* @ts-ignore */}
                                                <Grid
                                                    item
                                                    align="center"
                                                    xs={12}
                                                >
                                                    <TextField
                                                        variant="outlined"
                                                        label="Alternativa correta"
                                                        size="small"
                                                        required
                                                        inputProps={{
                                                            maxLength: 31
                                                        }}
                                                        focused
                                                        fullWidth
                                                        color="success"
                                                        value={answer}
                                                        onChange={(event) =>
                                                            handleAnswerChange(
                                                                event,
                                                                index,
                                                                i
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        ) : (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        label={
                                                            'Alternativa ' +
                                                            (i + 1)
                                                        }
                                                        fullWidth
                                                        size="small"
                                                        inputProps={{
                                                            maxLength: 12
                                                        }}
                                                        value={answer}
                                                        onChange={(event) =>
                                                            handleAnswerChange(
                                                                event,
                                                                index,
                                                                i
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
