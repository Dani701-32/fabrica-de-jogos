const initialState = {
    open: false,
    alert: '',
    progress: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, open: true };
        case 'CLOSE':
            return { ...state, open: false };
        case 'SET_ALERT':
            return { ...state, alert: action.payload };
        case 'SET_PROGRESS':
            return { ...state, progress: action.payload };
        default:
            return state;
    }
};

export default reducer;
