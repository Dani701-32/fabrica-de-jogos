import React from 'react';
import { Grid, Button, Card, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage({}) {
    const navigate = useNavigate();
    const game_types = [
        { slug: 'anagram', name: 'Anagrama' },
        { slug: 'bloons', name: 'Estoura Balões' },
        { slug: 'cryptogram', name: 'Criptograma' },
        { slug: 'drag-drop', name: 'Arraste e Solte' },
        { slug: 'group-sort', name: 'Agrupamentos' },
        { slug: 'match-up', name: 'Combinação' },
        // { slug: 'memory-game', name: 'Jogo da Memória' },
        { slug: 'puzzle', name: 'Quebra-Cabeça' },
        { slug: 'quiz', name: 'Quiz' },
        { slug: 'true-or-false', name: 'Verdadeiro ou Falso' },
        { slug: 'word-search', name: 'Caça-Palavras' },
    ];

    return (
        <>
            <Grid container alignItems="flex-start" justifyContent="center" spacing={1} sx={{ marginTop: 3 }}>
                {game_types.map((type, index) => {
                    return (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <Grid container alignItems="center" spacing={1}>
                                {/* @ts-ignore */}
                                <Grid item align="center" xs={12}>
                                    <IconButton disableRipple={true} onClick={() => navigate(`/create/${type.slug}`)}>
                                        <Card
                                            elevation={5}
                                            sx={{
                                                width: { sm: 250, md: 310 },
                                                height: { sm: 160, md: 200 },
                                                borderRadius: 4.5,
                                            }}
                                        >
                                            <img src={`/storage/games/${type.slug}.png`} alt={type.name} width="100%" height="100%" />
                                        </Card>
                                    </IconButton>
                                </Grid>
                                {/* @ts-ignore */}
                                <Grid
                                    item
                                    align="center"
                                    xs={12}
                                    alignItems="center"
                                    sx={{
                                        marginTop: 2,
                                    }}
                                >
                                    <Button onClick={() => navigate(`/create/${type.slug}`)} variant="outlined">
                                        {type.name}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
