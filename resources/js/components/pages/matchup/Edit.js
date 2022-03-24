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
import Page from './layout/Page';

const EditMatchUp = () => {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const matchup = useSelector((state) => state.game.matchup);
    const [name, setName] = useState(matchup.name);
    const [layout, setLayout] = useState(matchup.layout);
    const [pages, setPages] = useState(matchup.pages);
    const dispatch = useDispatch();
    const { getGame, editGame, setAlert, setClose, refreshBaseState } =
        bindActionCreators(actionCreators, dispatch);
    const page = [
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        }
    ];
    const handleCreatePage = () => {
        if (pages.length >= 10) {
            setAlert('O número máximo de páginas para esse jogo é 10!');
            return;
        }
        setPages([...pages, page]);
    };
    const handleRemovePage = (index) => {
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };
    const handleWordChange = (event, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleMeaningChange = (editorState, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setLayout(1);
        setName('');
        setPages([page]);
        setClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let matchUpsJSON = [];
        pages.map((page) => {
            let matchUps = [];
            page.map((matchUp) => {
                let textJson = convertToRaw(
                    matchUp.meaning.getCurrentContent()
                );
                let markup = draftToText(textJson);
                matchUps.push({
                    meaning: markup,
                    word: matchUp.word
                });
            });
            matchUpsJSON.push(matchUps);
        });
        let body = {
            name: name,
            layout: layout,
            pages: matchUpsJSON
        };
        editGame(body, 'matchup', matchup.slug);
    };
    useEffect(() => {
        getGame('matchup', slug);
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            refreshBaseState();
        }, 2000);
    }, []);

    useEffect(() => {
        matchup.approved_at &&
            setAlert(
                'Esse jogo já foi aprovado, logo não pode mais ser editado!'
            );
        setPages(matchup.pages);
        setName(matchup.name);
        setLayout(matchup.layout);
    }, [matchup.slug]);

    return (
        <>
            <SuccessDialog
                open={open}
                handleClose={handleClose}
                edit={true}
                type="matchup"
                slug={matchup.slug}
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
                        onClick={handleCreatePage}
                        endIcon={<AddIcon fontSize="small" />}
                        variant="contained"
                    >
                        Adicionar página
                    </Button>
                </Grid>
                <Grid item align="center" xs={12}>
                    <Grid
                        container
                        spacing={3}
                        align="center"
                        alignItems="flex-start"
                        justifyContent="center"
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
                        {pages.map((page, index) => {
                            return (
                                <Page
                                    key={index}
                                    page={page}
                                    index={index}
                                    handleWordChange={handleWordChange}
                                    handleMeaningChange={handleMeaningChange}
                                    handleDelete={handleRemovePage}
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
                        disabled={!!matchup.approved_at}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default EditMatchUp;
