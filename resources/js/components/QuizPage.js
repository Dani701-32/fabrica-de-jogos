import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from './layout/LayoutPicker';
import RichTextField from './layout/RichTextField';
import draftToText from './utils/draftToText';
import userInfo from './utils/userInfo';
import SuccessDialog from './layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';

const theme = createTheme();

export default function QuizPage({ mode }) {
    const { slug } = useParams();
    let user_info = {};
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const quiz = useSelector((state) => state.game.quiz);
    const [questions, setQuestions] = useState(quiz.questions);
    const [name, setName] = useState(quiz.name);
    const [layout, setLayout] = useState(quiz.layout);
    const dispatch = useDispatch();
    const { createGame, getGame, editGame, setAlert, setClose } =
        bindActionCreators(actionCreators, dispatch);
    const questionObj = {
        title: EditorState.createEmpty(),
        answers: ['', '']
    };
    const handleCreateQuestion = () => {
        if (questions.length >= 9) {
            setAlert('O número máximo de questões para esse jogo é 9!');
            return;
        }
        setQuestions([...questions, questionObj]);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleRemoveQuestion = (index) => {
        if (index === 0) {
            return;
        }
        let q = [...questions];
        q.splice(index, 1);
        setQuestions(q);
    };
    const handleCreateAnswer = (index) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 5) {
            return;
        }
        question.answers.push('');
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleRemoveAnswer = (index, i) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 2) {
            return;
        }
        question.answers.splice(i, 1);
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleQuestionTitleChange = (value, index) => {
        let q = [...questions];
        let question = q[index];
        question.title = value;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleAnswerChange = (event, index, i) => {
        let q = [...questions];
        let question = questions[index];
        question.answers[i] = event.target.value;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleClose = () => {
        setName('');
        setQuestions([{ title: EditorState.createEmpty(), answers: ['', ''] }]);
        setLayout(1);
        setClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent());
            let markup = draftToText(textJson);
            questionsJSON.push({
                answers: item.answers,
                title: markup
            });
        });
        let body = JSON.stringify({
            name: name,
            layout: layout,
            questions: questionsJSON
        });
        mode === 'EDIT'
            ? editGame(body, 'quiz', quiz.slug, user_info.token)
            : createGame(body, 'quiz', user_info);
    };
    useEffect(() => {
        user_info = userInfo();
        if (mode === 'EDIT') {
            getGame('quiz', slug);
            setQuestions(quiz.questions);
            setName(quiz.name);
            setLayout(quiz.layout);
        }
    }, [quiz.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    slug={quiz.slug}
                    type="quiz"
                />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Grid
                        container
                        align="center"
                        component="form"
                        onSubmit={handleSubmit}
                        spacing={3}
                    >
                        <Grid item align="center" xs={12}>
                            <TextField
                                label="Nome"
                                name="name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                                required
                            />
                        </Grid>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                        <Grid item align="center" xs={12}>
                            <Button
                                onClick={handleCreateQuestion}
                                endIcon={<AddIcon fontSize="small" />}
                                variant="contained"
                            >
                                Adicionar Questão
                            </Button>
                        </Grid>
                        <Grid item lg={12}>
                            <Grid
                                container
                                align="center"
                                alignItems="flex-start"
                                justifyContent="center"
                                spacing={3}
                            >
                                {alert && (
                                    <Grid item xs={12}>
                                        <Alert
                                            severity="warning"
                                            onClick={() => {
                                                setAlert('');
                                            }}
                                        >
                                            {alert}
                                        </Alert>
                                    </Grid>
                                )}
                                {questions.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={8}
                                            md={6}
                                            lg={4}
                                            key={index}
                                        >
                                            <Paper
                                                elevation={5}
                                                sx={{
                                                    padding: '15px'
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    align="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Grid item xs={10}>
                                                        <Typography variant="subtitle1">
                                                            Questão{' '}
                                                            {(
                                                                index + 1
                                                            ).toString()}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            disabled={
                                                                index <
                                                                    questions.length -
                                                                        1 ||
                                                                index === 0
                                                            }
                                                            onClick={() => {
                                                                handleRemoveQuestion(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        align="left"
                                                        xs={12}
                                                    >
                                                        <RichTextField
                                                            editorState={
                                                                item.title
                                                            }
                                                            handleTextChange={
                                                                handleQuestionTitleChange
                                                            }
                                                            index={index}
                                                            label={
                                                                'Enunciado...'
                                                            }
                                                            maxLength={160}
                                                        />
                                                    </Grid>
                                                    {questions[index].answers
                                                        .length <= 4 && (
                                                        <Grid item xs={12}>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                endIcon={
                                                                    <AddIcon fontSize="small" />
                                                                }
                                                                onClick={() => {
                                                                    handleCreateAnswer(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                Adicionar
                                                                Alternativa
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        key={index}
                                                    >
                                                        <Grid
                                                            container
                                                            align="center"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            {item.answers.map(
                                                                (answer, i) => {
                                                                    return (
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {i ===
                                                                            0 ? (
                                                                                <Grid
                                                                                    container
                                                                                    align="center"
                                                                                    spacing={
                                                                                        2
                                                                                    }
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            10
                                                                                        }
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
                                                                                            value={
                                                                                                questions[
                                                                                                    index
                                                                                                ]
                                                                                                    .answers[
                                                                                                    i
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                event
                                                                                            ) =>
                                                                                                handleAnswerChange(
                                                                                                    event,
                                                                                                    index,
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            2
                                                                                        }
                                                                                    >
                                                                                        <IconButton
                                                                                            disabled
                                                                                        >
                                                                                            <DeleteIcon fontSize="small" />
                                                                                        </IconButton>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            ) : (
                                                                                <Grid
                                                                                    container
                                                                                    align="center"
                                                                                    spacing={
                                                                                        2
                                                                                    }
                                                                                >
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            10
                                                                                        }
                                                                                    >
                                                                                        <TextField
                                                                                            variant="outlined"
                                                                                            label={
                                                                                                'Alternativa ' +
                                                                                                (i +
                                                                                                    1)
                                                                                            }
                                                                                            fullWidth
                                                                                            size="small"
                                                                                            inputProps={{
                                                                                                maxLength: 31
                                                                                            }}
                                                                                            value={
                                                                                                questions[
                                                                                                    index
                                                                                                ]
                                                                                                    .answers[
                                                                                                    i
                                                                                                ]
                                                                                            }
                                                                                            onChange={(
                                                                                                event
                                                                                            ) =>
                                                                                                handleAnswerChange(
                                                                                                    event,
                                                                                                    index,
                                                                                                    i
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={
                                                                                            2
                                                                                        }
                                                                                    >
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
                                })}
                            </Grid>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                {mode === 'EDIT' ? 'Editar' : 'Criar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Copyright />
        </ThemeProvider>
    );
}
