import React, { FormEventHandler, useEffect, useState } from 'react';
import {Button, Grid, Alert, Box, CircularProgress, Typography, TextField} from '@mui/material';
import LayoutPicker from '../_layout/LayoutSelect';
import SuccessDialog from '../_layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useUpdateWordleMutation, useGetWordleBySlugQuery } from '../../services/games';
import { getError } from '../../utils/errors';

const EditWordSearch = () => {
    const { slug } = useParams();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [word, setWord] = useState('');
    const [layout, setLayout] = useState(1);
    const { data, error, isLoading } = useGetWordleBySlugQuery(slug as string);
    const [updateWordle, response] = useUpdateWordleMutation();

    const handleLayout = (event: React.ChangeEvent<HTMLInputElement>, newLayout: number) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleSubmit: FormEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let body = {
            layout: layout,
            options: [word],
        };
        updateWordle({ slug, ...body });
    };

    useEffect(() => {
        if (data) {
            data.approved_at && setAlert('Esse jogo já foi aprovado, logo não pode mais ser editado!');
            setWord(data.options[0]);
            setLayout(data.layout);
        }
        error && setAlert(getError(error));
    }, [isLoading]);

    useEffect(() => {
        response.isSuccess && setOpen(true);
        response.isError && setAlert(getError(response.error));
    }, [response.isLoading]);

    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
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
                    flexDirection: 'row',
                }}
            >
                <Grid container component="form" justifyContent="center" onSubmit={handleSubmit} spacing={3}>
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Organize as Letras</b>
                        </Typography>
                    </Grid>
                    <LayoutPicker callback={handleLayout} selectedLayout={layout} />
                    {/* @ts-ignore*/}
                    <Grid item align="center" lg={12}>
                        <Grid container alignItems="flex-start" justifyContent="center" spacing={3}>
                            {alert && (
                                /* @ts-ignore*/
                                <Grid item align="center" xs={12}>
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
                            {/* @ts-ignore */}
                            <Grid item align="center" xs={12}>
                                <TextField
                                    label="Palavra"
                                    name="word"
                                    variant="outlined"
                                    value={word}
                                    onChange={(event) => setWord(event.target.value)}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        {response.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Grid item xs={12}>
                                <Button
                                    size="large"
                                    type="submit"
                                    variant="outlined"
                                    disabled={Boolean(data?.approved_at)}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default EditWordSearch;
