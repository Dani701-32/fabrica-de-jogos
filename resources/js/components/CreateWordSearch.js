import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import { convertToRaw, EditorState } from 'draft-js';
import draftToText from './utils/draftToText';

const theme = createTheme();

export default function CreateWordSearch() {
    const navigate = useNavigate();
    let initialState = [
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

    const [pages, setPages] = useState([...initialState]);

    const handleAddWord = () => {
        if (pages.length >= 8) {
            setAlert('O numero máximo de palavras nesse jogo é 8!');
            return;
        }
        let p = [...pages];
        p.push({
            word: '',
            tip: EditorState.createEmpty()
        });
        setPages(p);
    };

    const handleRemoveWord = (index) => {
        if (pages.length === 1) {
            return;
        }
        let p = [...pages];
        p.splice(index, 1);
        setPages(p);
    };

    const handleWordChange = (event, index) => {
        let p = [...pages];
        let page = p[index];
        page.word = event.target.value;
        p.splice(index, 1, page);
        setPages(p);
    };

    const handleTipChange = (editorState, index) => {
        let p = [...pages];
        let page = p[index];
        page.tip = editorState;
        p.splice(index, 1, page);
        setPages(p);
    };

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pages.length < 3) {
            setAlert('O jogo deve ter no mínimo 3 palavras!');
            return;
        }
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let wordsJSON = [];
        pages.map((page) => {
            let textJson = convertToRaw(page.tip.getCurrentContent());
            let markup = draftToText(textJson);
            wordsJSON.push({
                tip: markup,
                word: page.word
            });
        });
        const body = JSON.stringify({
            name: name,
            layout: layout,
            words: wordsJSON
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWFhYzRiNGYyMTBiMGM4MmMyNWUwYTNhNzU1NWQwNmJiYTdjOTJiZTNjODRlNDA5N2MwZGM5MjBkMzJiODAyOWRlMzE3MWVhOGM2ZThkNWIiLCJpYXQiOjE2NDE5MjU4ODMuNDQwNDMzLCJuYmYiOjE2NDE5MjU4ODMuNDQwNDM3LCJleHAiOjE2NzM0NjE4ODMuNDI5NDI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Z87TMAFbFhPXHftVULt0snAY0rbXgGs5I_DhMvlVhdC0HtcHqQxdAVSIOOoTt3rcx0rUOPxbPeLXlPlf0P5Y4vOAQukCFI2L2lbq12daRpYYg7ZQNBt-KYG974tcNbd6_YH7xViOISqPRreTEF6nSPun3rvjuKT65TwFR1fjzf0vXOQDxPlMES9aYRNRsjnrHcnDe-KO9j_040WJtI5ZI43tWFRWMq6Rb1U4e-l1hLopKHZpukNxqe3ZHIvwiZSBKb_wDRilxmuzP-UnVF2vCbvgJBkQGwlrKZusoLD6ixf-towFcKlrHZX5Wn71bevsIUW9S4jc5FMKf2zB41ii4Y_oglwlAg36l58vDDfncHEY8R_ppkR3jjWu1U3un4bLbaXS-yLn7VqkL-Fdyk94kKUCi5aBhWbc_VZGPSVSeiU-QujSlTwG_ghRuIASBH-mpmBq8WedADhMA6uGWRc52F3Tn31Ske0LQLDZPiw0NbZ56E5uXJOhFo10DXki7MVh-oPhNNGEndOHV5rNguB0Zf1fX15UTMFUKPbbw81whx_yM5_AlfDzPFOYLjSnwa2sPGlsMoYTUkw_LjuUlJsUnmeGwNdts08eGynIdx3F9SI4AIr2sY9FemkBS9_8kFWGqG9cK3jMwurFDXkG0wvO9jHsI5-u0zGfZosPyIApGoQ'
            }
        };
        axios
            .post('/api/wordsearch', body, config)
            .then((response) => {
                if (response.status === 201) {
                    navigate(`/wordsearch/${response.data.slug}`);
                }
            })
            .catch((error) => {
                setAlert(
                    `Error ${error.response.status}: ${error.response.data.message}`
                );
            });
    };

    const [alert, setAlert] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
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
                                required
                            />
                        </Grid>
                        <LayoutPicker
                            handleLayout={handleLayout}
                            selectedLayout={layout}
                        />
                        <Grid item align="center" xs={12}>
                            <Button
                                onClick={handleAddWord}
                                endIcon={<AddIcon fontSize="small" />}
                                variant="contained"
                            >
                                Adicionar Palavra
                            </Button>
                        </Grid>
                        <Grid item lg={12}>
                            <Grid
                                container
                                align="center"
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
                                {pages.map((page, index) => {
                                    return (
                                        <Grid
                                            item
                                            xs={8}
                                            md={6}
                                            lg={4}
                                            key={index}
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
                                                >
                                                    <Grid item xs={10}>
                                                        <TextField
                                                            label="Palavra"
                                                            name="word"
                                                            variant="outlined"
                                                            value={page.word}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleWordChange(
                                                                    event,
                                                                    index
                                                                );
                                                            }}
                                                            inputProps={{
                                                                maxLength: 10
                                                            }}
                                                            fullWidth
                                                            required
                                                        />
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
                                                                handleRemoveWord(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid
                                                        align="left"
                                                        item
                                                        xs={10}
                                                    >
                                                        <RichTextField
                                                            editorState={
                                                                page.tip
                                                            }
                                                            handleTextChange={
                                                                handleTipChange
                                                            }
                                                            label={'Dica'}
                                                            index={index}
                                                            maxLength={200}
                                                        />
                                                    </Grid>
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
                                Criar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                Edutec {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
