import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './_game/GamePage';
import CreateQuiz from './quiz/Create';
import EditQuiz from './quiz/Edit';
import CreateAnagram from './anagram/Create';
import EditAnagram from './anagram/Edit';
import CreateWordSearch from './wordsearch/Create';
import EditWordSearch from './wordsearch/Edit';
import CreateTrueOrFalse from './trueorfalse/Create';
import EditTrueOrFalse from './trueorfalse/Edit';
import CreateMatchUp from './matchup/Create';
import EditMatchUp from './matchup/Edit';
//import CreateMemorygame from './memorygame/Create';
//import EditMemorygame from './memorygame/Edit';
import HomePage from './_home/HomePage';
import { CircularProgress, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './_layout/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserInfoQuery } from '../services/portal';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    background: 'white'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    background: 'white'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    background: 'white'
                }
            }
        }
    }
});

function App() {
    const { token, origin } = useSelector((state: RootState) => state.user);
    const { data, isLoading } = useGetUserInfoQuery({ token, origin });
    if (isLoading)
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
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
                        <Route path="/create" element={<HomePage />} />
                        {/* Game Routes */}
                        <Route
                            path="/quiz/:slug"
                            element={<GamePage game={'quiz'} />}
                        />
                        <Route
                            path="/anagram/:slug"
                            element={<GamePage game={'anagram'} />}
                        />
                        <Route
                            path="/wordsearch/:slug"
                            element={<GamePage game={'wordSearch'} />}
                        />
                        <Route
                            path="/trueorfalse/:slug"
                            element={<GamePage game={'trueOrFalse'} />}
                        />
                        <Route
                            path="/memorygame/:slug"
                            element={<GamePage game={'memoryGame'} />}
                        />
                        <Route
                            path="/matchup/:slug"
                            element={<GamePage game={'matchUp'} />}
                        />
                        {/* Create Routes */}
                        <Route
                            path="/create/anagram"
                            element={<CreateAnagram />}
                        />
                        <Route
                            path="/create/matchup"
                            element={<CreateMatchUp />}
                        />
                        {/*<Route
                            path="/create/memorygame"
                            element={<CreateMemorygame />}
                        />*/}
                        <Route path="/create/quiz" element={<CreateQuiz />} />
                        <Route
                            path="/create/trueorfalse"
                            element={<CreateTrueOrFalse />}
                        />
                        <Route
                            path="/create/wordsearch"
                            element={<CreateWordSearch />}
                        />
                        {/* Edit Routes */}
                        <Route
                            path="/edit/anagram/:slug"
                            element={<EditAnagram />}
                        />
                        <Route
                            path="/edit/matchup/:slug"
                            element={<EditMatchUp />}
                        />
                        {/*<Route
                            path="/edit/memorygame/:slug"
                            element={<EditMemorygame />}
                        />*/}
                        <Route path="/edit/quiz/:slug" element={<EditQuiz />} />
                        <Route
                            path="/edit/trueorfalse/:slug"
                            element={<EditTrueOrFalse />}
                        />
                        <Route
                            path="/edit/wordsearch/:slug"
                            element={<EditWordSearch />}
                        />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}
export default App;
