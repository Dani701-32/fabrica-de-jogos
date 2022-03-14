import axios from 'axios';

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

export const createEventListener =
    (slug = '') =>
    (dispatch, getState) => {
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
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                };
                axios
                    .get(`${data.api_address}/api/validate`, config)
                    .then((response) => {
                        if (response.status === 200) {
                            dispatch({
                                type: 'VALIDATION_SUCCESS',
                                payload: data
                            });
                        }
                    })
                    .catch((error) => {
                        dispatch({
                            type: 'VALIDATION_ERROR',
                            payload: error
                        });
                    });
            }
        });
    };
