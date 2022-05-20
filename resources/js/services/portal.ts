import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { gameObj, userState, userInfoData } from '../types';
import { RootState } from '../store';

export const portalApi = createApi({
    reducerPath: 'portalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://portaleducacional.tec.br',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('content-type', 'application/json');
            headers.set('accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createGameObject: builder.mutation<
            gameObj,
            Partial<gameObj & userState>
        >({
            query: ({ origin, token, ...object }) => ({
                url: `${origin}/api/conteudo/create-from-game`,
                method: 'POST',
                body: object,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        editGameObject: builder.mutation<gameObj, Partial<gameObj & userState>>(
            {
                query: ({ origin, token, ...object }) => ({
                    url: `${origin}/api/conteudo/edit-from-game`,
                    method: 'PUT',
                    body: object,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        ),
        getUserInfo: builder.query<userInfoData, Partial<userState>>({
            query: ({ origin }) => ({
                url: `${origin}/api/validate`
            })
        }),
        getGameObjectById: builder.query<gameObj, string>({
            query: (id) => `/api/conteudo/${id}`
        })
    })
});

export const {
    useCreateGameObjectMutation,
    useEditGameObjectMutation,
    useGetUserInfoQuery,
    useGetGameObjectByIdQuery
} = portalApi;

export default portalApi;
