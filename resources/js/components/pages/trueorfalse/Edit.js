import React, { useEffect, useState } from 'react';
import { Button, Grid, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from '../../layout/LayoutSelect';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../../layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actionCreators';
import QuestionCard from './layout/QuestionCard';
import Copyright from '../../layout/Copyright';

const EditTrueOrFalse = () => {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const trueorfalse = useSelector((state) => state.game.trueorfalse);
    const [questions, setQuestions] = useState(trueorfalse.questions);
    const [name, setName] = useState(trueorfalse.name);
    const [layout, setLayout] = useState(trueorfalse.layout);
    const dispatch = useDispatch();
    const { getGame, editGame, setAlert, setClose, refreshBaseState } =
        bindActionCreators(actionCreators, dispatch);
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
    const handleAnswerChange = (event, index) => {
        let q = [...questions];
        let question = q[index];
        question.answer = event.target.checked;
        q.splice(index, 1, question);
        setQuestions(q);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let questionsJSON = [];
        let error = false;
        questions.map((item) => {
            let content = item.title.getCurrentContent();
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
        editGame(body, 'trueorfalse', trueorfalse.slug);
    };
    useEffect(() => {
        getGame('trueorfalse', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);
    useEffect(() => {
        trueorfalse.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setQuestions(trueorfalse.questions);
        setName(trueorfalse.name);
        setLayout(trueorfalse.layout);
    }, [trueorfalse.slug]);

    return (
        <>
            <SuccessDialog open={open} handleClose={setClose} />
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
                            {questions.map((question, index) => {
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
                                        handleAnswerChange={handleAnswerChange}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Grid item align="center" xs={12}>
                        <Button
                            size="large"
                            type="submit"
                            variant="outlined"
                            disabled={!!trueorfalse.approved_at}
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
