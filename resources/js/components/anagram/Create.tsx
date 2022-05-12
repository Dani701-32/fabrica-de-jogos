import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    FormEventHandler
} from 'react';
import {
    Alert,
    Button,
    Grid,
    TextField,
    Box,
    SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import Page from './layout/Page';
import BackFAButton from '../_layout/BackFAButton';
import Copyright from '../_layout/Copyright';
import { RootState } from '../../store';
import { useCreateAnagramMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import ObjectPropertiesSelect from '../_layout/ObjectPropertiesSelect';
import { gameObj } from '../../types';

const Create = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [createAnagram, response] = useCreateAnagramMutation();
    const [createGameObject] = useCreateGameObjectMutation();
    const [selectedSerie, setSelectedSerie] = useState([] as string[]);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
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
    const handleWordChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        i: number
    ) => {
        let p = [...pages];
        let page = p[index];
        page.splice(i, 1, event.target.value);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
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
            setSelectedSerie(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };
    const disciplineChange = (event: SelectChangeEvent): void => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ): void => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        if (selectedSerie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (selectedDiscipline === '') {
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
            options: wordsJson
        };
        createAnagram(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/anagram/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/anagram/${response?.data?.slug}`,
                disciplina_id: Number(selectedDiscipline),
                series: selectedSerie
            };
            // @ts-ignore
            createGameObject({ origin, token, ...obj }).then(() => {
                setOpen(true);
            });
        }
        response.isError && setAlert(`Ocorreu um error: ${response.error}`);
    }, [response.isLoading]);

    // @ts-ignore
    return (
        <>
            <BackFAButton />
            <SuccessDialog open={open} handleClose={handleClose} />
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
                    // @ts-ignore
                    align="center"
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    {/* @ts-ignore*/}
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
                    <Grid item xs={12}>
                        <ObjectPropertiesSelect
                            token={token as string}
                            origin={origin as string}
                            selectedSerie={selectedSerie}
                            handleSelectSerie={seriesChange}
                            selectedDiscipline={selectedDiscipline}
                            handleSelectDiscipline={disciplineChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleAddWord}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Pagina
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {/* @ts-ignore*/}
                        <Grid
                            container
                            align="center"
                            alignItems="flex-start"
                            justifyContent="center"
                            spacing={5}
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
                            {pages.map((page: string[], index: number) => {
                                return (
                                    <Page
                                        key={index}
                                        page={page}
                                        index={index}
                                        onChange={handleWordChange}
                                        handleDelete={handleRemovePage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
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

export default Create;
