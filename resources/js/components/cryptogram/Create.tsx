import React, {
    ChangeEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { cryptogramObj, gameObj, wordObj } from '../../types';
import { convertToRaw, EditorState } from 'draft-js';
import { useCreateCryptogramMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import BackFAButton from '../_layout/BackFAButton';
import { Box } from '@mui/system';
import SeriesSelect from '../_layout/SeriesSelect';
import DisciplineSelect from '../_layout/DisciplineSelect';
import LayoutSelect from '../_layout/LayoutSelect';
import AddIcon from '@mui/icons-material/Add';
import WordCard from '../word-search/layout/WordCard';
import Copyright from '../_layout/Copyright';

export default function CreateCryptogram({}) {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const initialState: cryptogramObj[] = [
        {
            word: '',
            tip: EditorState.createEmpty()
        },
        {
            word: '',
            tip: EditorState.createEmpty()
        },
        {
            word: '',
            tip: EditorState.createEmpty()
        }
    ];
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('');
    const [words, setWords] = useState(initialState);
    const [name, setName] = useState<string>('');
    const [layout, setLayout] = useState<number>(1);
    const [serie, setSerie] = useState<string[]>([]);
    const [discipline, setDiscipline] = useState<string>('');
    const [createCryptogram, response] = useCreateCryptogramMutation();
    const [createGameObject, responsePortal] = useCreateGameObjectMutation();
    const handleAddWord = () => {
        if (words.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
            return;
        }
        let p = [...words];
        p.push({
            word: '',
            tip: EditorState.createEmpty()
        });
        setWords(p);
    };
    const handleRemoveWord = (index: number) => {
        if (words.length === 1) {
            return;
        }
        let p = [...words];
        p.splice(index, 1);
        setWords(p);
    };
    const handleWordChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let p = [...words];
        let word = p[index];
        word.word = event.target.value;
        p.splice(index, 1, word);
        setWords(p);
    };
    const handleTipChange = (editorState: EditorState, index: number) => {
        let p = [...words];
        let word = p[index];
        word.tip = editorState;
        p.splice(index, 1, word);
        setWords(p);
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
        setName('');
        setWords([
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            }
        ]);
        setLayout(1);
        setOpen(false);
    };
    const seriesChange = (event: SelectChangeEvent<typeof serie>) => {
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
        event: ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        if (words.length < 3) {
            setAlert('O jogo deve ter no mínimo 3 palavras!');
            return;
        }
        if (serie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (discipline === '') {
            setAlert('Selecione uma disciplina!');
            return;
        }
        let wordsJSON: wordObj[] = [];
        let error = false;
        words.map((word: wordObj) => {
            const tip = word.tip as EditorState;
            let content = tip.getCurrentContent();
            if (content.getPlainText('').length === 0) {
                setAlert('Preencha todos os campos!');
                error = true;
                return;
            }
            let textJson = convertToRaw(content);
            let markup = draftToText(textJson);
            wordsJSON.push({
                tip: markup,
                word: word.word
            });
        });
        if (error) {
            return;
        }
        let body = {
            name: name,
            layout: layout,
            options: wordsJSON
        };
        createCryptogram(body);
    };

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/cryptogram/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/game/cryptogram/${response?.data?.slug}`,
                disciplina_id: Number(discipline),
                series: serie
            };
            createGameObject({ token, origin, ...obj });
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
                    justifyContent="center"
                    onSubmit={handleSubmit}
                    spacing={3}
                >
                    <Grid item alignSelf="center" textAlign="center" xs={12}>
                        <Typography color="primary" variant="h2" component="h2">
                            <b>Criptograma</b>
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
                    <Grid item align="center" xs={12}>
                        <Button
                            onClick={handleAddWord}
                            endIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                        >
                            Adicionar Palavra
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
                                /* @ts-ignore */
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
                            {words.map((item: wordObj, index: number) => {
                                return (
                                    <WordCard
                                        item={item}
                                        key={index}
                                        index={index}
                                        handleWordChange={handleWordChange}
                                        handleRemoveWord={handleRemoveWord}
                                        handleTipChange={handleTipChange}
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
