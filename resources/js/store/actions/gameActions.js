import axios from 'axios';

export const createGame =
    (obj, type, serie_id, discipline_id, content_type = 'application/json') =>
    (dispatch, getState) => {
        const user_info = getState().base;
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
        const body =
            content_type === 'application/json' ? JSON.stringify(obj) : obj;
        axios
            .post(`/api/${type}`, body, config)
            .then((response) => {
                const data = response.data;
                if (response.status === 201) {
                    const body = JSON.stringify({
                        name: data.name,
                        slug: `/${type}/${response.data.slug}`,
                        material: `https://www.fabricadejogos.portaleducacional.tec.br/${type}/${response.data.slug}`,
                        thumbnail: '',
                        disciplina_id: discipline_id,
                        series: serie_id
                    });
                    axios
                        .post(`${user_info.api_address}`, body, config)
                        .then((response) => {
                            if (response.status === 200) {
                                dispatch({
                                    type: 'CREATE_' + type.toUpperCase(),
                                    payload: data
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
        })
        .catch((error) => {
            dispatch({
                type: 'SET_ALERT',
                payload: error
            });
        });
};

export const editGame =
    (obj, type, slug, content_type = 'application/json') =>
    (dispatch, getState) => {
        const user_info = getState().base;
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
        const body =
            content_type === 'application/json' ? JSON.stringify(obj) : obj;
        axios
            .put(`/api/${type}/${slug}`, body, config)
            .then((response) => {
                dispatch({
                    type: 'UPDATE_' + type.toUpperCase(),
                    payload: response.data
                });
                dispatch({
                    type: 'OPEN'
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'SET_ALERT',
                    payload: `Ocorreu um erro ${error.response.status} ao tentar editar o jogo!`
                });
            });
    };
