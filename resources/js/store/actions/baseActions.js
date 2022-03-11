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
