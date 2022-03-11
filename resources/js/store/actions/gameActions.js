import axios from 'axios';

export const createGame =
    (obj, type, user_info, content_type = 'application/json') =>
    (dispatch) => {
        const config = {
            headers: {
                'Content-Type': content_type,
                Authorization: `Bearer ${user_info.token}`
            },
            onUploadProgress: (event) => {
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: Math.round((event.loaded * 100) / event.total)
                });
            }
        };
        axios
            .post(`/api/${type}`, obj, config)
            .then((response) => {
                if (response.status === 201) {
                    const body = JSON.stringify({
                        link: `https://www.fabricadejogos.portaleducacional.tec.br/${type}/${response.data.slug}`,
                        type: type
                    });
                    dispatch({
                        type: 'UPDATE_' + type.toUpperCase(),
                        payload: response.data
                    });
                    dispatch({
                        type: 'OPEN'
                    });
                    dispatch({
                        type: 'SET_PROGRESS',
                        payload: 0
                    });
                    axios
                        .post(
                            `${user_info.api_address}/CREATION_ENDPOINT`,
                            body,
                            config
                        )
                        .then((response) => {
                            if (response.status === 201) {
                                dispatch({
                                    type: 'UPDATE_' + type.toUpperCase(),
                                    payload: response.data
                                });
                                dispatch({
                                    type: 'OPEN'
                                });
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: 'SET_ALERT',
                                payload: `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
                            });
                        });
                }
            })
            .catch((error) => {
                dispatch({
                    type: 'SET_ALERT',
                    payload: `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
                });
            });
    };

export const getGame = (type, slug) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios
        .get(`/api/${type}/${slug}`, config)
        .then((response) => {
            dispatch({
                type: 'UPDATE_' + type.toUpperCase(),
                payload: response.data
            });
            dispatch({
                type: 'CLOSE'
            });
            dispatch({
                type: 'SET_PROGRESS',
                payload: 0
            });
        })
        .catch((error) => {
            dispatch({
                type: 'SET_ALERT',
                payload: error
            });
        });
};

export const editGame =
    (obj, type, slug, token, content_type = 'application/json') =>
    (dispatch) => {
        const config = {
            headers: {
                'Content-Type': content_type,
                Authorization: `Bearer ${token}`
            },
            onUploadProgress: (event) => {
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: Math.round((event.loaded * 100) / event.total)
                });
            }
        };
        axios
            .put(`/api/${type}/${slug}`, obj, config)
            .then((response) => {
                dispatch({
                    type: 'UPDATE_' + type.toUpperCase(),
                    payload: response.data
                });
                dispatch({
                    type: 'OPEN'
                });
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: 0
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'SET_ALERT',
                    payload: `Ocorreu um erro ${error.response.status} ao tentar editar o jogo!`
                });
            });
    };
