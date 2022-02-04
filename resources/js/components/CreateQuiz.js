import React, { useState } from 'react';
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
    ToggleButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MUIRichTextEditor from 'mui-rte';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const theme = createTheme({
    overrides: {
        MUIRichTextEditor: {
            container: {
                display: 'flex',
                flexDirection: 'column'
            },
            editor: {
                padding: '10px',
                maxHeight: '200px',
                overflow: 'auto',
                alignItems: 'center'
            },
            toolbar: {
                borderBottom: '1px solid gray'
            },
            placeHolder: {
                paddingLeft: 20,
                width: 'inherit'
            },
            anchorLink: {
                color: 'primary',
                textDecoration: 'underline'
            }
        }
    }
});

const ImageToggleButton = styled(ToggleButton)({
    '&.Mui-selected': {
        border: '5px solid rgba(0, 134, 248, 0.7)'
    }
});

export default function CreateQuiz() {
    const navigate = useNavigate();
    const questionObj = {
        title: EditorState.createEmpty(),
        answers: ['', '']
    };
    const [questions, setQuestions] = useState([
        { title: EditorState.createEmpty(), answers: ['', ''] }
    ]);
    const handleCreateQuestion = () => {
        setQuestions([...questions, questionObj]);
    };

    const [layout, setLayout] = useState(1);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        let collection = {
            '<p>': '',
            '</p>': '',
            '<strong>': '[b]',
            '</strong>': '[/b]',
            '<em>': '[i]',
            '</em>': '[/i]',
            '<ins>': '[u]',
            '</ins>': '[/u]',
            '<del>': '[s]',
            '</del>': '[/s]'
        };
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent());
            let markup = draftToHtml(textJson);
            for (const [key, value] of Object.entries(collection)) {
                const regex = new RegExp(key, 'g');
                markup = markup.replace(regex, value);
            }
            questionsJSON.push({
                answers: item.answers,
                title: markup
            });
        });
        const body = JSON.stringify({
            name: name,
            layout: layout,
            questions: questionsJSON
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDU1YmE3YWVkY2ZhZTlhZjUxMGMzMTBlOWZmODY3ODc0ZGFiNGY5ZGRjMGY0M2IwNzQ3M2VlMzcxYWE2YjE4NTBjZmRhMWY0ODFmMTkyOTYiLCJpYXQiOjE2NDMwMTkzNDMuMTc3MjMsIm5iZiI6MTY0MzAxOTM0My4xNzcyMzcsImV4cCI6MTY3NDU1NTM0My4wOTU5NCwic3ViIjoiMSIsInNjb3BlcyI6W119.cZ_qYhOKtL6zCtska_12w0w-JMabe_O7a6Jy_jdQJ9Jq8BgFOIoxhX4tbcFADoWd8Xm1e8mjXT1y2nBWgweNfZD2Rz7kJgKSg6y9CHferhmzQ5tcIri6GThmKlZfJR5aJNVlFncf7F3xYvcRuBLxQ5z5cLLGSuKkNQr7h_T9BwcA8NWePmDWFmpt2ANFBrAJXYhH7bzriVvDhjr3rAWz6pDwaxM4KPpc0xt8vJBR39Mhrqy--6NiHQ5QqaCkiJ5VRggy7GRaJPTDgzjKLyPsCVYne79iJ6pRW-I8jsdLNBOdlPf38qArY_qPirOlGrPM7vUJq2OhyazDFghdFHI3y7mPItP9RKSdJCjgNb-EFzpmB90hDhckxB9bAeqZclLZW_J_I_NQvNSOrtr9vwesGdp6uDc7uzhRuZZy0zVh6w0v7xj26GclcT4QW3yWg09m0H33VQzhHzmbt5aQbJx4zPnYUKEvEQLGkmlsmsGYMfv5_876EBm6AV3cbNLfZOqkhXi7NkQhxZGCdM6IVpJLXAYPZl3wp0PSj_Yl8sU6jDoqqAwveDlYAfeHpVGZAjkR5xfvZ7SZwJ8BZR8bbIguYnPwIcgLTOAP-ylyT-QDPtuAiM4VTErORNZKXwcDZWUA0msmg-ulmg53Fy4-5KpTyA2x0FiuFs3_EwAdIz209SY'
            }
        };
        axios.post('/api/quiz', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/quiz/${response.data.data.slug}`);
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
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
                                required
                            />
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Grid container align="center" alignItems="center">
                                <Grid item align="center" xs={12}>
                                    <Typography variant="subtitle1">
                                        Layout:
                                    </Typography>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 1}
                                        value={1}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout1.png"
                                            alt="Layout 1"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 2}
                                        value={2}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout2.png"
                                            alt="Layout 2"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 3}
                                        value={3}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout3.png"
                                            alt="Layout 3"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 4}
                                        value={4}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout3.png"
                                            alt="Layout 4"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                            </Grid>
                        </Grid>
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
                                {questions.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={8}
                                            md={6}
                                            lg={6}
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
                                                        <Paper variant="outlined">
                                                            <MUIRichTextEditor
                                                                controls={[
                                                                    'bold',
                                                                    'italic',
                                                                    'underline',
                                                                    'strikethrough',
                                                                    'undo',
                                                                    'redo',
                                                                    'clear'
                                                                ]}
                                                                editorState={
                                                                    item.title
                                                                }
                                                                onChange={(
                                                                    editorState
                                                                ) => {
                                                                    handleQuestionTitleChange(
                                                                        editorState,
                                                                        index
                                                                    );
                                                                }}
                                                                label="Enunciado..."
                                                                maxLength={160}
                                                            />
                                                        </Paper>
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
                                Criar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                Edutec {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
