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
        size: 2
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
        questions: [{ title: EditorState.createEmpty(), right: false }]
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
        case 'UPDATE_ANAGRAM':
            return { ...state, anagram: action.payload };
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
        case 'UPDATE_MEMORYGAME':
            return {
                ...state,
                memorygame: {
                    name: action.payload.name,
                    slug: action.payload.slug,
                    layout: action.payload.layout,
                    images: getImageBlobs(action.payload.images),
                    size: action.payload.size
                }
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
