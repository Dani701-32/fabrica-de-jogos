import React, { ChangeEvent, FormEvent, FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import BackFAButton from '../_layout/BackFAButton';
import SuccessDialog from '../_layout/SuccessDialog';
import { Alert, Box, Button, CircularProgress, Grid, SelectChangeEvent, TextField, Typography } from '@mui/material';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useCreateDragNDropMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj } from '../../types';
import { getError } from '../../utils/errors';
import FormatSelect from './layout/FormatSelect';

const CreateDragNDrop: FunctionComponent = ({}) => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [createDragNDrop, response] = useCreateDragNDropMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [format, setFormat] = useState<number>(0);
    const handleFormat = (event: ChangeEvent<HTMLInputElement>, newFormat: number) => {
        if (newFormat === null) {
            return;
        }
        setFormat(newFormat);
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
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }

        const body = {
            name: name,
            layout: layout,
            options: [format],
        };

        createDragNDrop(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/drag-drop/${response?.data?.slug}`,
                material: `https://fabricadejogos.portaleducacional.tec.br/game/drag-drop/${response?.data?.slug}`,
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
                <Grid
                    container
                    alignSelf="center"
                    alignItems="center"
                    justifyContent="center"
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Arrastar e Soltar</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={1} display="flex">
                            {/* @ts-ignore*/}
                            <Grid
                                align="center"
                                item
                                xl={4}
                                lg={3}
                                md={12}
                                sm={12}
                                xs={12}
                                justifyContent={{ lg: 'flex-end', xs: 'none' }}
                                display={{ lg: 'flex', xs: '' }}
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
                                    xs: 'none',
                                }}
                                display={{ lg: 'flex', xs: '' }}
                                xl={4}
                                lg={3}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <DisciplineSelect discipline={discipline} callback={disciplineChange} />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xs={12}>
                                <LayoutSelect callback={handleLayout} selectedLayout={layout} />
                            </Grid>
                        </Grid>
                    </Grid>
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
                    <FormatSelect selectedFormat={format} callback={handleFormat} />
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

export default CreateDragNDrop;
