import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import Anagram from "./Anagram";
import WordSearch from "./WordSearch";
import CreateQuiz from "./CreateQuiz";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/quiz/:slug" element={<Quiz/>}/>
                <Route exact path="/anagram/:slug" element={<Anagram/>}/>
                <Route exact path="/wordsearch/:slug" element={<WordSearch/>}/>
                <Route exact path="/create/quiz" element={<CreateQuiz/>}/>
            </Routes>
        </Router>
    );
}
export default App;
