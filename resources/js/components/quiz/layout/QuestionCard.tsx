import {
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../_layout/RichTextField';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { quizQuestion as QuestionType } from '../../../types';
import { EditorState } from 'draft-js';

type Props = {
    question: QuestionType;
    index: number;
    handleRemoveQuestion: Function;
    handleQuestionTitleChange: Function;
    handleCreateAnswer: Function;
    handleRemoveAnswer: Function;
    handleAnswerChange: Function;
};

const QuestionCard = ({
    question,
    index,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleCreateAnswer,
    handleRemoveAnswer,
    handleAnswerChange
}: Props) => {
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
                            Questão {(index + 1).toString()}
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
                    <Grid item align="left" xs={12}>
                        <RichTextField
                            editorState={question.title as EditorState}
                            onChange={handleQuestionTitleChange}
                            index={index}
                            label={'Enunciado...'}
                            maxLength={160}
                        />
                    </Grid>
                    {question.answers.length <= 4 && (
                        /* @ts-ignore */
                        <Grid item align="center" xs={12}>
                            <Button
                                variant="outlined"
                                size="small"
                                endIcon={<AddIcon fontSize="small" />}
                                onClick={() => {
                                    handleCreateAnswer(index);
                                }}
                            >
                                Adicionar Alternativa
                            </Button>
                        </Grid>
                    )}
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12} key={index}>
                        <Grid container alignItems="center" spacing={2}>
                            {question.answers.map(
                                (answer: String, i: number) => {
                                    return (
                                        <Grid item xs={12} key={i}>
                                            {i === 0 ? (
                                                <Grid container spacing={2}>
                                                    {/* @ts-ignore */}
                                                    <Grid
                                                        item
                                                        align="center"
                                                        xs={10}
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
                                                    <Grid item xs={2}>
                                                        <IconButton disabled>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                <Grid container spacing={2}>
                                                    <Grid item xs={10}>
                                                        <TextField
                                                            variant="outlined"
                                                            label={
                                                                'Alternativa ' +
                                                                (i + 1)
                                                            }
                                                            fullWidth
                                                            size="small"
                                                            inputProps={{
                                                                maxLength: 31
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
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            onClick={() => {
                                                                handleRemoveAnswer(
                                                                    index,
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Grid>
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default QuestionCard;
