import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBaseState } from '../../reducers/userReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function GamePage() {
    const { slug, category } = useParams();
    const [open, setOpen] = useState(false);
    const { token, origin } = useSelector((state: RootState) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    let gameAddress = '';
    switch (category) {
        case 'quiz':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/QuizFDJ/index.html';
            break;
        case 'word-search':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/WordSearchFDJ/index.html';
            break;
        case 'anagram':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Anagrama%20%281%29/index.html';
            break;
        case 'true-or-false':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/TrueFalseFDJ/index.html';
            break;
        case 'match-up':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/MatchUpFDJ/index.html';
            break;
        case 'memory-game':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/MemoryGameFDJ/index.html';
            break;
        case 'group-sort':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/GroupSortFDJ/index.html';
            break;
        case 'bloons':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/BaloonsFDJ/index.html';
            break;
        case 'cryptogram':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/CryptogramFDJ/index.html';
            break;
        case 'drag-drop':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/DragInDropFDJ/index.html';
            break;
        case 'puzzle':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/PuzzelFDJ/index.html';
            break;
        case 'paint':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/PaintFDJ/index.html';
            break;
        case 'wordle':
            gameAddress = 'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/WordleFDJ/index.html';
            break;
        default:
            window.location.href = '/404';
            break;
    }

    useEffect(() => {
        if (searchParams.has('user_token')) {
            localStorage.setItem('token', searchParams.get('user_token') as string);
            searchParams.delete('user_token');
            setSearchParams(searchParams);
        }
        if (searchParams.has('api_address')) {
            const uri = decodeURI(searchParams.get('api_address') as string).replace('/api/', '');
            localStorage.setItem('origin', uri);
            searchParams.delete('api_address');
            setSearchParams(searchParams);
        }
        dispatch(setBaseState());
        setTimeout(() => {
            window.addEventListener('message', (event) => {
                if (event.origin !== window.location.origin) {
                    const data = event.data;
                    if (data.loaded) {
                        let game_address = 'https://fabricadejogos.portaleducacional.tec.br';
                        let iframe: HTMLIFrameElement = document.getElementById('frame') as HTMLIFrameElement;
                        const message = JSON.stringify({
                            user_token: token,
                            origin: origin,
                            game_address: game_address,
                            slug: slug,
                            aula_id: searchParams.get('aula_id') ?? 0,
                            conteudo_id: searchParams.get('conteudo_id') ?? 0,
                        });
                        // @ts-ignore
                        iframe.contentWindow.postMessage(message, '*');
                    }
                }
            });
            setOpen(true);
        }, 500);
    }, [localStorage.getItem('token')]);
    return (
        <div>
            {open && (
                <iframe
                    id="frame"
                    src={gameAddress}
                    height="100%"
                    width="100%"
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
                        zIndex: 999999,
                    }}
                />
            )}
        </div>
    );
}
