import React, { useEffect, useState } from 'react';
import { Button, Grid, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../../layout/LayoutSelect';
import { convertToRaw, EditorState } from 'draft-js';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../../layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actionCreators';
import WordCard from './layout/WordCard';

const EditWordSearch = () => {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const wordsearch = useSelector((state) => state.game.wordsearch);
    const [words, setWords] = useState(wordsearch.words);
    const [name, setName] = useState(wordsearch.name);
    const [layout, setLayout] = useState(wordsearch.layout);
    const dispatch = useDispatch();
    const { getGame, editGame, setAlert, setClose, refreshBaseState } =
        bindActionCreators(actionCreators, dispatch);
    const handleAddWord = () => {
        if (words.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
            return;
        }
        let p = [...words];
        p.push({
            word: '',
            tip: EditorState.createEmpty()
        });
        setWords(p);
    };
    const handleRemoveWord = (index) => {
        if (words.length === 1) {
            return;
        }
        let p = [...words];
        p.splice(index, 1);
        setWords(p);
    };
    const handleWordChange = (event, index) => {
        let p = [...words];
        let word = p[index];
        word.word = event.target.value;
        p.splice(index, 1, word);
        setWords(p);
    };
    const handleTipChange = (editorState, index) => {
        let p = [...words];
        let word = p[index];
        word.tip = editorState;
        p.splice(index, 1, word);
        setWords(p);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setName('');
        setWords([
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            }
        ]);
        setLayout(1);
        setClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (words.length < 3) {
            setAlert('O jogo deve ter no mínimo 3 palavras!');
            return;
        }
        let wordsJSON = [];
        let error = false;
        words.map((word) => {
            let content = word.tip.getCurrentContent();
            if (content.getPlainText('').length === 0) {
                setAlert('Preencha todos os campos!');
                error = true;
                return;
            }
            let textJson = convertToRaw(content);
            let markup = draftToText(textJson);
            wordsJSON.push({
                tip: markup,
                word: word.word
            });
        });
        if (error) {
            return;
        }
        let body = {
            name: name,
            layout: layout,
            words: wordsJSON
        };
        editGame(body, 'wordsearch', wordsearch.slug);
    };
    useEffect(() => {
        getGame('wordsearch', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);

    useEffect(() => {
        wordsearch.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setWords(wordsearch.words);
        setName(wordsearch.name);
        setLayout(wordsearch.layout);
    }, [wordsearch.slug]);

    return (
        <>
            <SuccessDialog open={open} handleClose={handleClose} />
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
                        onClick={handleAddWord}
                        endIcon={<AddIcon fontSize="small" />}
                        variant="contained"
                    >
                        Adicionar Palavra
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
                        {words.map((item, index) => {
                            return (
                                <WordCard
                                    item={item}
                                    index={index}
                                    handleWordChange={handleWordChange}
                                    handleRemoveWord={handleRemoveWord}
                                    handleTipChange={handleTipChange}
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
                        disabled={!!wordsearch.approved_at}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditWordSearch;
