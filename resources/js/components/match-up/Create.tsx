import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { Button, TextField, Grid, Alert, Box, SelectChangeEvent, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertToRaw } from 'draft-js';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import { RootState } from '../../store';
import BackFAButton from '../_layout/BackFAButton';
import { useCreateMatchUpMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj, matchUpObj, matchUpPage, matchUpOptions, gameState } from '../../types';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import { getError } from '../../utils/errors';

const CreateMatchUp = () => {
    const [createMatchUp, response] = useCreateMatchUpMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const initialState: matchUpPage[] = [
        [
            { word: '', meaning: EditorState.createEmpty() },
            { word: '', meaning: EditorState.createEmpty() },
            { word: '', meaning: EditorState.createEmpty() },
            { word: '', meaning: EditorState.createEmpty() },
        ],
    ];
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [pages, setPages] = useState(initialState);
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
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
            ],
        ]);
    };
    const handleRemovePage = (index: number) => {
        if (pages.length === 1) {
            return;
        }
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };
    const handleWordChange = (event: ChangeEvent<HTMLInputElement>, index: number, i: number) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleMeaningChange = (editorState: EditorState, index: number, i: number) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (event: ChangeEvent<HTMLInputElement>, newLayout: number) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setLayout(1);
        setName('');
        setPages([
            [
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty(),
                },
            ],
        ]);
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>) => {
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
    const handleSubmit: FormEventHandler = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let matchUpsJSON: matchUpPage[] = [];
        let error = false;
        pages.map((page: matchUpPage) => {
            let matchUps: matchUpObj[] = [];
            page.map((matchUp: matchUpObj) => {
                const meanings: EditorState = matchUp.meaning as EditorState;
                let content = meanings.getCurrentContent();
                if (content.getPlainText('').length === 0) {
                    setAlert('Preencha todos os campos!');
                    error = true;
                    return;
                }
                let textJson = convertToRaw(content);
                let markup = draftToText(textJson);
                matchUps.push({
                    meaning: markup,
                    word: matchUp.word,
                });
            });
            matchUpsJSON.push(matchUps);
        });
        if (error) {
            return;
        }
        let body: Partial<gameState<matchUpOptions>> = {
            name: name,
            layout: layout,
            options: matchUpsJSON,
        };
        createMatchUp(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/match-up/${response?.data?.slug}`,
                material: `https://fabricadejogos.portaleducacional.tec.br/game/match-up/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie,
            };
            createGameObject({ token, origin, ...obj });
        }
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true);
        responsePortal.isError && setAlert(getError(responsePortal.error));
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
                    flexDirection: 'row',
                }}
            >
                <Grid
                    container
                    // @ts-ignore
                    align="center"
                    component="form"
                    justifyContent="center"
                    alignItems="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Combinação</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Grid container justifyContent="center" spacing={1} display="flex">
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
                                <SeriesSelect serie={serie} callback={seriesChange} />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xl={4} lg={3}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
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
                                    md: 'none',
                                }}
                                display={{ lg: 'flex', md: 'block' }}
                                xl={4}
                                lg={3}
                                md={12}
                            >
                                <DisciplineSelect discipline={discipline} callback={disciplineChange} />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xs={12}>
                                <LayoutSelect callback={handleLayout} selectedLayout={layout} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Button onClick={handleCreatePage} endIcon={<AddIcon fontSize="small" />} variant="contained">
                            Adicionar página
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3} alignItems="flex-start" justifyContent="center">
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
                                        handleMeaningChange={handleMeaningChange}
                                        handleDelete={handleRemovePage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        {response.isLoading || responsePortal.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button size="large" type="submit" variant="outlined">
                                Salvar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default CreateMatchUp;
