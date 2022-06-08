import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './_game/GamePage';
import CreateQuiz from './quiz/Create';
import EditQuiz from './quiz/Edit';
import CreateAnagram from './anagram/Create';
import EditAnagram from './anagram/Edit';
import CreateWordSearch from './word-search/Create';
import EditWordSearch from './word-search/Edit';
import CreateTrueOrFalse from './true-or-false/Create';
import EditTrueOrFalse from './true-or-false/Edit';
import CreateMatchUp from './match-up/Create';
import EditMatchUp from './match-up/Edit';
import CreateMemorygame from './memory-game/Create';
import EditMemorygame from './memory-game/Edit';
import HomePage from './_home/HomePage';
import { CircularProgress, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './_layout/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserInfoQuery } from '../services/portal';
import { setBaseState } from '../reducers/userReducer';
import CreateGroupSort from './group-sort/Create';
import EditGroupSort from './group-sort/Edit';
import CreateBalloons from './balloons/Create';
import EditBalloons from './balloons/Edit';
import CreateCryptogram from './cryptogram/Create';
import EditCryptogram from './cryptogram/Edit';
import CreateDragNDrop from './drag-drop/Create';
import EditDragNDrop from './drag-drop/Edit';
import CreatePuzzle from './puzzle/Create';
import EditPuzzle from './puzzle/Edit';
import CreatePaint from './paint/Create';
import EditPaint from './paint/Edit';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Copyright from './_layout/Copyright';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    background: 'white',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    background: 'white',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    background: 'white',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    background: 'white',
                },
            },
        },
    },
});

function App() {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const { data, error, isLoading } = useGetUserInfoQuery({ token, origin });
    const dispatch = useDispatch();

    if (error) dispatch(setBaseState());

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem('token') === null) {
                window.location.href = '/401';
            }
            dispatch(setBaseState());
        }, 500);
    }, []);

    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        );

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavBar data={data} />
                <Container maxWidth="xl" component="main">
                    <CssBaseline />
                    <Routes>
                        {/* Home Route */}
                        <Route path="/" element={<HomePage />} />
                        {/* Game Routes */}
                        <Route path="/game/:category/:slug" element={<GamePage />} />
                        {/* Create Routes */}
                        <Route path="/create/anagram" element={<CreateAnagram />} />
                        <Route path="/create/bloons" element={<CreateBalloons />} />
                        <Route path="/create/cryptogram" element={<CreateCryptogram />} />
                        <Route path="/create/drag-drop" element={<CreateDragNDrop />} />
                        <Route path="/create/group-sort" element={<CreateGroupSort />} />
                        <Route path="/create/match-up" element={<CreateMatchUp />} />
                        <Route path="/create/memory-game" element={<CreateMemorygame />} />
                        <Route path="/create/quiz" element={<CreateQuiz />} />
                        <Route path="/create/true-or-false" element={<CreateTrueOrFalse />} />
                        <Route path="/create/word-search" element={<CreateWordSearch />} />
                        <Route path="/create/paint" element={<CreatePaint />} />
                        <Route path="/create/puzzle" element={<CreatePuzzle />} />
                        {/* Edit Routes */}
                        <Route path="/edit/anagram/:slug" element={<EditAnagram />} />
                        <Route path="/edit/bloons/:slug" element={<EditBalloons />} />
                        <Route path="/edit/cryptogram/:slug" element={<EditCryptogram />} />
                        <Route path="/edit/drag-drop/:slug" element={<EditDragNDrop />} />
                        <Route path="/edit/group-sort/:slug" element={<EditGroupSort />} />
                        <Route path="/edit/match-up/:slug" element={<EditMatchUp />} />
                        <Route path="/edit/memory-game/:slug" element={<EditMemorygame />} />
                        <Route path="/edit/quiz/:slug" element={<EditQuiz />} />
                        <Route path="/edit/true-or-false/:slug" element={<EditTrueOrFalse />} />
                        <Route path="/edit/word-search/:slug" element={<EditWordSearch />} />
                        <Route path="/edit/paint/:slug" element={<EditPaint />} />
                        <Route path="/edit/puzzle/:slug" element={<EditPuzzle />} />
                    </Routes>
                </Container>
                <Copyright />
            </Router>
        </ThemeProvider>
    );
}
export default App;
