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

const EditQuiz = () => {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const quiz = useSelector((state) => state.game.quiz);
    const [questions, setQuestions] = useState(quiz.questions);
    const [name, setName] = useState(quiz.name);
    const [layout, setLayout] = useState(quiz.layout);
    const dispatch = useDispatch();
    const { getGame, editGame, setAlert, setClose, refreshBaseState } =
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
        let body = {
            name: name,
            layout: layout,
            questions: questionsJSON
        };
        editGame(body, 'quiz', quiz.slug);
    };
    useEffect(() => {
        getGame('quiz', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);

    useEffect(() => {
        quiz.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setQuestions(quiz.questions);
        setName(quiz.name);
        setLayout(quiz.layout);
    }, [quiz.slug]);

    return (
        <>
            <SuccessDialog
                open={open}
                handleClose={handleClose}
                edit={true}
                slug={quiz.slug}
                type="quiz"
            />
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
                                    handleCreateAnswer={handleCreateAnswer}
                                    handleAnswerChange={handleAnswerChange}
                                    handleRemoveAnswer={handleRemoveAnswer}
                                    handleQuestionTitleChange={
                                        handleQuestionTitleChange
                                    }
                                    handleRemoveQuestion={handleRemoveQuestion}
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
                        disabled={!!quiz.approved_at}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
export default EditQuiz;
