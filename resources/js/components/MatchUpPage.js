import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EditorState, convertToRaw } from 'draft-js';
import LayoutPicker from './layout/LayoutPicker';
import RichTextField from './layout/RichTextField';
import draftToText from './utils/draftToText';
import SuccessDialog from './layout/SuccessDialog';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import BackFAButton from './layout/BackFAButton';
import Copyright from './layout/Copyright';
import FillableSelect from './layout/FillableSelect';

const theme = createTheme();

export default function MatchUpPage({ mode }) {
    const { slug } = useParams();
    const open = useSelector((state) => state.base.open);
    const alert = useSelector((state) => state.base.alert);
    const matchup = useSelector((state) => state.game.matchup);
    const [name, setName] = useState(matchup.name);
    const [layout, setLayout] = useState(matchup.layout);
    const [pages, setPages] = useState(matchup.pages);
    const series = useSelector((state) => state.base.series);
    const [selectedSerie, setSelectedSerie] = useState('');
    const disciplinas = useSelector((state) => state.base.disciplinas);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const dispatch = useDispatch();
    const {
        createGame,
        getGame,
        editGame,
        setAlert,
        setClose,
        refreshBaseState
    } = bindActionCreators(actionCreators, dispatch);
    const page = [
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        },
        {
            word: '',
            meaning: EditorState.createEmpty()
        }
    ];
    const handleCreatePage = () => {
        if (pages.length >= 10) {
            setAlert('O número máximo de páginas para esse jogo é 10!');
            return;
        }
        setPages([...pages, page]);
    };
    const handleRemovePage = (index) => {
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };
    const handleWordChange = (event, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.word = event.target.value;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleMeaningChange = (editorState, index, i) => {
        let p = [...pages];
        let page = p[index];
        let matchUp = page[i];
        matchUp.meaning = editorState;
        page.splice(i, 1, matchUp);
        p.splice(index, 1, page);
        setPages(p);
    };
    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };
    const handleClose = () => {
        setLayout(1);
        setName('');
        setPages([page]);
        setClose();
    };
    const seriesChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedSerie) {
            setSelectedSerie(value);
        }
    };
    const disciplineChange = (event) => {
        const value = event.target.value;
        if (value !== null && value !== selectedDiscipline) {
            setSelectedDiscipline(value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let matchUpsJSON = [];
        pages.map((page) => {
            let matchUps = [];
            page.map((matchUp) => {
                let textJson = convertToRaw(
                    matchUp.meaning.getCurrentContent()
                );
                let markup = draftToText(textJson);
                matchUps.push({
                    meaning: markup,
                    word: matchUp.word
                });
            });
            matchUpsJSON.push(matchUps);
        });
        let body = {
            name: name,
            layout: layout,
            pages: matchUpsJSON
        };
        mode === 'EDIT'
            ? editGame(body, 'matchup', matchup.slug)
            : createGame(body, 'matchup', selectedSerie, selectedDiscipline);
    };
    useEffect(() => {
        refreshBaseState();
        if (mode === 'EDIT') {
            getGame('matchup', slug);
            setPages(matchup.pages);
            setName(matchup.name);
            setLayout(matchup.layout);
        }
    }, [matchup.slug]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <BackFAButton />
                <SuccessDialog
                    open={open}
                    handleClose={handleClose}
                    edit={mode === 'EDIT'}
                    type="matchup"
                    slug={matchup.slug}
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
                        align="center"
                        component="form"
                        onSubmit={handleSubmit}
                        spacing={3}
                    >
                        <Grid item align="center" xs={12}>
                            <TextField
                                label="Nome"
                                name="name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                                required
                            />
                        </Grid>
                        <Grid item align="center" xs={6}>
                            <FillableSelect
                                items={series}
                                name="Série"
                                value={selectedSerie}
                                callBack={seriesChange}
                            />
                        </Grid>
                        <Grid item align="center" xs={6}>
                            <FillableSelect
                                items={disciplinas}
                                name="Disciplinas"
                                value={selectedDiscipline}
                                callBack={disciplineChange}
                            />
                        </Grid>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                        <Grid item align="center" xs={12}>
                            <Button
                                onClick={handleCreatePage}
                                endIcon={<AddIcon fontSize="small" />}
                                variant="contained"
                            >
                                Adicionar página
                            </Button>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Grid
                                container
                                spacing={3}
                                align="center"
                                alignItems="flex-start"
                                justifyContent="center"
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
                                {pages.map((page, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            item
                                            xs={12}
                                            md={6}
                                            lg={6}
                                        >
                                            <Paper
                                                elevation={5}
                                                sx={{
                                                    padding: '15px'
                                                }}
                                            >
                                                <Grid
                                                    container
                                                    align="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Grid item xs={10}>
                                                        <Typography variant="subtitle1">
                                                            Pag{' '}
                                                            {(
                                                                index + 1
                                                            ).toString()}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            disabled={
                                                                index <
                                                                    pages.length -
                                                                        1 ||
                                                                index === 0
                                                            }
                                                            onClick={() => {
                                                                handleRemovePage(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Grid>
                                                    {page.map((matchUp, i) => {
                                                        return (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                key={i}
                                                            >
                                                                <Grid
                                                                    container
                                                                    align="center"
                                                                    alignItems="center"
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                    >
                                                                        <TextField
                                                                            variant="outlined"
                                                                            label="Palavra"
                                                                            required
                                                                            inputProps={{
                                                                                maxLength: 26
                                                                            }}
                                                                            fullWidth
                                                                            value={
                                                                                matchUp.word
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleWordChange(
                                                                                    event,
                                                                                    index,
                                                                                    i
                                                                                )
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={1}
                                                                    >
                                                                        <KeyboardDoubleArrowRight fontSize="small" />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        align="left"
                                                                        xs={7}
                                                                    >
                                                                        <RichTextField
                                                                            editorState={
                                                                                matchUp.meaning
                                                                            }
                                                                            handleTextChange={
                                                                                handleMeaningChange
                                                                            }
                                                                            index={
                                                                                index
                                                                            }
                                                                            i={
                                                                                i
                                                                            }
                                                                            label={
                                                                                'Significado...'
                                                                            }
                                                                            maxLength={
                                                                                80
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                {mode === 'EDIT' ? 'Editar' : 'Criar'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Copyright />
        </ThemeProvider>
    );
}
