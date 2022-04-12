import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Alert,
    Button,
    Grid,
    Box,
    TextField,
    SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import { setBaseState } from '../../reducers/userReducer';
import {
    useGetAnagramBySlugQuery,
    useUpdateAnagramMutation
} from '../../services/games';
import {
    useEditGameObjectMutation,
    useGetGameObjectByIdQuery
} from '../../services/portal';
import ObjectPropertiesSelect from '../_layout/ObjectPropertiesSelect';
import { RootState } from '../../store';

export default function Edit() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetAnagramBySlugQuery(slug as string);
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [updateAnagram, response] = useUpdateAnagramMutation();
    const [editGameObject] = useEditGameObjectMutation();
    function sliceIntoChunks(arr: string[], chunkSize: number): string[][] {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const [pages, setPages] = useState([['', '', '', '']]);
    const [selectedSerie, setSelectedSerie] = useState(['']);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de páginas nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push(['', '', '', '']);
        setPages(p);
    };
    const handleRemoveWord = (index: number) => {
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
    const seriesChange = (event: SelectChangeEvent<typeof selectedSerie>) => {
        const value = event.target.value;
        if (value !== null) {
            setSelectedSerie(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };
    const disciplineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (pages.length < 1) {
            setAlert('O jogo deve ter no mínimo 1 página!');
            return;
        }
        let wordsJson: string[] = [];
        pages.map((page) => {
            page.map((item) => {
                wordsJson.push(item);
            });
        });
        const body = {
            layout: layout,
            words: wordsJson
        };
        updateAnagram({ ...body, slug }).then(() => {
            setOpen(true);
        });
    };
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            dispatch(setBaseState());
        }, 1000);
    }, []);
    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            setPages(sliceIntoChunks(data.words as string[], 4));
            setLayout(data.layout);
        }
        error && setAlert(`Ocorreu um erro: ${error}`);
    }, [isLoading]);

    useEffect(() => {
        if (response.isSuccess) {
            const obj = {
                name: name,
                series: selectedSerie,
                disciplina_id: Number(selectedDiscipline)
            };
            editGameObject({ token, origin, ...obj }).then(() => setOpen(true));
        }
        response.isError && setAlert(`Ocorreu um erro: ${response.error}`);
    }, [response.isLoading]);

    return (
        <>
            <SuccessDialog open={open} handleClose={() => setOpen(false)} />
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
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit as any}
                    spacing={3}
                >
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <TextField
                            label="Nome"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            required
                        />
                    </Grid>
                    <ObjectPropertiesSelect
                        token={token as string}
                        selectedSerie={selectedSerie}
                        handleSelectSerie={seriesChange}
                        selectedDiscipline={selectedDiscipline}
                        handleSelectDiscipline={disciplineChange}
                    />
                    <LayoutPicker
                        handleLayout={handleLayout}
                        selectedLayout={layout}
                    />
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
                    <Grid item lg={12}>
                        <Grid
                            container
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
                            {pages.map((page, index) => {
                                return (
                                    <Page
                                        key={index}
                                        page={page}
                                        index={index}
                                        onChange={handleWordChange}
                                        handleDelete={handleRemoveWord}
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
}
