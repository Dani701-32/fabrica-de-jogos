const initialState = {
    open: false,
    alert: '',
    progress: 0,
    token: localStorage.getItem('token'),
    api_address: localStorage.getItem('api_address'),
    origin: localStorage.getItem('origin'),
    series:
        typeof localStorage.getItem('series') === 'object'
            ? JSON.parse(localStorage.getItem('series'))
            : { '': 0 },
    disciplinas:
        typeof localStorage.getItem('disciplinas') === 'object'
            ? JSON.parse(localStorage.getItem('disciplinas'))
            : { '': 0 }
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
        case 'SET_BASE_STATE':
            return initialState;
        default:
            return state;
    }
};

export default reducer;
