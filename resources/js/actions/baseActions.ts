import { Dispatch } from 'redux';

export const createGameEventListener =
    (slug: string, urlParams: URLSearchParams) =>
    (dispatch: Dispatch, getState: Function) => {
        console.log('criou listener do jogo');
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) {
                const data = event.data;
                if (data.loaded) {
                    const user_info = getState().base;
                    let game_address =
                        'https://fabricadejogos.portaleducacional.tec.br';
                    let iframe: HTMLIFrameElement = document.getElementById(
                        'frame'
                    ) as HTMLIFrameElement;
                    const message = JSON.stringify({
                        user_token: user_info.token,
                        origin: user_info.origin,
                        game_address: game_address,
                        slug: slug,
                        aula_id: urlParams.has('aula_id')
                            ? urlParams.get('aula_id')
                            : 0,
                        conteudo_id: urlParams.has('conteudo_id')
                            ? urlParams.get('conteudo_id')
                            : 0
                    });
                    // @ts-ignore
                    iframe.contentWindow.postMessage(message, '*');
                }
            }
        });
    };
