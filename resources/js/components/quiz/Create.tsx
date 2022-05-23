import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import {
    Button,
    TextField,
    Grid,
    Alert,
    Box,
    SelectChangeEvent,
    CircularProgress,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import QuestionCard from './layout/QuestionCard';
import Copyright from '../_layout/Copyright';
import BackFAButton from '../_layout/BackFAButton';
import { RootState } from '../../store';
import { useCreateQuizMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj, quizQuestion, quizOptions, gameState } from '../../types';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';

const CreateQuiz = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const initialState: quizQuestion[] = [
        { title: EditorState.createEmpty(), answers: ['', ''] }
    ];
    const [questions, setQuestions] = useState(initialState);
    const [createQuiz, response] = useCreateQuizMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const handleCreateQuestion = () => {
        if (questions.length >= 8) {
            setAlert('O número máximo de questões para esse jogo é 8!');
            return;
        }
        setQuestions([
            ...questions,
            { title: EditorState.createEmpty(), answers: ['', ''] }
        ]);
    };
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleRemoveQuestion = (index: number) => {
        if (questions.length === 1) {
            return;
        }
        let q = [...questions];
        q.splice(index, 1);
        setQuestions(q);
    };
    const handleCreateAnswer = (index: number) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 5) {
            return;
        }
        question.answers.push('');
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleRemoveAnswer = (index: number, i: number) => {
        let q = [...questions];
        let question = questions[index];
        if (question.answers.length === 2) {
            return;
        }
        question.answers.splice(i, 1);
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleQuestionTitleChange = (value: EditorState, index: number) => {
        let q = [...questions];
        let question = q[index];
        question.title = value;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleAnswerChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        i: number
    ) => {
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
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>): void => {
        const value = event.target.value;
        if (value !== null) {
            setSerie(typeof value === 'string' ? value.split(',') : value);
        }
    };
    const disciplineChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (value !== null && value !== discipline) {
            setDiscipline(value);
        }
    };
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let questionsJSON: quizQuestion[] = [];
        let error = false;
        questions.map((item: quizQuestion) => {
            const title = item.title as EditorState;
            const content = title.getCurrentContent();
            if (content.getPlainText('').length === 0) {
                setAlert('Preencha todos os campos!');
                error = true;
                return;
            }
            let textJson = convertToRaw(content);
            let markup = draftToText(textJson);
            questionsJSON.push({
                answers: item.answers,
                title: markup
            });
        });
        if (error) {
            return;
        }
        let body: gameState<quizOptions> = {
            name: name,
            layout: layout,
            options: questionsJSON
        };
        createQuiz(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/quiz/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/quiz/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie
            };
            createGameObject({ token, origin, ...obj });
        }
    }, [response.isLoading]);

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true);
        responsePortal.isError &&
            setAlert(`Ocorreu um error: ${response.error}`);
    }, [responsePortal.isLoading]);

    return (
        <>
            <SuccessDialog open={open} handleClose={handleClose} />
            <BackFAButton />
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
                    component="form"
                    justifyContent="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Quiz</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            spacing={1}
                            display="flex"
                        >
                            {/* @ts-ignore*/}
                            <Grid
                                align="center"
                                item
                                xl={4}
                                lg={3}
                                md={12}
                                justifyContent={{ lg: 'flex-end', md: 'none' }}
                                display={{ lg: 'flex', md: 'block' }}
                            >
                                <SeriesSelect
                                    serie={serie}
                                    callback={seriesChange}
                                />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xl={4} lg={3}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    required
                                    sx={{ minWidth: { sm: 290, xs: 260 } }}
                                    fullWidth
                                />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid
                                align="center"
                                item
                                justifyContent={{
                                    lg: 'flex-start',
                                    md: 'none'
                                }}
                                display={{ lg: 'flex', md: 'block' }}
                                xl={4}
                                lg={3}
                                md={12}
                            >
                                <DisciplineSelect
                                    discipline={discipline}
                                    callback={disciplineChange}
                                />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xs={12}>
                                <LayoutSelect
                                    callback={handleLayout}
                                    selectedLayout={layout}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleCreateQuestion}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Questão
                        </Button>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" lg={12}>
                        <Grid
                            container
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
                            {questions.map(
                                (question: quizQuestion, index: number) => {
                                    return (
                                        <QuestionCard
                                            key={index}
                                            question={question}
                                            index={index}
                                            handleCreateAnswer={
                                                handleCreateAnswer
                                            }
                                            handleAnswerChange={
                                                handleAnswerChange
                                            }
                                            handleRemoveAnswer={
                                                handleRemoveAnswer
                                            }
                                            handleQuestionTitleChange={
                                                handleQuestionTitleChange
                                            }
                                            handleRemoveQuestion={
                                                handleRemoveQuestion
                                            }
                                        />
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        {response.isLoading || responsePortal.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                Salvar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default CreateQuiz;
