import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import SuccessDialog from '../_layout/SuccessDialog';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import LayoutSelect from '../_layout/LayoutSelect';
import Group from './layout/Group';
import { gameState, groupSortOptions } from '../../types';
import { useParams } from 'react-router-dom';
import {
    useUpdateGroupSortMutation,
    useGetGroupSortBySlugQuery
} from '../../services/games';

export default function EditGroupSort({}) {
    const { slug } = useParams();
    const { data, error, isLoading } = useGetGroupSortBySlugQuery(
        slug as string
    );
    const [updateGroupSort, response] = useUpdateGroupSortMutation();
    const [layout, setLayout] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>('');
    const [groups, setGroups] = useState<groupSortOptions>([
        { title: '', items: ['', ''] },
        { title: '', items: ['', ''] }
    ]);
    const handleLayout = (
        event: ChangeEvent<HTMLInputElement>,
        newLayout: number
    ) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleTitleChange = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => {
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

    const handleItemChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        i: number
    ) => {
        let g = [...groups];
        g[index].items[i] = event.target.value;
        setGroups(g);
    };
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        if (groups[0].items.length === 0 || groups[1].items.length === 0) {
            setAlert('Adicione ao menos um item em cada grupo!');
            return;
        }

        const body: Partial<gameState<groupSortOptions>> = {
            layout: layout,
            options: groups
        };
        console.log(body, slug);
        updateGroupSort({ slug, ...body });
    };

    useEffect(() => {
        if (data) {
            data.approved_at &&
                setAlert(
                    'Esse jogo já foi aprovado, logo não pode mais ser editado!'
                );
            let deep_copy = JSON.parse(JSON.stringify(data.options));
            setGroups(deep_copy);
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
                    component="form"
                    alignItems="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Agrupamentos</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <LayoutSelect
                            callback={handleLayout}
                            selectedLayout={layout}
                        />
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
                                    <Grid
                                        key={index}
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}
                                    >
                                        <Group
                                            group={group}
                                            index={index}
                                            handleTitleChange={
                                                handleTitleChange
                                            }
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
}
