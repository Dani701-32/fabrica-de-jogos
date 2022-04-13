import React, { useEffect } from 'react';
import { Grid, Button, Card, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBaseState } from '../../reducers/userReducer';

export default function HomePage({}) {
    const navigate = useNavigate();
    const game_types = [
        { slug: 'anagram', name: 'Anagrama' },
        { slug: 'matchup', name: 'Combinação' },
        // { slug: 'memorygame', name: 'Jogo da Memória' },
        { slug: 'quiz', name: 'Quiz' },
        { slug: 'trueorfalse', name: 'Verdadeiro ou Falso' },
        { slug: 'wordsearch', name: 'Caça Palavras' }
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            dispatch(setBaseState());
        }, 500);
    }, []);
    return (
        <>
            <Grid
                container
                alignItems="flex-start"
                justifyContent="center"
                spacing={3}
                sx={{ marginTop: 3 }}
            >
                {game_types.map((type, index) => {
                    return (
                        <Grid key={index} item xs={6} md={4} lg={4}>
                            <Grid container alignItems="center" spacing={2}>
                                {/* @ts-ignore */}
                                <Grid item align="center" xs={12}>
                                    <IconButton
                                        disableRipple={true}
                                        onClick={() =>
                                            navigate(`/create/${type.slug}`)
                                        }
                                    >
                                        <Card
                                            elevation={5}
                                            sx={{
                                                width: 310,
                                                height: 200,
                                                borderRadius: 4.5
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
                                {/* @ts-ignore */}
                                <Grid
                                    item
                                    align="center"
                                    xs={12}
                                    alignItems="center"
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
        </>
    );
}
