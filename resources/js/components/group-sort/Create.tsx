import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Grid, SelectChangeEvent, TextField, Typography } from '@mui/material';
import SuccessDialog from '../_layout/SuccessDialog';
import BackFAButton from '../_layout/BackFAButton';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import Group from './layout/Group';
import { gameObj, gameState, groupSortOptions } from '../../types';
import { useCreateGroupSortMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getError } from '../../utils/errors';

export default function CreateGroupSort({}) {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>('');
    const [groups, setGroups] = useState<groupSortOptions>([
        { title: '', items: ['', ''] },
        { title: '', items: ['', ''] },
    ]);
    const [createGroupSort, response] = useCreateGroupSortMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const handleLayout = (event: ChangeEvent<HTMLInputElement>, newLayout: number) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
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
    const handleClose = () => {
        setName('');
        setLayout(1);
        setOpen(false);
        setAlert('');
        setGroups([
            { title: '', items: ['', ''] },
            { title: '', items: ['', ''] },
        ]);
    };

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        let g = [...groups];
        g[index].title = event.target.value;
        setGroups(g);
    };

    const handleAddItem = (index: number) => {
        if (groups[index].items.length === 5) {
            return;
        }
        let g = [...groups];
        g[index].items.push('');
        setGroups(g);
    };

    const handleRemoveItem = (index: number, i: number) => {
        let g = [...groups];
        g[index].items.splice(i, 1);
        setGroups(g);
    };

    const handleItemChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, i: number) => {
        let g = [...groups];
        g[index].items[i] = event.target.value;
        setGroups(g);
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
        if (groups[0].items.length === 0 || groups[1].items.length === 0) {
            setAlert('Adicione ao menos um item em cada grupo!');
            return;
        }

        const body: gameState<groupSortOptions> = {
            name: name,
            layout: layout,
            options: groups,
        };
        createGroupSort(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/group-sort/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/group-sort/${response?.data?.slug}`,
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
                <Grid container component="form" alignItems="center" onSubmit={handleSubmit} spacing={3}>
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Agrupamentos</b>
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
                            {/* @ts-ignore*/}
                            <Grid item align="center" xs={12}>
                                <LayoutSelect callback={handleLayout} selectedLayout={layout} />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <Grid container justifyContent="center" spacing={3}>
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
                            {groups.map((group, index) => {
                                return (
                                    <Grid key={index} item xs={12} md={6} lg={4}>
                                        <Group
                                            group={group}
                                            index={index}
                                            handleTitleChange={handleTitleChange}
                                            handleItemChange={handleItemChange}
                                            handleAddItem={handleAddItem}
                                            handleRemoveItem={handleRemoveItem}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/* @ts-ignore*/}
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
}
