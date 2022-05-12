import React, {
    ChangeEvent,
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
    SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from '../_layout/LayoutSelect';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import QuestionCard from './layout/QuestionCard';
import Copyright from '../_layout/Copyright';
import BackFAButton from '../_layout/BackFAButton';
import { RootState } from '../../store';
import { useCreateTrueOrFalseMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj, trueOrFalseQuestion } from '../../types';
import ObjectPropertiesSelect from '../_layout/ObjectPropertiesSelect';

const CreateTrueOrFalse = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const [selectedSerie, setSelectedSerie] = useState([] as string[]);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [createTrueOrFalse, response] = useCreateTrueOrFalseMutation();
    const [createGameObject] = useCreateGameObjectMutation();
    const initialState: trueOrFalseQuestion[] = [
        { title: EditorState.createEmpty(), answer: false }
    ];
    const [questions, setQuestions] = useState(initialState);
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleCreateQuestion = () => {
        if (questions.length >= 8) {
            setAlert('O número máximo de questões para esse jogo é 8!');
            return;
        }
        setQuestions([
            ...questions,
            { title: EditorState.createEmpty(), answer: false }
        ]);
    };
    const handleRemoveQuestion = (index: number) => {
        if (questions.length === 1) {
            return;
        }
        let q = [...questions];
        q.splice(index, 1);
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
        index: number
    ) => {
        let q = [...questions];
        let question = q[index];
        question.answer = event.target.checked;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleClose = () => {
        setName('');
        setQuestions([{ title: EditorState.createEmpty(), answer: false }]);
        setLayout(1);
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        if (value !== null) {
            setSelectedSerie(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };
    const disciplineChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit: FormEventHandler = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        if (selectedSerie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (selectedDiscipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let questionsJSON: trueOrFalseQuestion[] = [];
        let error = false;
        questions.map((item: trueOrFalseQuestion) => {
            const title = item.title as EditorState;
            let content = title.getCurrentContent();
            if (content.getPlainText('').length === 0) {
                setAlert('Preencha todos os campos!');
                error = true;
                return;
            }
            let textJson = convertToRaw(content);
            let markup = draftToText(textJson);
            questionsJSON.push({
                answer: item.answer,
                title: markup
            });
        });
        if (error) {
            return;
        }
        let body = {
            name: name,
            layout: layout,
            questions: questionsJSON
        };

        createTrueOrFalse(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/trueorfalse/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/true-or-false/${response?.data?.slug}`,
                disciplina_id: Number(selectedDiscipline),
                series: selectedSerie
            };
            // @ts-ignore
            createGameObject({ token, origin, ...obj }).then(() => {
                setOpen(true);
            });
        }
        response.isError && setAlert(`Ocorreu um error: ${response.error}`);
    }, [response.isLoading]);

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
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <TextField
                            label="Nome"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            sx={{ minWidth: { xs: 280, sm: 296 } }}
                            required
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <ObjectPropertiesSelect
                            token={token as string}
                            origin={origin as string}
                            selectedSerie={selectedSerie}
                            handleSelectSerie={seriesChange}
                            selectedDiscipline={selectedDiscipline}
                            handleSelectDiscipline={disciplineChange}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
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
                                (
                                    question: trueOrFalseQuestion,
                                    index: number
                                ) => {
                                    return (
                                        <QuestionCard
                                            key={index}
                                            question={question}
                                            index={index}
                                            handleRemoveQuestion={
                                                handleRemoveQuestion
                                            }
                                            handleQuestionTitleChange={
                                                handleQuestionTitleChange
                                            }
                                            handleAnswerChange={
                                                handleAnswerChange
                                            }
                                        />
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Button size="large" type="submit" variant="outlined">
                            Criar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default CreateTrueOrFalse;
