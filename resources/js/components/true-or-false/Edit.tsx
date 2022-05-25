import React, {
    ChangeEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import {
    Button,
    Grid,
    Alert,
    Box,
    CircularProgress,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from '../_layout/LayoutSelect';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import QuestionCard from './layout/QuestionCard';
import Copyright from '../_layout/Copyright';
import {
    useUpdateTrueOrFalseMutation,
    useGetTrueOrFalseBySlugQuery
} from '../../services/games';
import { trueOrFalseQuestion } from '../../types';
import textToDraft from '../../utils/textToDraft';
import { getError } from '../../utils/errors';

const EditTrueOrFalse = () => {
    const { slug } = useParams();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [layout, setLayout] = useState(1);
    const { data, error, isLoading } = useGetTrueOrFalseBySlugQuery(
        slug as string
    );
    const [updateTrueOrFalse, response] = useUpdateTrueOrFalseMutation();
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
        if (questions.length >= 9) {
            setAlert('O número máximo de questões para esse jogo é 9!');
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
    const handleSubmit: FormEventHandler = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
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
            layout: layout,
            options: questionsJSON
        };
        updateTrueOrFalse({ slug, ...body });
    };

    const formatQuestions = (raw: trueOrFalseQuestion[]) => {
        raw.map((question) => {
            if (typeof question.title !== 'string') {
                return;
            }
            question.title = textToDraft(question.title);
        });
        return raw;
    };

    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            let deep_copy = JSON.parse(JSON.stringify(data.options));
            setQuestions(formatQuestions(deep_copy));
            setLayout(data.layout);
        }
        error && setAlert(getError(error));
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && setOpen(true);
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        );

    return (
        <>
            <SuccessDialog
                open={open}
                handleClose={() => {
                    setOpen(false);
                }}
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
                    component="form"
                    justifyContent="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Verdadeiro ou Falso</b>
                        </Typography>
                    </Grid>
                    <LayoutPicker
                        callback={handleLayout}
                        selectedLayout={layout}
                    />
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleCreateQuestion}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Questão
                        </Button>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" lg={12}>
                        <Grid
                            container
                            alignItems="flex-start"
                            justifyContent="center"
                            spacing={3}
                        >
                            {alert && (
                                /* @ts-ignore*/
                                <Grid item align="center" xs={12}>
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
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        {response.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Grid item xs={12}>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="outlined"
                                    disabled={Boolean(data?.approved_at)}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default EditTrueOrFalse;
