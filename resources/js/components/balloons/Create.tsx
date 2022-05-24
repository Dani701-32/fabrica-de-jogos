import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import SuccessDialog from '../_layout/SuccessDialog';
import BackFAButton from '../_layout/BackFAButton';
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
import AddIcon from '@mui/icons-material/Add';
import { balloonOptions, gameObj, gameState } from '../../types';
import Page from './layout/Page';
import Copyright from '../_layout/Copyright';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { convertToRaw, EditorState } from 'draft-js';
import { useCreateBalloonsMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import draftToText from '../../utils/draftToText';
import RichTextField from '../_layout/RichTextField';

export default function CreateBalloons({}) {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [question, setQuestion] = useState<EditorState>(
        EditorState.createEmpty()
    );
    const [answers, setAnswers] = useState<string[][]>([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]);
    const [createBalloons, response] = useCreateBalloonsMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const handleAddPage = () => {
        if (answers.length >= 8) {
            setAlert('O número máximo de questões para esse jogo é 8!');
            return;
        }
        setAnswers([...answers, ['', '', '', '', '']]);
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
    const handleRemovePage = (index: number) => {
        if (answers.length === 1) {
            return;
        }
        let q = [...answers];
        q.splice(index, 1);
        setAnswers(q);
    };
    const handleAnswerChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
        i: number
    ) => {
        let a = [...answers];
        let answer = a[index];
        answer[i] = event.target.value;
        a.splice(index, 1, answer);
        setAnswers(a);
    };
    const handleClose = () => {
        setName('');
        setQuestion(EditorState.createEmpty());
        setAnswers([
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ]);
        setLayout(1);
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<string[]>): void => {
        const value = event.target.value;
        if (value !== null) {
            setSerie(typeof value === 'string' ? value.split(',') : value);
        }
    };
    const disciplineChange = (event: SelectChangeEvent) => {
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
        if (answers.length < 3) {
            setAlert('Selecione um mínimo de 3 páginas!');
            return;
        }
        let textJson = convertToRaw(question.getCurrentContent());
        let markup = draftToText(textJson);
        const questionsJSON: balloonOptions = {
            title: markup,
            answers: answers
        };
        let body: gameState<balloonOptions> = {
            name: name,
            layout: layout,
            options: questionsJSON
        };
        createBalloons(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/bloons/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/bloons/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie
            };
            createGameObject({ token, origin, ...obj });
        }
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
                    justifyContent="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Estoura Balões</b>
                        </Typography>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
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
                                justifyContent={{ lg: 'flex-end', md: 'none' }}
                                display={{ lg: 'flex', md: 'block' }}
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
                                    md: 'none'
                                }}
                                display={{ lg: 'flex', md: 'block' }}
                                xl={4}
                                lg={3}
                                md={12}
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
                    {/* @ts-ignore */}
                    <Grid item align="left" xs={3}>
                        <RichTextField
                            editorState={question}
                            onChange={(value: EditorState) =>
                                setQuestion(value)
                            }
                            label={'Enunciado'}
                            maxLength={160}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleAddPage}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Questão
                        </Button>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" lg={12}>
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
                            {answers.map((answers: string[], index: number) => {
                                return (
                                    <Page
                                        key={index}
                                        answers={answers}
                                        index={index}
                                        handleAnswerChange={handleAnswerChange}
                                        handleRemoveQuestion={handleRemovePage}
                                    />
                                );
                            })}
                        </Grid>
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
            <Copyright />
        </>
    );
}
