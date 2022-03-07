import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './GamePage';
import CreateQuiz from './CreateQuiz';
import CreateAnagram from './CreateAnagram';
import CreateWordSearch from './CreateWordSearch';
import CreateTrueOrFalse from './CreateTrueOrFalse';
import CreateMatchUp from './CreateMatchUp';
import CreateMemoryGame from './CreateMemoryGame';

function App() {
    return (
        <Router>
            <Routes>
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
                <Route path="/create/quiz" element={<CreateQuiz />} />
                <Route path="/create/anagram" element={<CreateAnagram />} />
                <Route
                    path="/create/wordsearch"
                    element={<CreateWordSearch />}
                />
                <Route
                    path="/create/trueorfalse"
                    element={<CreateTrueOrFalse />}
                />
                <Route path="/create/matchup" element={<CreateMatchUp />} />
                <Route
                    path="/create/memorygame"
                    element={<CreateMemoryGame />}
                />
            </Routes>
        </Router>
    );
}
export default App;
