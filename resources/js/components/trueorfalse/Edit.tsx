import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Grid, Alert, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from '../_layout/LayoutSelect';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuestionCard from './layout/QuestionCard';
import Copyright from '../_layout/Copyright';
import { setOpen, setAlert, setBaseState } from '../../reducers/baseReducer';
import { RootState } from '../../store';
import {
    useUpdateTrueOrFalseMutation,
    useGetTrueOrFalseBySlugQuery
} from '../../services/games';
import { trueOrFalseQuestion } from '../../types';
import textToDraft from '../../utils/textToDraft';

const EditTrueOrFalse = () => {
    const { slug } = useParams();
    const { open, alert } = useSelector((state: RootState) => state.base);
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const { data, error, isLoading } = useGetTrueOrFalseBySlugQuery(
        slug as string
    );
    const [updateTrueOrFalse, response] = useUpdateTrueOrFalseMutation();
    const dispatch = useDispatch();
    const questionObj: trueOrFalseQuestion = {
        title: EditorState.createEmpty(),
        answer: false
    };
    const [questions, setQuestions] = useState([questionObj]);
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
            dispatch(
                setAlert('O número máximo de questões para esse jogo é 9!')
            );
            return;
        }
        setQuestions([...questions, questionObj]);
    };
    const handleRemoveQuestion = (index: number) => {
        if (index === 0) {
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
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let questionsJSON: trueOrFalseQuestion[] = [];
        let error = false;
        questions.map((item: trueOrFalseQuestion) => {
            const title = item.title as EditorState;
            let content = title.getCurrentContent();
            if (content.getPlainText('').length === 0) {
                dispatch(setAlert('Preencha todos os campos!'));
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
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            dispatch(setBaseState());
        }, 2000);
    }, []);
    useEffect(() => {
        if (data) {
            data.approved_at &&
                dispatch(
                    setAlert(
                        'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                    )
                );
            let deep_copy = JSON.parse(JSON.stringify(data.questions));
            setQuestions(formatQuestions(deep_copy));
            setName(data.name);
            setLayout(data.layout);
        }
        error && dispatch(setAlert(error));
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && dispatch(setOpen(true));
        response.isError && dispatch(setAlert(response.error));
    }, [response.isLoading]);

    return (
        <>
            <SuccessDialog
                open={open}
                handleClose={() => {
                    dispatch(setOpen(false));
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
                    onSubmit={handleSubmit as any}
                    spacing={3}
                >
                    <LayoutPicker
                        handleLayout={handleLayout}
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
                                            dispatch(setAlert(''));
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
                        <Button
                            size="large"
                            type="submit"
                            variant="outlined"
                            disabled={!!data?.approved_at}
                        >
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default EditTrueOrFalse;
