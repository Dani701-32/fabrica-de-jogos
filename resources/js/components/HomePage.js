import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Box,
    CssBaseline,
    Container,
    Grid,
    TextField,
    Button,
    Typography,
    Card,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function HomePage({}) {
    const navigate = useNavigate();
    const game_types = [
        { slug: 'anagram', name: 'Anagrama' },
        { slug: 'matchup', name: 'Combinação' },
        { slug: 'memorygame', name: 'Jogo da Memória' },
        { slug: 'quiz', name: 'Quiz' },
        { slug: 'trueorfalse', name: 'Verdadeiro ou Falso' },
        { slug: 'wordsearch', name: 'Caça Palavras' }
    ];
    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                sx={{
                    marginTop: 10
                }}
            >
                <CssBaseline />
                <Grid
                    container
                    align="center"
                    alignItems="flex-start"
                    justifyContent="center"
                    spacing={3}
                >
                    {game_types.map((type, index) => {
                        return (
                            <Grid key={index} item xs={6} md={4} lg={4}>
                                <Grid container align="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <IconButton
                                            disableRipple={true}
                                            onClick={() =>
                                                navigate(`/create/${type.slug}`)
                                            }
                                        >
                                            <Card
                                                elevation={5}
                                                sx={{
                                                    width: 350,
                                                    height: 250,
                                                    borderRadius: 5
                                                }}
                                            >
                                                <img
                                                    src={`/storage/games/${type.slug}.png`}
                                                    alt={type.name}
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </Card>
                                        </IconButton>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        align="center"
                                        sx={{
                                            marginTop: 2
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                navigate(`/create/${type.slug}`)
                                            }
                                            variant="outlined"
                                        >
                                            {type.name}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
