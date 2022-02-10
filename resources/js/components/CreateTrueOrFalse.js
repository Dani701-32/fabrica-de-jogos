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
    Switch,
    FormGroup,
    FormControlLabel,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import draftToText from './utils/draftToText';

const theme = createTheme();

export default function CreateTrueOrFalse() {
    const navigate = useNavigate();
    const questionObj = {
        title: EditorState.createEmpty(),
        right: false
    };
    const [questions, setQuestions] = useState([
        { title: EditorState.createEmpty(), right: false }
    ]);
    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleCreateQuestion = () => {
        if (questions.length >= 10) {
            setAlert('O número máximo de questões para esse jogo é 10!');
            return;
        }
        setQuestions([...questions, questionObj]);
    };

    const handleRemoveQuestion = (index) => {
        if (index === 0) {
            return;
        }
        let q = [...questions];
        q.splice(index, 1);
        setQuestions(q);
    };

    const handleQuestionTitleChange = (value, index) => {
        let q = [...questions];
        let question = q[index];
        question.title = value;
        q.splice(index, 1, question);
        setQuestions(q);
    };

    const handleAnswerChange = (index) => {
        let q = [...questions];
        let question = q[index];
        question.right = !question.right;
        q.splice(index, 1, question);
        setQuestions(q);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent());
            let markup = draftToText(textJson);
            questionsJSON.push({
                answer: item.right,
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
        axios
            .post('/api/trueorfalse', body, config)
            .then((response) => {
                if (response.status === 201) {
                    navigate(`/trueorfalse/${response.data.slug}`);
                }
            })
            .catch((error) => {
                setAlert(
                    `Error ${error.response.status}: ${error.response.data.message}`
                );
            });
    };

    const [alert, setAlert] = useState('');

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
                                                    spacing={3}
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
                                                    <Grid
                                                        item
                                                        align="center"
                                                        xs={12}
                                                    >
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Switch
                                                                        size="large"
                                                                        onChange={() => {
                                                                            handleAnswerChange(
                                                                                index
                                                                            );
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
