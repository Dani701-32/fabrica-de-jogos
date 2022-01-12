import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './games/Quiz';
import Anagram from './games/Anagram';
import WordSearch from './games/WordSearch';
import CreateQuiz from './CreateQuiz';
import CreateAnagram from './CreateAnagram';
import CreateWordSearch from './CreateWordSearch';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/quiz/:slug" element={<Quiz />} />
                <Route exact path="/anagram/:slug" element={<Anagram />} />
                <Route
                    exact
                    path="/wordsearch/:slug"
                    element={<WordSearch />}
                />
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
            </Routes>
        </Router>
    );
}
export default App;
