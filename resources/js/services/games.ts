import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    anagramState,
    matchUpState,
    // memoryGameState,
    quizState,
    trueOrFalseState,
    wordSearchState
} from '../types';

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.fabricadejogos.portaleducacional.tec.br/api/'
    }),
    endpoints: (builder) => ({
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
            query: (slug) => `/match-up/${slug}`
        }),
        createMatchUp: builder.mutation<matchUpState, Partial<matchUpState>>({
            query: (body: matchUpState) => ({
                url: '/match-up',
                method: 'POST',
                body: body
            })
        }),
        updateMatchUp: builder.mutation<
            matchUpState,
            Partial<matchUpState> & Pick<matchUpState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/match-up/${slug}`,
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
            query: (slug) => `/true-or-false/${slug}`
        }),
        createTrueOrFalse: builder.mutation<
            trueOrFalseState,
            Partial<trueOrFalseState>
        >({
            query: (body: trueOrFalseState) => ({
                url: '/true-or-false',
                method: 'POST',
                body: body
            })
        }),
        updateTrueOrFalse: builder.mutation<
            trueOrFalseState,
            Partial<trueOrFalseState> & Pick<trueOrFalseState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/true-or-false/${slug}`,
                method: 'PUT',
                body: body
            })
        }),
        getWordSearchBySlug: builder.query<wordSearchState, string>({
            query: (slug) => `/word-search/${slug}`
        }),
        createWordSearch: builder.mutation<
            wordSearchState,
            Partial<wordSearchState>
        >({
            query: (body: wordSearchState) => ({
                url: '/word-search',
                method: 'POST',
                body: body
            })
        }),
        updateWordSearch: builder.mutation<
            wordSearchState,
            Partial<wordSearchState> & Pick<wordSearchState, 'slug'>
        >({
            query: ({ slug, ...body }) => ({
                url: `/word-search/${slug}`,
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
