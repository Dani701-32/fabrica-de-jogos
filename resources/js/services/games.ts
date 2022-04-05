import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    gameObj,
    baseState,
    anagramState,
    matchUpState,
    memoryGameState,
    quizState,
    trueOrFalseState,
    wordSearchState
} from '../types';

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://wordwall.test:8080/api/'
    }),
    endpoints: (builder) => ({
        createGameObject: builder.mutation<
            gameObj,
            Partial<gameObj & baseState>
        >({
            query: ({ api_address, token, ...object }) => ({
                url: `${api_address}`,
                method: 'POST',
                body: object,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        getAnagramBySlug: builder.query<anagramState, string>({
            query: (slug) => `/anagram/${slug}`
        }),
        createAnagram: builder.mutation<anagramState, Partial<anagramState>>({
            query: (body: anagramState) => ({
                url: '/anagram',
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
        }),
        updateAnagram: builder.mutation<
            anagramState,
            Partial<anagramState & Pick<anagramState, 'slug'>>
        >({
            query: ({ slug, ...body }) => ({
                url: `/anagram/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getMatchUpBySlug: builder.query<matchUpState, string>({
            query: (slug) => `/matchup/${slug}`
        }),
        createMatchUp: builder.mutation<matchUpState, Partial<matchUpState>>({
            query: (body: matchUpState) => ({
                url: '/matchup',
                method: 'POST',
                body: body
            })
        }),
        updateMatchUp: builder.mutation<
            matchUpState,
            Partial<matchUpState> & Pick<matchUpState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/matchup/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getQuizBySlug: builder.query<quizState, string>({
            query: (slug) => `/quiz/${slug}`
        }),
        createQuiz: builder.mutation<quizState, Partial<quizState>>({
            query: (body: quizState) => ({
                url: '/quiz',
                method: 'POST',
                body: body
            })
        }),
        updateQuiz: builder.mutation<
            quizState,
            Partial<quizState> & Pick<quizState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/quiz/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getTrueOrFalseBySlug: builder.query<trueOrFalseState, string>({
            query: (slug) => `/trueorfalse/${slug}`
        }),
        createTrueOrFalse: builder.mutation<
            trueOrFalseState,
            Partial<trueOrFalseState>
        >({
            query: (body: trueOrFalseState) => ({
                url: '/trueorfalse',
                method: 'POST',
                body: body
            })
        }),
        updateTrueOrFalse: builder.mutation<
            trueOrFalseState,
            Partial<trueOrFalseState> & Pick<trueOrFalseState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/trueorfalse/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getWordSearchBySlug: builder.query<wordSearchState, string>({
            query: (slug) => `/wordsearch/${slug}`
        }),
        createWordSearch: builder.mutation<
            wordSearchState,
            Partial<wordSearchState>
        >({
            query: (body: wordSearchState) => ({
                url: '/wordsearch',
                method: 'POST',
                body: body
            })
        }),
        updateWordSearch: builder.mutation<
            wordSearchState,
            Partial<wordSearchState> & Pick<wordSearchState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/wordsearch/${slug}`,
                method: 'PUT',
                body: body
            })
        })
    })
});

export const {
    useCreateGameObjectMutation,
    useGetAnagramBySlugQuery,
    useCreateAnagramMutation,
    useUpdateAnagramMutation,
    useGetMatchUpBySlugQuery,
    useCreateMatchUpMutation,
    useUpdateMatchUpMutation,
    useGetQuizBySlugQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useGetTrueOrFalseBySlugQuery,
    useCreateTrueOrFalseMutation,
    useUpdateTrueOrFalseMutation,
    useGetWordSearchBySlugQuery,
    useCreateWordSearchMutation,
    useUpdateWordSearchMutation
} = gameApi;

export default gameApi;
