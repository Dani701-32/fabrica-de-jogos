import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    gameState,
    anagramOptions,
    groupSortOptions,
    matchUpOptions,
    memoryGameOptions,
    quizOptions,
    trueOrFalseOptions,
    wordSearchOptions,
    balloonOptions,
    cryptogramOptions
} from '../types';
import { RootState } from '../store';

type updateMemoryGameInput = {
    slug?: string;
    data: FormData;
};

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.fabricadejogos.portaleducacional.tec.br/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Anagram
        getAnagramBySlug: builder.query<gameState<anagramOptions>, string>({
            query: (slug) => `/anagram/${slug}`
        }),
        createAnagram: builder.mutation<
            gameState<anagramOptions>,
            Partial<gameState<anagramOptions>>
        >({
            query: (body: gameState<anagramOptions>) => ({
                url: '/anagram',
                method: 'POST',
                body: body
            })
        }),
        updateAnagram: builder.mutation<
            gameState<anagramOptions>,
            Partial<
                gameState<anagramOptions> &
                    Pick<gameState<anagramOptions>, 'slug'>
            >
        >({
            query: ({ slug, ...body }) => ({
                url: `/anagram/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Matchup
        getMatchUpBySlug: builder.query<gameState<matchUpOptions>, string>({
            query: (slug) => `/match-up/${slug}`
        }),
        createMatchUp: builder.mutation<
            gameState<matchUpOptions>,
            Partial<gameState<matchUpOptions>>
        >({
            query: (body: gameState<matchUpOptions>) => ({
                url: '/match-up',
                method: 'POST',
                body: body
            })
        }),
        updateMatchUp: builder.mutation<
            gameState<matchUpOptions>,
            Partial<gameState<matchUpOptions>> &
                Pick<gameState<matchUpOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/match-up/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Quiz
        getQuizBySlug: builder.query<gameState<quizOptions>, string>({
            query: (slug) => `/quiz/${slug}`
        }),
        createQuiz: builder.mutation<
            gameState<quizOptions>,
            Partial<gameState<quizOptions>>
        >({
            query: (body: gameState<quizOptions>) => ({
                url: '/quiz',
                method: 'POST',
                body: body
            })
        }),
        updateQuiz: builder.mutation<
            gameState<quizOptions>,
            Partial<gameState<quizOptions>> &
                Pick<gameState<quizOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/quiz/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // True or false
        getTrueOrFalseBySlug: builder.query<
            gameState<trueOrFalseOptions>,
            string
        >({
            query: (slug) => `/true-or-false/${slug}`
        }),
        createTrueOrFalse: builder.mutation<
            gameState<trueOrFalseOptions>,
            Partial<gameState<trueOrFalseOptions>>
        >({
            query: (body: gameState<trueOrFalseOptions>) => ({
                url: '/true-or-false',
                method: 'POST',
                body: body
            })
        }),
        updateTrueOrFalse: builder.mutation<
            gameState<trueOrFalseOptions>,
            Partial<gameState<trueOrFalseOptions>> &
                Pick<gameState<trueOrFalseOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/true-or-false/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Word-Search
        getWordSearchBySlug: builder.query<
            gameState<wordSearchOptions>,
            string
        >({
            query: (slug) => `/word-search/${slug}`
        }),
        createWordSearch: builder.mutation<
            gameState<wordSearchOptions>,
            Partial<gameState<wordSearchOptions>>
        >({
            query: (body: gameState<wordSearchOptions>) => ({
                url: '/word-search',
                method: 'POST',
                body: body
            })
        }),
        updateWordSearch: builder.mutation<
            gameState<wordSearchOptions>,
            Partial<gameState<wordSearchOptions>> &
                Pick<gameState<wordSearchOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/word-search/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Memory-Game
        getMemoryGameBySlug: builder.query<
            gameState<memoryGameOptions>,
            string
        >({
            query: (slug) => `/memory-game/${slug}`
        }),
        createMemoryGame: builder.mutation<
            gameState<memoryGameOptions>,
            FormData
        >({
            query: (body: FormData) => ({
                url: '/memory-game',
                method: 'POST',
                body: body
            })
        }),
        updateMemoryGame: builder.mutation<
            gameState<memoryGameOptions>,
            updateMemoryGameInput
        >({
            query: ({ slug, data }) => ({
                url: `memory-game/${slug}`,
                method: 'PUT',
                body: data
            })
        }),
        // Group Sort
        getGroupSortBySlug: builder.query<gameState<groupSortOptions>, string>({
            query: (slug) => `group-sort/${slug}`
        }),
        createGroupSort: builder.mutation<
            gameState<groupSortOptions>,
            Partial<gameState<groupSortOptions>>
        >({
            query: (body: gameState<groupSortOptions>) => ({
                url: '/group-sort',
                method: 'POST',
                body: body
            })
        }),
        updateGroupSort: builder.mutation<
            gameState<groupSortOptions>,
            Partial<gameState<groupSortOptions>> &
                Pick<gameState<groupSortOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `group-sort/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Balloons
        getBalloonsBySlug: builder.query<gameState<balloonOptions>, string>({
            query: (slug) => `bloons/${slug}`
        }),
        createBalloons: builder.mutation<
            gameState<balloonOptions>,
            Partial<gameState<balloonOptions>>
        >({
            query: (body: gameState<balloonOptions>) => ({
                url: '/bloons',
                method: 'POST',
                body: body
            })
        }),
        updateBalloons: builder.mutation<
            gameState<balloonOptions>,
            Partial<balloonOptions> & Pick<gameState<balloonOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `bloons/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        // Cryptogram
        getCryptogramBySlug: builder.query<
            gameState<cryptogramOptions>,
            string
        >({
            query: (slug) => `cryptogram/${slug}`
        }),
        createCryptogram: builder.mutation<
            gameState<cryptogramOptions>,
            Partial<gameState<cryptogramOptions>>
        >({
            query: (body: gameState<cryptogramOptions>) => ({
                url: '/cryptogram',
                method: 'POST',
                body: body
            })
        }),
        updateCryptogram: builder.mutation<
            gameState<cryptogramOptions>,
            Partial<gameState<cryptogramOptions>> &
                Pick<gameState<cryptogramOptions>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `cryptogram/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getDragNDropBySlug: builder.query<gameState<number[]>, string>({
            query: (slug) => `drag-drop/${slug}`
        }),
        createDragNDrop: builder.mutation<
            gameState<number[]>,
            Partial<gameState<number[]>>
        >({
            query: (body: gameState<number[]>) => ({
                url: 'drag-drop',
                method: 'POST',
                body: body
            })
        }),
        updateDragNDrop: builder.mutation<
            gameState<number>,
            Partial<gameState<number[]>> & Pick<gameState<number[]>, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `drag-drop/${slug}`,
                method: 'PUT',
                body: body
            })
        })
    })
});

export const {
    useGetAnagramBySlugQuery,
    useCreateAnagramMutation,
    useUpdateAnagramMutation,
    useGetMatchUpBySlugQuery,
    useCreateMatchUpMutation,
    useUpdateMatchUpMutation,
    useGetMemoryGameBySlugQuery,
    useCreateMemoryGameMutation,
    useUpdateMemoryGameMutation,
    useGetQuizBySlugQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useGetTrueOrFalseBySlugQuery,
    useCreateTrueOrFalseMutation,
    useUpdateTrueOrFalseMutation,
    useGetWordSearchBySlugQuery,
    useCreateWordSearchMutation,
    useUpdateWordSearchMutation,
    useGetGroupSortBySlugQuery,
    useCreateGroupSortMutation,
    useUpdateGroupSortMutation,
    useGetBalloonsBySlugQuery,
    useCreateBalloonsMutation,
    useUpdateBalloonsMutation,
    useGetCryptogramBySlugQuery,
    useCreateCryptogramMutation,
    useUpdateCryptogramMutation,
    useGetDragNDropBySlugQuery,
    useCreateDragNDropMutation,
    useUpdateDragNDropMutation
} = gameApi;

export default gameApi;
