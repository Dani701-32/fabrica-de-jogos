import React, { useState, useEffect, ChangeEvent } from 'react';
import { Alert, Button, Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import { RootState } from '../../store';
import { setAlert, setBaseState, setOpen } from '../../reducers/baseReducer';
import {
    useGetAnagramBySlugQuery,
    useUpdateAnagramMutation
} from '../../services/games';

export default function Edit() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetAnagramBySlugQuery(slug as string);
    const [useUpdateAnagram, response] = useUpdateAnagramMutation();
    function sliceIntoChunks(arr: string[], chunkSize: number): string[][] {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
    const { open, alert } = useSelector((state: RootState) => state.base);
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
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (pages.length < 1) {
            dispatch(setAlert('O jogo deve ter no mínimo 1 página!'));
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
        useUpdateAnagram({ ...body, slug }).then(() => {
            dispatch(setOpen(true));
        });
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
            setPages(sliceIntoChunks(data.words as string[], 4));
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
                handleClose={() => dispatch(setOpen(false))}
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
                    justifyContent="center"
                    component="form"
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
                                            dispatch(setAlert(''));
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
