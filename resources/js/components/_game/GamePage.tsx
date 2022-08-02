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
            gameAddress = 'https://fabrica-de-jogos-quiz.netlify.app';
            break;
        case 'word-search':
            gameAddress = 'https://fabrica-de-jogos-caca-palavras.netlify.app';
            break;
        case 'anagram':
            gameAddress = 'https://fabrica-de-jogos-anagrama.netlify.app';
            break;
        case 'true-or-false':
            gameAddress = 'https://fabrica-de-jogos-verdadeiro-ou-falso.netlify.app';
            break;
        case 'match-up':
            gameAddress = 'https://fabrica-de-jogos-significado-das-palavras.netlify.app';
            break;
        case 'memory-game':
            gameAddress = 'https://fabrica-de-jogos-jogo-da-memoria.netlify.app';
            break;
        case 'group-sort':
            gameAddress = 'https://fabrica-de-jogos-relacionar-grupos.netlify.app';
            break;
        case 'bloons':
            gameAddress = 'https://fabrica-de-jogos-baloes.netlify.app';
            break;
        case 'cryptogram':
            gameAddress = 'https://fabrica-de-jogos-criptograma.netlify.app';
            break;
        case 'drag-drop':
            gameAddress = 'https://fabrica-de-jogos-arraste-e-solte.netlify.app';
            break;
        case 'puzzle':
            gameAddress = 'https://fabrica-de-jogos-quebra-cabeca.netlify.app';
            break;
        case 'paint':
            gameAddress = 'https://fabrica-de-jogos-atelie-criativo.netlify.app';
            break;
        case 'wordle':
            gameAddress = 'https://fabrica-de-jogos-organize-as-letras.netlify.app';
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
