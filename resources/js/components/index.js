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
                <Route exact path="/quiz/:slug" element={<GamePage />} />
                <Route exact path="/anagram/:slug" element={<GamePage />} />
                <Route exact path="/wordsearch/:slug" element={<GamePage />} />
                <Route exact path="/trueorfalse/:slug" element={<GamePage />} />
                <Route exact path="/memorygame/:slug" element={<GamePage />} />
                <Route exact path="/create/quiz" element={<CreateQuiz />} />
                <Route
                    exact
                    path="/create/anagram"
                    element={<CreateAnagram />}
                />
                <Route
                    exact
                    path="/create/wordsearch"
                    element={<CreateWordSearch />}
                />
                <Route
                    exact
                    path="/create/trueorfalse"
                    element={<CreateTrueOrFalse />}
                />
                <Route
                    exact
                    path="/create/matchup"
                    element={<CreateMatchUp />}
                />
                <Route
                    exact
                    path="/create/memorygame"
                    element={<CreateMemoryGame />}
                />
            </Routes>
        </Router>
    );
}
export default App;
