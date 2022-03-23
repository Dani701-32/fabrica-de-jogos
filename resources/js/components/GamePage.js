import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/actionCreators';
import { useDispatch } from 'react-redux';

export default function GamePage({ game }) {
    const { slug } = useParams();
    const [open, setOpen] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dispatch = useDispatch();
    const { refreshBaseState, createGameEventListener } = bindActionCreators(
        actionCreators,
        dispatch
    );
    useEffect(() => {
        refreshBaseState();
        setTimeout(() => {
            createGameEventListener(slug, urlParams);
            setOpen(true);
        }, 1000);
    }, [localStorage.getItem('token')]);
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
            {open && (
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
            )}
        </div>
    );
}
