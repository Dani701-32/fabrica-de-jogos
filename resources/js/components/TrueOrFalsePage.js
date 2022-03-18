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
import LayoutPicker from './layout/LayoutPicker';
import RichTextField from './layout/RichTextField';
import draftToText from './utils/draftToText';
import SuccessDialog from './layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';
import FillableSelect from './layout/FillableSelect';

const theme = createTheme();

export default function TrueOrFalsePage({ mode }) {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const trueorfalse = useSelector((state) => state.game.trueorfalse);
    const [questions, setQuestions] = useState(trueorfalse.questions);
    const [name, setName] = useState(trueorfalse.name);
    const [layout, setLayout] = useState(trueorfalse.layout);
    const series = useSelector((state) => state.base.series);
    const [selectedSerie, setSelectedSerie] = useState('');
    const disciplinas = useSelector((state) => state.base.disciplinas);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const dispatch = useDispatch();
    const {
        createGame,
        getGame,
        editGame,
        setAlert,
        setClose,
        refreshBaseState
    } = bindActionCreators(actionCreators, dispatch);
    const questionObj = {
        title: EditorState.createEmpty(),
        answer: false
    };
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
        question.answer = !question.answer;
        q.splice(index, 1, question);
        setQuestions(q);
        console.log(question.answer);
    };
    const handleClose = () => {
        setName('');
        setQuestions([{ title: EditorState.createEmpty(), right: false }]);
        setLayout(1);
        setClose();
    };
    const seriesChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedSerie) {
            setSelectedSerie(value);
        }
    };
    const disciplineChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (mode === 'CREATE') {
            if (selectedSerie === '') {
                setAlert('Selecione uma série!');
                return;
            }
            if (selectedDiscipline === '') {
                setAlert('Selecione uma disciplina!');
                return;
            }
        }
        let questionsJSON = [];
        questions.map((item) => {
            let textJson = convertToRaw(item.title.getCurrentContent());
            let markup = draftToText(textJson);
            questionsJSON.push({
                answer: item.answer,
                title: markup
            });
        });
        let body = {
            name: name,
            layout: layout,
            questions: questionsJSON
        };
        mode === 'EDIT'
            ? editGame(body, 'trueorfalse', trueorfalse.slug)
            : createGame(
                  body,
                  'trueorfalse',
                  selectedSerie,
                  selectedDiscipline
              );
    };
    useEffect(() => {
        refreshBaseState();
        if (mode === 'EDIT') {
            getGame('trueorfalse', slug);
            setQuestions(trueorfalse.questions);
            setName(trueorfalse.name);
            setLayout(trueorfalse.layout);
        }
    }, [trueorfalse.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    type="trueorfalse"
                    slug={trueorfalse.slug}
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
                        justifyContent="center"
                        onSubmit={handleSubmit}
                        spacing={3}
                    >
                        {mode === 'CREATE' && (
                            <>
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
                                <Grid item align="center" xs={3}>
                                    <FillableSelect
                                        items={series}
                                        name="Série"
                                        value={selectedSerie}
                                        callBack={seriesChange}
                                    />
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <FillableSelect
                                        items={disciplinas}
                                        name="Disciplinas"
                                        value={selectedDiscipline}
                                        callBack={disciplineChange}
                                    />
                                </Grid>
                            </>
                        )}
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
                                                            onChange={
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
                                                                        defaultChecked={
                                                                            trueorfalse
                                                                                .questions[
                                                                                index
                                                                            ]
                                                                                .answer
                                                                        }
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
