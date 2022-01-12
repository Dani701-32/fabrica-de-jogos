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
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();

export default function CreateAnagram() {
    const navigate = useNavigate();
    const [words, setWords] = useState(['']);
    const handleAddWord = () => {
        let words_ = [...words];
        words_.push('');
        setWords(words_);
    };
    const handleRemoveWord = (index) => {
        if (index === 0) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let name = data.get('name');
        let layout = data.get('layout');
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
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWFhYzRiNGYyMTBiMGM4MmMyNWUwYTNhNzU1NWQwNmJiYTdjOTJiZTNjODRlNDA5N2MwZGM5MjBkMzJiODAyOWRlMzE3MWVhOGM2ZThkNWIiLCJpYXQiOjE2NDE5MjU4ODMuNDQwNDMzLCJuYmYiOjE2NDE5MjU4ODMuNDQwNDM3LCJleHAiOjE2NzM0NjE4ODMuNDI5NDI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Z87TMAFbFhPXHftVULt0snAY0rbXgGs5I_DhMvlVhdC0HtcHqQxdAVSIOOoTt3rcx0rUOPxbPeLXlPlf0P5Y4vOAQukCFI2L2lbq12daRpYYg7ZQNBt-KYG974tcNbd6_YH7xViOISqPRreTEF6nSPun3rvjuKT65TwFR1fjzf0vXOQDxPlMES9aYRNRsjnrHcnDe-KO9j_040WJtI5ZI43tWFRWMq6Rb1U4e-l1hLopKHZpukNxqe3ZHIvwiZSBKb_wDRilxmuzP-UnVF2vCbvgJBkQGwlrKZusoLD6ixf-towFcKlrHZX5Wn71bevsIUW9S4jc5FMKf2zB41ii4Y_oglwlAg36l58vDDfncHEY8R_ppkR3jjWu1U3un4bLbaXS-yLn7VqkL-Fdyk94kKUCi5aBhWbc_VZGPSVSeiU-QujSlTwG_ghRuIASBH-mpmBq8WedADhMA6uGWRc52F3Tn31Ske0LQLDZPiw0NbZ56E5uXJOhFo10DXki7MVh-oPhNNGEndOHV5rNguB0Zf1fX15UTMFUKPbbw81whx_yM5_AlfDzPFOYLjSnwa2sPGlsMoYTUkw_LjuUlJsUnmeGwNdts08eGynIdx3F9SI4AIr2sY9FemkBS9_8kFWGqG9cK3jMwurFDXkG0wvO9jHsI5-u0zGfZosPyIApGoQ'
            }
        };
        axios.post('/api/anagram', body, config).then((response) => {
            if (response.data.success === true) {
                navigate(`/anagram/${response.data.data.slug}`);
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
                        spacing={5}
                    >
                        <Grid item align="center" xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                required
                            />
                            <TextField
                                type="number"
                                defaultValue={1}
                                variant="outlined"
                                name="layout"
                                required
                                InputProps={{
                                    inputProps: { min: 1, max: 3 }
                                }}
                            />
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Typography variant="p" fontSize="small">
                                Add Word
                            </Typography>
                            <IconButton onClick={handleAddWord}>
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                        <Grid
                            container
                            align="center"
                            alignItems="flex-start"
                            justifyContent="center"
                            spacing={5}
                        >
                            {words.map((word, index) => {
                                return (
                                    <Grid item xs={8} md={6} lg={4} key={index}>
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
                                                        label="Word"
                                                        name="word"
                                                        variant="outlined"
                                                        value={word}
                                                        onChange={(event) => {
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
                        <Grid item align="center" xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="outlined"
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <br />
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                WordWall {new Date().getFullYear()}
                {'.'}
            </Typography>
        </ThemeProvider>
    );
}
