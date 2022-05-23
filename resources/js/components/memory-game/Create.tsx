import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Grid,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress,
    Alert,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import ImageEditor from './layout/ImageEditor';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector } from 'react-redux';
import Copyright from '../_layout/Copyright';
import { Box } from '@mui/system';
import BackFAButton from '../_layout/BackFAButton';
import { RootState } from '../../store';
import { useCreateMemoryGameMutation } from '../../services/games';
import { gameObj } from '../../types';
import { useCreateGameObjectMutation } from '../../services/portal';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';

const CreateMemorygame = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [createMemoryGame, response] = useCreateMemoryGameMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const [open, setOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>('');
    const [images, setImages] = useState<Blob[]>([new Blob(), new Blob()]);
    const [size, setSize] = useState<number>(2);
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');

    const handleSize = (
        event: ChangeEvent<HTMLInputElement>,
        newSize: number
    ) => {
        if (newSize === null) {
            return;
        }
        setSize(newSize);
        if (newSize < images.length) {
            images.splice(newSize - 1, images.length - newSize);
        } else if (newSize > images.length) {
            let img = [...images];
            for (let i = 0; i < newSize - images.length; i++) {
                img.push(new Blob());
            }
            setImages(img);
        }
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
    const updateImage = (newImage: Blob, index: number) => {
        let i = [...images];
        i.splice(index, 1, newImage);
        setImages(i);
    };
    const handleClose = () => {
        setName('');
        setLayout(1);
        setSize(2);
        setImages([]);
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
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        const data = new FormData();
        images.map((image: Blob) => {
            data.append('images[]', image);
        });
        data.append('name', name);
        data.append('layout', layout.toString());

        createMemoryGame(data);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/memory-game/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/memory-game/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie
            };
            // @ts-ignore
            createGameObject({ origin, token, ...obj });
        }
        response.isError && setAlert(`Ocorreu um error: ${response.error}`);
    }, [response.isLoading]);

    useEffect(() => {
        responsePortal.isSuccess && setOpen(true);
        responsePortal.isError &&
            setAlert(`Ocorreu um error: ${response.error}`);
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
                    flexDirection: 'row'
                }}
            >
                <Grid
                    container
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Jogo da Memória</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            justifyContent="center"
                            spacing={1}
                            display="flex"
                        >
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
                                <SeriesSelect
                                    serie={serie}
                                    callback={seriesChange}
                                />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xl={4} lg={3}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
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
                                    xs: 'none'
                                }}
                                display={{ lg: 'flex', xs: '' }}
                                xl={4}
                                lg={3}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <DisciplineSelect
                                    discipline={discipline}
                                    callback={disciplineChange}
                                />
                            </Grid>
                            {/* @ts-ignore*/}
                            <Grid item align="center" xs={12}>
                                <LayoutSelect
                                    callback={handleLayout}
                                    selectedLayout={layout}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        <ToggleButtonGroup
                            value={size}
                            exclusive
                            onChange={handleSize as any}
                            aria-label="text alignment"
                            color="primary"
                        >
                            <ToggleButton value={2}>2x2</ToggleButton>
                            <ToggleButton value={3}>2x3</ToggleButton>
                            <ToggleButton value={4}>2x4</ToggleButton>
                            <ToggleButton value={5}>2x5</ToggleButton>
                            <ToggleButton value={6}>3x4</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            alignItems="flex-start"
                            justifyContent="center"
                            spacing={2}
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
                            {images.map((image: Blob, index: number) => {
                                return (
                                    <ImageEditor
                                        key={index}
                                        index={index}
                                        callback={updateImage}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                    {/*@ts-ignore*/}
                    <Grid item align="center" xs={12}>
                        {response.isLoading || responsePortal.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                Criar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default CreateMemorygame;
