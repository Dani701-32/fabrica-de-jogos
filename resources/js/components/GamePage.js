import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GamePage(props) {
    const { game } = props;
    let game_address = 'https://fabricadejogos.portaleducacional.tec.br';
    const { slug } = useParams();
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            let data = event.data;
            if (data.loaded) {
                let iframe = document.getElementById('frame');
                const message = JSON.stringify({
                    user_token: data.token,
                    api_address: data.api_address,
                    game_address: game_address,
                    slug: slug
                });
                iframe.contentWindow.postMessage(message, '*');
                return;
            }
            const api_address = data.api_address;
            const token = data.user_token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios
                .get(`${api_address}/api/validate`, config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('okay');
                    }
                });
        }
    });
    let gameAddress = '';
    switch (game) {
        case 'quiz':
            gameAddress = 'https://condescending-leakey-1e8efc.netlify.app/';
            break;
        case 'wordSearch':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Caça-Palavras/index.html';
            break;
        case 'anagram':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Anagrama%20Certo/index.html';
            break;
        case 'trueOrFalse':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Verdadeiro%20ou%20Falso%20Certo/index.html';
            break;
        case 'matchUp':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Significados%20das%20Palavras%20Certo/index.html';
            break;
        case 'memoryGame':
            gameAddress = 'http://localhost:8080/memorygame/';
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
