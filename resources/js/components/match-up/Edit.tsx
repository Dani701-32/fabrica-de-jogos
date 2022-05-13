import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button, Grid, Alert, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from '../_layout/LayoutSelect';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import {
    useUpdateMatchUpMutation,
    useGetMatchUpBySlugQuery
} from '../../services/games';
import { matchUpPage } from '../../types';
import textToDraft from '../../utils/textToDraft';

const EditMatchUp = () => {
    const { slug } = useParams();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [layout, setLayout] = useState(1);
    const initialState: matchUpPage[] = [
        [
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
        ]
    ];
    const [pages, setPages] = useState(initialState);
    const { data, error, isLoading } = useGetMatchUpBySlugQuery(slug as string);
    const [updateMatchUp, response] = useUpdateMatchUpMutation();
    const formatPages = (raw: matchUpPage[]) => {
        raw.map((page) => {
            page.map((matchup) => {
                if (typeof matchup.meaning !== 'string') {
                    return;
                }
                matchup.meaning = textToDraft(matchup.meaning);
            });
        });
        return raw;
    };
    const handleCreatePage = () => {
        if (pages.length >= 10) {
            setAlert('O número máximo de páginas para esse jogo é 10!');
            return;
        }
        setPages([
            ...pages,
            [
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
            ]
        ]);
    };
    const handleRemovePage = (index: number) => {
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };
    const handleWordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
        i: number
    ) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleMeaningChange = (
        editorState: EditorState,
        index: number,
        i: number
    ) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (
        event: React.ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleSubmit: FormEventHandler = (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        let matchUpsJSON: matchUpPage[] = [];
        let error = false;
        pages.map((page: matchUpPage) => {
            let matchUps: matchUpPage = [];
            page.map((matchUp) => {
                const meaning = matchUp.meaning as EditorState;
                let content = meaning.getCurrentContent();
                if (content.getPlainText('').length === 0) {
                    setAlert('Preencha todos os campos!');
                    error = true;
                    return;
                }
                let textJson = convertToRaw(content);
                let markup = draftToText(textJson);
                matchUps.push({
                    meaning: markup,
                    word: matchUp.word
                });
            });
            matchUpsJSON.push(matchUps);
        });
        if (error) {
            return;
        }
        let body = {
            layout: layout,
            options: matchUpsJSON
        };
        updateMatchUp({ ...body, slug });
    };

    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            let deep_copy = JSON.parse(JSON.stringify(data.options));
            setPages(formatPages(deep_copy));
            setLayout(data.layout);
        }
        error && setAlert(`Ocorreu um erro: ${error}`);
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && setOpen(true);
        response.isError && setAlert(`Ocorreu um erro: ${response.error}`);
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
                    <LayoutPicker
                        handleLayout={handleLayout}
                        selectedLayout={layout}
                    />
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleCreatePage}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar página
                        </Button>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Grid
                            container
                            spacing={3}
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
                            {pages.map((page: matchUpPage, index: number) => {
                                return (
                                    <Page
                                        key={index}
                                        page={page}
                                        index={index}
                                        handleWordChange={handleWordChange}
                                        handleMeaningChange={
                                            handleMeaningChange
                                        }
                                        handleDelete={handleRemovePage}
                                    />
                                );
                            })}
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

export default EditMatchUp;
