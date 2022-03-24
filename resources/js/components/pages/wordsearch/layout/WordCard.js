import { Grid, IconButton, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../../layout/RichTextField';
import React from 'react';

const WordCard = ({
    item,
    index,
    handleWordChange,
    handleRemoveWord,
    handleTipChange
}) => {
    return (
        <Grid item xs={8} md={6} lg={4} key={index}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container align="center" alignItems="center">
                    <Grid item xs={10}>
                        <TextField
                            label="Palavra"
                            name="word"
                            variant="outlined"
                            value={item.word}
                            onChange={(event) => {
                                handleWordChange(event, index);
                            }}
                            inputProps={{
                                maxLength: 10
                            }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={() => {
                                handleRemoveWord(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid align="left" item xs={10}>
                        <RichTextField
                            editorState={item.tip}
                            onChange={handleTipChange}
                            label={'Dica'}
                            index={index}
                            maxLength={200}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default WordCard;
