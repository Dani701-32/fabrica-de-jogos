import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { gameObj, userState } from '../types';
import { RootState } from '../store';

type userInfoData = {
    success: boolean;
    data: {
        series: object[];
        disciplinas: object[];
        name: string;
        role: string;
        pfp: string;
        prefeitura_nome: string;
        prefeitura_logo: string;
    };
};

export const portalApi = createApi({
    reducerPath: 'portalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dev.edutecbrasil.com.br',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createGameObject: builder.mutation<
            gameObj,
            Partial<gameObj & userState>
        >({
            query: ({ origin, token, ...object }) => ({
                url: `${origin}/api/conteudo/create-from-game/`,
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
                    url: `${origin}/api/conteudo/edit-from-game/`,
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
        getUserInfo: builder.query<userInfoData, string>({
            query: (token) => ({
                url: `/api/validate`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })
});

export const {
    useCreateGameObjectMutation,
    useEditGameObjectMutation,
    useGetUserInfoQuery
} = portalApi;

export default portalApi;
