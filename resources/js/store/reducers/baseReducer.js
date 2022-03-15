const initialState = {
    open: false,
    alert: '',
    progress: 0,
    token: localStorage.getItem('token'),
    api_address: localStorage.getItem('api_address'),
    origin: localStorage.getItem('origin'),
    series: JSON.parse(localStorage.getItem('series')),
    disciplinas: JSON.parse(localStorage.getItem('disciplinas'))
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
        case 'VALIDATION_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('api_address', action.payload.api_address);
            return {
                ...state,
                token: action.payload.token,
                api_address: action.payload.api_address
            };
        case 'VALIDATION_ERROR':
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
