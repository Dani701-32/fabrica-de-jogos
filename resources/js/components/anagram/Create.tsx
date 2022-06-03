import React, { useState, useEffect, ChangeEvent, FormEvent, FormEventHandler } from 'react';
import { Alert, Button, Grid, TextField, Box, SelectChangeEvent, Typography, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import Page from './layout/Page';
import BackFAButton from '../_layout/BackFAButton';
import Copyright from '../_layout/Copyright';
import { RootState } from '../../store';
import { useCreateAnagramMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj } from '../../types';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import { getError } from '../../utils/errors';

const Create = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [createAnagram, response] = useCreateAnagramMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [pages, setPages] = useState([['', '', '', '']]);
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de páginas nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push(['', '', '', '']);
        setPages(p);
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
        page.splice(i, 1, event.target.value);
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
        setPages([['', '', '', '']]);
        setLayout(1);
        setName('');
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        if (value !== null) {
            setSerie(typeof value === 'string' ? value.split(',') : value);
        }
    };
    const disciplineChange = (event: SelectChangeEvent): void => {
        const value = event.target.value;
        if (value !== null && value !== discipline) {
            setDiscipline(value);
        }
    };
    const handleSubmit: FormEventHandler = (event: FormEvent<HTMLInputElement>): void => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let wordsJson: string[] = [];
        pages.map((page) => {
            page.map((item) => {
                wordsJson.push(item);
            });
        });

        const body = {
            name: name,
            layout: layout,
            options: wordsJson,
        };
        createAnagram(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/anagram/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/anagram/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie,
            };
            createGameObject({ origin, token, ...obj });
        }
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true);
        responsePortal.isError && setAlert(getError(responsePortal.error));
    }, [responsePortal.isLoading]);

    return (
        <>
            <BackFAButton />
            <SuccessDialog open={open} handleClose={handleClose} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <Grid container alignSelf="center" alignItems="center" justifyContent="center" component="form" onSubmit={handleSubmit} spacing={3}>
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Anagrama</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={1} display="flex">
                            <Grid
                                alignSelf="center"
                                item
                                xl={4}
                                lg={3}
                                md={12}
                                justifyContent={{ lg: 'flex-end', md: 'none' }}
                                display={{ lg: 'flex', md: 'block' }}
                            >
                                <SeriesSelect serie={serie} callback={seriesChange} />
                            </Grid>
                            <Grid item alignSelf="center" xl={4} lg={3}>
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
                            <Grid
                                alignSelf="center"
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
                            <Grid item alignSelf="center" xs={12}>
                                <LayoutSelect callback={handleLayout} selectedLayout={layout} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Button onClick={handleAddWord} endIcon={<AddIcon fontSize="small" />} variant="contained">
                            Adicionar Pagina
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignSelf="center" alignItems="flex-start" justifyContent="center" spacing={5}>
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
                            {pages.map((page: string[], index: number) => {
                                return <Page key={index} page={page} index={index} onChange={handleWordChange} handleDelete={handleRemovePage} />;
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

export default Create;
