import { EditorState } from 'draft-js';
import textToDraft from '../../components/utils/textToDraft';

const initialState = {
    anagram: {
        name: '',
        slug: '',
        layout: 1,
        words: ['', '', '', '']
    },
    matchup: {
        name: '',
        slug: '',
        layout: 1,
        pages: [
            [
                {
                    word: '',
                    meaning: EditorState.createEmpty()
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty()
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty()
                },
                {
                    word: '',
                    meaning: EditorState.createEmpty()
                }
            ]
        ]
    },
    memorygame: {
        name: '',
        slug: '',
        layout: 1,
        images: [null, null],
        grid: [2, 2]
    },
    quiz: {
        name: '',
        slug: '',
        layout: 1,
        questions: [{ title: EditorState.createEmpty(), answers: ['', ''] }]
    },
    trueorfalse: {
        name: '',
        slug: '',
        layout: 1,
        questions: [{ title: EditorState.createEmpty(), answer: false }]
    },
    wordsearch: {
        name: '',
        slug: '',
        layout: 1,
        words: [
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            },
            {
                word: '',
                tip: EditorState.createEmpty()
            }
        ]
    }
};

const formatPages = (raw) => {
    raw.map((page) => {
        page.map((matchup) => {
            if (typeof matchup.meaning !== 'string') {
                return;
            }
            matchup.meaning = textToDraft(matchup.meaning);
        });
    });
    return raw;
};

const formatQuestions = (raw) => {
    raw.map((question) => {
        if (typeof question.title !== 'string') {
            return;
        }
        question.title = textToDraft(question.title);
    });
    return raw;
};

const formatTips = (raw) => {
    raw.map((word) => {
        if (typeof word.tip !== 'string') {
            return;
        }
        word.tip = textToDraft(word.tip);
    });
    return raw;
};

const getImageBlobs = (images) => {
    let blobs = [];
    images.map((image) => {
        fetch(`/storage/${image}`)
            .then((res) => res.blob()) // Gets the response and returns it as a blob
            .then((blob) => {
                blobs.push(blob);
            });
    });
    return blobs;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ANAGRAM':
            return {
                ...state,
                anagram: { ...initialState.anagram, slug: action.payload.slug }
            };
        case 'UPDATE_ANAGRAM':
            return { ...state, anagram: action.payload };
        case 'CREATE_MATCHUP':
            return {
                ...state,
                matchup: { ...initialState.matchup, slug: action.payload.slug }
            };
        case 'UPDATE_MATCHUP':
            return {
                ...state,
                matchup: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    pages: formatPages(action.payload.pages)
                }
            };
        case 'CREATE_MEMORYGAME':
            return {
                ...state,
                memorygame: {
                    ...initialState.memorygame,
                    slug: action.payload.slug
                }
            };
        case 'UPDATE_MEMORYGAME':
            return {
                ...state,
                memorygame: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    images: getImageBlobs(action.payload.images),
                    grid: action.payload.grid
                }
            };
        case 'CREATE_QUIZ':
            return {
                ...state,
                quiz: { ...initialState.quiz, slug: action.payload.slug }
            };
        case 'UPDATE_QUIZ':
            return {
                ...state,
                quiz: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    questions: formatQuestions(action.payload.questions)
                }
            };
        case 'CREATE_TRUEORFALSE':
            return {
                ...state,
                trueorfalse: {
                    ...initialState.trueorfalse,
                    slug: action.payload.slug
                }
            };
        case 'UPDATE_TRUEORFALSE':
            return {
                ...state,
                trueorfalse: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    questions: formatQuestions(action.payload.questions)
                }
            };
        case 'CREATE_WORDSEARCH':
            return {
                ...state,
                wordsearch: {
                    ...initialState.wordsearch,
                    slug: action.payload.slug
                }
            };
        case 'UPDATE_WORDSEARCH':
            return {
                ...state,
                wordsearch: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    words: formatTips(action.payload.words)
                }
            };
        default:
            return state;
    }
};

export default reducer;
