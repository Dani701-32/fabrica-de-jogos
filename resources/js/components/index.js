import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GamePage from './GamePage';
import QuizPage from './QuizPage';
import AnagramPage from './AnagramPage';
import WordSearchPage from './WordSearchPage';
import TrueOrFalsePage from './TrueOrFalsePage';
import MatchUpPage from './MatchUpPage';
import MemoryGamePage from './MemoryGamePage';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
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
                    element={<AnagramPage mode="CREATE" />}
                />
                <Route
                    path="/create/matchup"
                    element={<MatchUpPage mode="CREATE" />}
                />
                <Route
                    path="/create/memorygame"
                    element={<MemoryGamePage mode="CREATE" />}
                />
                <Route
                    path="/create/quiz"
                    element={<QuizPage mode="CREATE" />}
                />
                <Route
                    path="/create/trueorfalse"
                    element={<TrueOrFalsePage mode="CREATE" />}
                />
                <Route
                    path="/create/wordsearch"
                    element={<WordSearchPage mode="CREATE" />}
                />
                {/* Edit Routes */}
                <Route
                    path="/edit/anagram/:slug"
                    element={<AnagramPage mode="EDIT" />}
                />
                <Route
                    path="/edit/matchup/:slug"
                    element={<MatchUpPage mode="EDIT" />}
                />
                <Route
                    path="/edit/memorygame/:slug"
                    element={<MemoryGamePage mode="EDIT" />}
                />
                <Route
                    path="/edit/quiz/:slug"
                    element={<QuizPage mode="EDIT" />}
                />
                <Route
                    path="/edit/trueorfalse/:slug"
                    element={<TrueOrFalsePage mode="EDIT" />}
                />
                <Route
                    path="/edit/wordsearch/:slug"
                    element={<WordSearchPage mode="EDIT" />}
                />
            </Routes>
        </Router>
    );
}
export default App;
