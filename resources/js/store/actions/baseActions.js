export const setOpen = () => (dispatch) => {
    dispatch({
        type: 'OPEN'
    });
};

export const setClose = () => (dispatch) => {
    dispatch({
        type: 'CLOSE'
    });
};

export const setAlert = (message) => (dispatch) => {
    dispatch({
        type: 'SET_ALERT',
        payload: message
    });
};

export const setProgress = (value) => (dispatch) => {
    dispatch({
        type: 'SET_PROGRESS',
        payload: value
    });
};

export const refreshBaseState = () => (dispatch) => {
    dispatch({
        type: 'REFRESH_BASE_STATE'
    });
};

export const createGameEventListener =
    (slug = '') =>
    (dispatch, getState) => {
        console.log('criou listener do jogo');
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) {
                const data = event.data;
                console.log(data);
                if (data.loaded) {
                    const user_info = getState();
                    let game_address =
                        'https://fabricadejogos.portaleducacional.tec.br';
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    let iframe = document.getElementById('frame');
                    const message = JSON.stringify({
                        user_token: user_info.token,
                        api_address: user_info.api_address,
                        game_address: game_address,
                        slug: slug,
                        aula_id: urlParams.has('aula_id')
                            ? urlParams.get('aula_id')
                            : 0,
                        conteudo_id: urlParams.has('conteudo_id')
                            ? urlParams.get('conteudo_id')
                            : 0
                    });
                    iframe.contentWindow.postMessage(message, '*');
                }
            }
        });
    };
