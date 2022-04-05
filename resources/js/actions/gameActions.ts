import axios from 'axios';
import { Dispatch } from 'redux';

export const createGame =
    (
        obj: object,
        type: string,
        serie_id: number,
        discipline_id: number,
        content_type: string = 'application/json'
    ) =>
    (dispatch: Dispatch, getState: Function) => {
        const user_info = getState().base;
        const config = {
            headers: {
                'Content-Type': content_type,
                Authorization: `Bearer ${user_info.token}`
            },
            onUploadProgress: (event: any) => {
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
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user_info.token}`
                        }
                    };
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
                                dispatch({
                                    type: 'SET_PROGRESS',
                                    payload: 0
                                });
                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: 'SET_ALERT',
                                payload: `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
                            });
                            dispatch({
                                type: 'SET_PROGRESS',
                                payload: 0
                            });
                        });
                }
            })
            .catch((error) => {
                dispatch({
                    type: 'SET_ALERT',
                    payload: `Ocorreu um erro ${error.response.status} ao tentar criar o jogo!`
                });
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: 0
                });
            });
    };

export const getGame = (type: string, slug: string) => (dispatch: Dispatch) => {
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
    (
        obj: object,
        type: string,
        slug: string,
        content_type: string = 'application/json'
    ) =>
    (dispatch: Dispatch, getState: Function) => {
        const user_info = getState().base;
        const config = {
            headers: {
                'Content-Type': content_type,
                Authorization: `Bearer ${user_info.token}`
            },
            onUploadProgress: (event: any) => {
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: Math.round((event.loaded * 100) / event.total)
                });
            }
        };
        if (content_type === 'multipart/form-data') {
            axios
                .post(`/api/${type}/${slug}?_method=PUT`, obj, config)
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
                    dispatch({
                        type: 'SET_PROGRESS',
                        payload: 0
                    });
                });
            return;
        }
        const body = JSON.stringify(obj);
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
                dispatch({
                    type: 'SET_PROGRESS',
                    payload: 0
                });
            });
    };
