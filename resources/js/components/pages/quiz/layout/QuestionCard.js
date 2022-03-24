import {
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../../layout/RichTextField';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

const QuestionCard = ({
    question,
    index,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleCreateAnswer,
    handleRemoveAnswer,
    handleAnswerChange
}) => {
    return (
        <Grid item xs={8} md={6} lg={4} key={index}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container align="center" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1">
                            Questão {(index + 1).toString()}
                        </Typography>
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
                    <Grid item align="left" xs={12}>
                        <RichTextField
                            editorState={question.title}
                            onChange={handleQuestionTitleChange}
                            index={index}
                            label={'Enunciado...'}
                            maxLength={160}
                        />
                    </Grid>
                    {question.answers.length <= 4 && (
                        <Grid item xs={12}>
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
                    <Grid item xs={12} key={index}>
                        <Grid
                            container
                            align="center"
                            alignItems="center"
                            spacing={2}
                        >
                            {question.answers.map((answer, i) => {
                                return (
                                    <Grid item xs={12} key={i}>
                                        {i === 0 ? (
                                            <Grid
                                                container
                                                align="center"
                                                spacing={2}
                                            >
                                                <Grid item xs={10}>
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
                                            <Grid
                                                container
                                                align="center"
                                                spacing={2}
                                            >
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
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default QuestionCard;
