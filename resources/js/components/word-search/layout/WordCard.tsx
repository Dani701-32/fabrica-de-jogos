import { Grid, IconButton, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../_layout/RichTextField';
import React from 'react';
import { wordObj } from '../../../types';
import { EditorState } from 'draft-js';

type Props = {
    item: wordObj;
    index: number;
    handleWordChange: Function;
    handleRemoveWord: Function;
    handleTipChange: Function;
};

const WordCard = ({
    item,
    index,
    handleWordChange,
    handleRemoveWord,
    handleTipChange
}: Props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container alignItems="center">
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
                    <Grid item xs={10}>
                        <RichTextField
                            editorState={item.tip as EditorState}
                            onChange={handleTipChange}
                            label={'Dica'}
                            index={index}
                            maxLength={45}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default WordCard;
