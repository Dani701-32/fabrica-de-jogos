import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    FunctionComponent,
    useEffect,
    useState
} from 'react';
import BackFAButton from '../_layout/BackFAButton';
import SuccessDialog from '../_layout/SuccessDialog';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useCreatePuzzleMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj } from '../../types';
import { getError } from '../../utils/errors';
import ImageSelect from './layout/ImageSelect';
import PiecesSelect from './layout/PiecesSelect';

const CreatePuzzle: FunctionComponent = ({}) => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [createPuzzle, response] = useCreatePuzzleMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [image, setImage] = useState(0);
    const [pieces, setPieces] = useState<number>(2);
    const handlePieces = (
        event: ChangeEvent<HTMLInputElement>,
        newPieces: number
    ) => {
        if (newPieces === null) {
            return;
        }
        setPieces(newPieces);
    };
    const handleImage = (
        event: ChangeEvent<HTMLInputElement>,
        newImage: number
    ) => {
        if (newImage === null) {
            return;
        }
        setImage(newImage);
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
    const handleSubmit: FormEventHandler = (
        event: FormEvent<HTMLInputElement>
    ): void => {
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
            options: [pieces, image]
        };

        createPuzzle(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/puzzle/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/puzzle/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie
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
                    flexDirection: 'row'
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
                            <b>Quebra-Cabeça</b>
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
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <PiecesSelect
                            pieces={pieces}
                            handlePieces={handlePieces}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <ImageSelect
                            selectedImage={image}
                            callback={handleImage}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        {response.isLoading || responsePortal.isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                Salvar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default CreatePuzzle;
