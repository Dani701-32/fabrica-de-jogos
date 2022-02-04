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
    ToggleButton,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();

const ImageToggleButton = styled(ToggleButton)({
    '&.Mui-selected': {
        border: '5px solid rgba(0, 134, 248, 0.7)'
    }
});

export default function CreateWordSearch() {
    const navigate = useNavigate();
    const [words, setWords] = useState(['']);
    const handleAddWord = () => {
        let words_ = [...words];
        words_.push('');
        setWords(words_);
    };
    const handleRemoveWord = (index) => {
        if (words.length === 1) {
            return;
        }
        let words_ = [...words];
        words_.splice(index, 1);
        setWords(words_);
    };

    const handleWordChange = (event, index) => {
        let words_ = [...words];
        words_.splice(index, 1, event.target.value);
        setWords(words_);
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
        const body = JSON.stringify({
            name: name,
            layout: layout,
            words: words
        });
        console.log(body);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGI2OWIxOTE4ODg3OTc5M2IwZjRiY2M2NTVjNTRkMGQxMGIzZDM3M2VhYTVjZjYwZmVlYTFmZDhhMGUwYTJiNTBiNWZlZWE0MGY1N2ZhMTIiLCJpYXQiOjE2NDI2MDI4MTkuMTY0MTYzLCJuYmYiOjE2NDI2MDI4MTkuMTY0MTY4LCJleHAiOjE2NzQxMzg4MTkuMTU2Nzc3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lJKyZb1bS5BToPjsz5xUdsUJ-arSRhsco6GXHJ-Xl6mmGLEaKt-2wzZ29fcq9FNP1GjUbnko96_9Ho8IEK37UXs4kXfHldsYlGch8u0ZLv83HgFctWyYHVpOoQ6_J8ATRFKQLtuWQ12JNmB_NHNV6SuoR7JQI603hsHTlEc_UGodBMO0RK3WEnIbZ3gsunEB9gCMhhesXD2tKhLhCbNeG5IFhhP_UQHVRjy4gVUg2dRxytwSp6VoIMpmFDkKRrRJHSG7bZz5rcodMwJVsFzWcFNhwBN0dtakiq_YD3s7u0Mo0NBcKm6G4OysoTw-2GMYdXNtzn46mg8rslkUcPOJkrpGSw-T1ZNhCeAqby3o6rptNGMhSTK9POZ9N0oUOHic96xk_cUKUUDpDPMvzV3L_Key3EzyUjge19QzvSPdFY3aXYEcCkvjRRanqun13q5KD4o3yMOHHsVSUKNX80P1mur5mnqL9rRIhPq1mXsNsHN-G14sVRRArSjpiHVBPSKq1g044_38VWyll-quWsJrnQfNaydILKxeuanM7x7hw1KzlJv6ift0ac3yIRFrph_jsva6CIGg86dv93lOx-uZJ9OLSjEbZcN66oap4C4yvIOVZeDy-yw-eKH1_D0Zsz898CmhogeuJsCCY1dfrTAzC0KTE19vBKivKXn_9zm66qs'
            }
        };
        axios.post('/api/wordsearch', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/wordsearch/${response.data.data.slug}`);
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
                        <Grid item align="center" xs={12}>
                            <Grid container align="center" alignItems="center">
                                <Grid item align="center" xs={12}>
                                    <Typography variant="subtitle1">
                                        Layout:
                                    </Typography>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 1}
                                        value={1}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout1.png"
                                            alt="Layout 1"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 2}
                                        value={2}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout2.png"
                                            alt="Layout 2"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 3}
                                        value={3}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout3.png"
                                            alt="Layout 3"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                                <Grid item align="center" xs={3}>
                                    <ImageToggleButton
                                        selected={layout === 4}
                                        value={4}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            padding: 0
                                        }}
                                        onChange={(event, value) => {
                                            handleLayout(event, value);
                                        }}
                                    >
                                        <img
                                            src="/storage/trueorfalse/layout3.png"
                                            alt="Layout 4"
                                            width="250"
                                            height="auto"
                                        />
                                    </ImageToggleButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Button
                                onClick={handleAddWord}
                                endIcon={<AddIcon fontSize="small" />}
                                variant="contained"
                            >
                                Adicionar palavra
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
                                {words.map((word, index) => {
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
                                                            value={word}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                handleWordChange(
                                                                    event,
                                                                    index
                                                                );
                                                            }}
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <IconButton
                                                            disabled={
                                                                index === 0 &&
                                                                index ===
                                                                    words.length -
                                                                        1
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
