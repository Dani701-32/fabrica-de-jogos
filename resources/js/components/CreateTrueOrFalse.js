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
    Switch,
    FormGroup,
    FormControlLabel,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import draftToText from './utils/draftToText';
import userInfo from './utils/userInfo';
import createGame from './utils/createGame';
import SuccessDialog from './layout/successDialog';

const theme = createTheme();

export default function CreateTrueOrFalse() {
    let user_info = {};
    useEffect(() => {
        user_info = userInfo();
    }, []);
    const questionObj = {
        title: EditorState.createEmpty(),
        right: false
    };
    const [questions, setQuestions] = useState([
        { title: EditorState.createEmpty(), right: false }
    ]);

    const [name, setName] = useState('');

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleCreateQuestion = () => {
        if (questions.length >= 9) {
            setAlert('O número máximo de questões para esse jogo é 9!');
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

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setName('');
        setQuestions([{ title: EditorState.createEmpty(), right: false }]);
        setLayout(1);
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent());
            let markup = draftToText(textJson);
            questionsJSON.push({
                answer: item.right,
                title: markup
            });
        });
        let body = JSON.stringify({
            name: name,
            layout: layout,
            questions: questionsJSON,
            user_id: user_info.user_id,
            client_id: user_info.client_id,
            origin: user_info.api_address
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user_info.token}`
            }
        };
        createGame(
            'trueorfalse',
            body,
            config,
            user_info.api_address,
            setAlert,
            setOpen
        );
    };

    const [alert, setAlert] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <SuccessDialog open={open} handleClose={handleClose} />
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
                                                        xs={2}
                                                    >
                                                        <Typography variant="subtitle1">
                                                            Falso
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        align="center"
                                                        xs={10}
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
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
