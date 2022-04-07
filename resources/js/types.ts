import { EditorState } from 'draft-js';

export type gameObj = {
    name: string;
    slug: string;
    material: string;
    thumbnail: string;
    disciplina_id: number;
    series: number;
};

export type userState = {
    name: string;
    role: string;
    pfp: string;
    prefeitura_nome: string;
    prefeitura_logo: string;
    token: string | null;
    api_address: string | null;
    origin: string | null;
    series: object;
    disciplinas: object;
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
};

export type memoryGameState = {
    name: string;
    slug?: string;
    layout: number;
    images: Blob[] | string[] | null[];
    grid: number[];
    approved_at: string;
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
};
