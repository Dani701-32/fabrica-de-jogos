import React, {
    ChangeEvent,
    FormEventHandler,
    useEffect,
    useState
} from 'react';
import {
    Button,
    Grid,
    TextField,
    Alert,
    SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LayoutPicker from '../_layout/LayoutSelect';
import { convertToRaw, EditorState } from 'draft-js';
import draftToText from '../../utils/draftToText';
import SuccessDialog from '../_layout/SuccessDialog';
import { useSelector, useDispatch } from 'react-redux';
import WordCard from './layout/WordCard';
import Copyright from '../_layout/Copyright';
import { Box } from '@mui/system';
import BackFAButton from '../_layout/BackFAButton';
import { setBaseState } from '../../reducers/userReducer';
import { RootState } from '../../store';
import { useCreateWordSearchMutation } from '../../services/games';
import { useCreateGameObjectMutation } from '../../services/portal';
import { gameObj, wordObj } from '../../types';
import ObjectPropertiesSelect from '../_layout/ObjectPropertiesSelect';

const CreateWordSearch = () => {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const initialState: wordObj[] = [
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
    const [name, setName] = useState('');
    const [layout, setLayout] = useState(1);
    const [selectedSerie, setSelectedSerie] = useState([] as string[]);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [createWordSearch, response] = useCreateWordSearchMutation();
    const [createGameObject] = useCreateGameObjectMutation();
    const dispatch = useDispatch();
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
    const seriesChange = (event: SelectChangeEvent<typeof selectedSerie>) => {
        const value = event.target.value;
        if (value !== null) {
            setSelectedSerie(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };
    const disciplineChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
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
        if (selectedSerie === ['']) {
            setAlert('Selecione uma série!');
            return;
        }
        if (selectedDiscipline === '') {
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
            words: wordsJSON
        };
        createWordSearch(body);
    };
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            dispatch(setBaseState());
        }, 500);
    }, []);

    useEffect(() => {
        if (response.isSuccess) {
            const obj: gameObj = {
                name: response?.data?.name as string,
                slug: `/wordsearch/${response?.data?.slug}`,
                material: `https://www.fabricadejogos.portaleducacional.tec.br/wordsearch/${response?.data?.slug}`,
                disciplina_id: Number(selectedDiscipline),
                series: selectedSerie
            };
            // @ts-ignore
            createGameObject({ token, origin, ...obj }).then(() => {
                setOpen(true);
            });
        }
        response.isError && setAlert(`Ocorreu um error: ${response.error}`);
    }, [response.isLoading]);

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
                            sx={{ minWidth: { xs: 280, sm: 296 } }}
                            required
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <ObjectPropertiesSelect
                            token={token as string}
                            origin={origin as string}
                            selectedSerie={selectedSerie}
                            handleSelectSerie={seriesChange}
                            selectedDiscipline={selectedDiscipline}
                            handleSelectDiscipline={disciplineChange}
                        />
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item align="center" xs={12}>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
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
                        <Button size="large" type="submit" variant="outlined">
                            Criar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Copyright />
        </>
    );
};

export default CreateWordSearch;
