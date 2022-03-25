import {
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    Switch,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RichTextField from '../../../layout/RichTextField';
import React from 'react';

const QuestionCard = ({
    question,
    index,
    handleRemoveQuestion,
    handleQuestionTitleChange,
    handleAnswerChange
}) => {
    return (
        <Grid item xs={8} md={6} lg={4}>
            <Paper
                elevation={5}
                sx={{
                    padding: '15px'
                }}
            >
                <Grid container align="center" alignItems="center" spacing={3}>
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
                    <Grid item align="center" xs={2}>
                        <Typography variant="subtitle1">Falso</Typography>
                    </Grid>
                    <Grid item align="center" xs={10}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        size="large"
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
