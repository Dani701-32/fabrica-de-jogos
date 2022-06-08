import { FormControlLabel, FormGroup, Grid, IconButton, Paper, Switch, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../_layout/RichTextField';
import React from 'react';
import { trueOrFalseQuestion as QuestionType } from '../../../types';
import { EditorState } from 'draft-js';

type Props = {
    question: QuestionType;
    index: number;
    handleRemoveQuestion: Function;
    handleQuestionTitleChange: Function;
    handleAnswerChange: Function;
};

const QuestionCard = ({
    question,
    index,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleAnswerChange,
}: Props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px',
                }}
            >
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">Questão {(index + 1).toString()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            onClick={() => {
                                handleRemoveQuestion(index);
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <RichTextField
                            editorState={question.title as EditorState}
                            onChange={handleQuestionTitleChange}
                            index={index}
                            label={'Enunciado...'}
                            maxLength={160}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle1">Falso</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        size="medium"
                                        checked={question.answer}
                                        onChange={(event) => {
                                            handleAnswerChange(event, index);
                                        }}
                                    />
                                }
                                label="Verdadeiro"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default QuestionCard;
