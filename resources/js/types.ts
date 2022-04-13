import { EditorState } from 'draft-js';

export type gameObj = {
    name: string;
    slug: string;
    material: string;
    disciplina_id: number;
    series: string[];
};

export type userInfoData = {
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

export type userState = {
    token: string | null;
    origin: string | null;
};

export type options<T> = {
    body: T;
    discipline_id?: number;
    serie_id?: number;
};

export type anagramState = {
    name: string;
    slug?: string;
    layout: number;
    words: string[][] | string[];
    content_id: number;
    approved_at?: string;
};

export type matchUpObj = {
    word: string;
    meaning: EditorState | string;
};

export type matchUpPage = matchUpObj[];

export type matchUpState = {
    name: string;
    slug?: string;
    layout: number;
    pages: matchUpPage[];
    approved_at: string;
    content_id: number;
};

export type memoryGameState = {
    name: string;
    slug?: string;
    layout: number;
    images: Blob[] | string[] | null[];
    grid: number[];
    approved_at: string;
    content_id: number;
};

export interface quizQuestion {
    title: EditorState | string;
    answers: string[];
}

export type quizState = {
    name: string;
    slug?: string;
    layout: number;
    questions: quizQuestion[];
    approved_at: string;
    content_id: number;
};

export interface trueOrFalseQuestion {
    title: EditorState | string;
    answer: boolean;
}

export type trueOrFalseState = {
    name: string;
    slug?: string;
    layout: number;
    questions: trueOrFalseQuestion[];
    approved_at: string;
    content_id: number;
};

export type wordObj = {
    word: string;
    tip: EditorState | string;
};

export type wordSearchState = {
    name: string;
    slug?: string;
    layout: number;
    words: wordObj[];
    approved_at: string;
    content_id: number;
};
