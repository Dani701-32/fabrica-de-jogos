import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './pages/_game/GamePage';
import CreateQuiz from './pages/quiz/Create';
import EditQuiz from './pages/quiz/Edit';
import CreateAnagram from './pages/anagram/Create';
import EditAnagram from './pages/anagram/Edit';
import CreateWordSearch from './pages/wordsearch/Create';
import EditWordSearch from './pages/wordsearch/Edit';
import CreateTrueOrFalse from './pages/trueorfalse/Create';
import EditTrueOrFalse from './pages/trueorfalse/Edit';
import CreateMatchUp from './pages/matchup/Create';
import EditMatchUp from './pages/matchup/Edit';
import CreateMemorygame from './pages/memorygame/Create';
import EditMemorygame from './pages/memorygame/Edit';
import HomePage from './pages/_home/HomePage';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Container component="main">
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
                        <Route
                            path="/create/memorygame"
                            element={<CreateMemorygame />}
                        />
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
                        <Route
                            path="/edit/memorygame/:slug"
                            element={<EditMemorygame />}
                        />
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
