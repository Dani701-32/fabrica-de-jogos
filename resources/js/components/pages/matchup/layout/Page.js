import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import RichTextField from '../../../layout/RichTextField';
import React from 'react';

const Page = ({
    page,
    index,
    handleWordChange,
    handleMeaningChange,
    handleDelete
}) => {
    return (
        <Grid item xs={12} md={6} lg={6}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container align="center" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">
                            Pag {(index + 1).toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={() => {
                                handleDelete(index);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    {page.map((matchUp, i) => {
                        return (
                            <Grid item xs={12} key={i}>
                                <Grid
                                    container
                                    align="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Grid item xs={4}>
                                        <TextField
                                            variant="outlined"
                                            label="Palavra"
                                            required
                                            inputProps={{
                                                maxLength: 9
                                            }}
                                            fullWidth
                                            value={matchUp.word}
                                            onChange={(event) =>
                                                handleWordChange(
                                                    event,
                                                    index,
                                                    i
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <KeyboardDoubleArrowRight fontSize="small" />
                                    </Grid>
                                    <Grid item align="left" xs={7}>
                                        <RichTextField
                                            editorState={matchUp.meaning}
                                            onChange={handleMeaningChange}
                                            index={index}
                                            i={i}
                                            label={'Significado...'}
                                            maxLength={80}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Page;
