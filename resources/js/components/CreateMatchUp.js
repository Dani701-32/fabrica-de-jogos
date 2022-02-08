import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Container,
    Box,
    CssBaseline,
    IconButton,
    Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js';
import axios from 'axios';
import LayoutPicker from './layout/layoutPicker';
import RichTextField from './layout/richTextField';
import draftToText from './utils/draftToText';

const theme = createTheme();

export default function CreateMatchUp() {
    const navigate = useNavigate();
    let initialState = [
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
    const [pages, setPages] = useState([initialState]);

    const handleCreatePage = () => {
        setPages([...pages, initialState]);
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

    const [layout, setLayout] = useState(1);

    const handleLayout = (event, newLayout) => {
        if (newLayout === null) {
            return;
        }
        setLayout(newLayout);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let name = data.get('name');
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
        const body = JSON.stringify({
            name: name,
            layout: layout,
            pages: matchUpsJSON
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDU1YmE3YWVkY2ZhZTlhZjUxMGMzMTBlOWZmODY3ODc0ZGFiNGY5ZGRjMGY0M2IwNzQ3M2VlMzcxYWE2YjE4NTBjZmRhMWY0ODFmMTkyOTYiLCJpYXQiOjE2NDMwMTkzNDMuMTc3MjMsIm5iZiI6MTY0MzAxOTM0My4xNzcyMzcsImV4cCI6MTY3NDU1NTM0My4wOTU5NCwic3ViIjoiMSIsInNjb3BlcyI6W119.cZ_qYhOKtL6zCtska_12w0w-JMabe_O7a6Jy_jdQJ9Jq8BgFOIoxhX4tbcFADoWd8Xm1e8mjXT1y2nBWgweNfZD2Rz7kJgKSg6y9CHferhmzQ5tcIri6GThmKlZfJR5aJNVlFncf7F3xYvcRuBLxQ5z5cLLGSuKkNQr7h_T9BwcA8NWePmDWFmpt2ANFBrAJXYhH7bzriVvDhjr3rAWz6pDwaxM4KPpc0xt8vJBR39Mhrqy--6NiHQ5QqaCkiJ5VRggy7GRaJPTDgzjKLyPsCVYne79iJ6pRW-I8jsdLNBOdlPf38qArY_qPirOlGrPM7vUJq2OhyazDFghdFHI3y7mPItP9RKSdJCjgNb-EFzpmB90hDhckxB9bAeqZclLZW_J_I_NQvNSOrtr9vwesGdp6uDc7uzhRuZZy0zVh6w0v7xj26GclcT4QW3yWg09m0H33VQzhHzmbt5aQbJx4zPnYUKEvEQLGkmlsmsGYMfv5_876EBm6AV3cbNLfZOqkhXi7NkQhxZGCdM6IVpJLXAYPZl3wp0PSj_Yl8sU6jDoqqAwveDlYAfeHpVGZAjkR5xfvZ7SZwJ8BZR8bbIguYnPwIcgLTOAP-ylyT-QDPtuAiM4VTErORNZKXwcDZWUA0msmg-ulmg53Fy4-5KpTyA2x0FiuFs3_EwAdIz209SY'
            }
        };
        axios.post('/api/matchup', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/matchup/${response.data.data.slug}`);
            }
        });
    };

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
                                {pages.map((page, index) => {
                                    return (
                                        <Grid key={index} item md={12} lg={6}>
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
