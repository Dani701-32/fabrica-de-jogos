import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createGameEventListener } from '../store/actions';

export default function GamePage({ game }) {
    const { slug } = useParams();
    useEffect(() => {
        createGameEventListener(slug);
    });
    let gameAddress = '';
    switch (game) {
        case 'quiz':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Quiz%20%281%29/index.html';
            break;
        case 'wordSearch':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Caca-Palavras%20%281%29/index.html';
            break;
        case 'anagram':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Anagrama%20%281%29/index.html';
            break;
        case 'trueOrFalse':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/VerdadeiroOuFalso%20%282%29/index.html';
            break;
        case 'matchUp':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/SignificadosDasPalavras%20%281%29/index.html';
            break;
        case 'memoryGame':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/JogoDaMemória%20%281%29/index.html';
            break;
    }
    return (
        <div>
            <iframe
                id="frame"
                src={gameAddress}
                height="100%"
                width="100%"
                frameBorder="0"
                allowFullScreen
                style={{
                    position: 'fixed',
                    top: '0px',
                    bottom: '0px',
                    right: '0px',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 999999
                }}
            />
        </div>
    );
}
