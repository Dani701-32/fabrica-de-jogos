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
        series: { [key: string]: string };
        disciplinas: { [key: string]: string };
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

// Base game obj
export type gameState<T> = {
    name: string;
    slug?: string;
    layout: number;
    options: T;
    approved_at?: string;
};

// Memory-Game
export type memoryGameOptions = Blob[] | string[] | null[];

// Quiz
export interface quizQuestion {
    title: EditorState | string;
    answers: string[];
}
export type quizOptions = quizQuestion[];

// True-or-False
export interface trueOrFalseQuestion {
    title: EditorState | string;
    answer: boolean;
}
export type trueOrFalseOptions = trueOrFalseQuestion[];

// Word-Search
export type wordObj = {
    word: string;
    tip: EditorState | string;
};
export type wordSearchOptions = wordObj[];

// Group-Sort
export type groupObj = {
    title: string;
    items: string[];
};
export type groupSortOptions = groupObj[];

// Anagram
export type anagramOptions = string[][] | string[];

// Match-Up
export type matchUpObj = {
    word: string;
    meaning: EditorState | string;
};
export type matchUpPage = matchUpObj[];
export type matchUpOptions = matchUpPage[];

// Balloons
export type balloonOptions = {
    title: string | EditorState;
    answers: string[][];
};

// Cryptogram
export type cryptogramObj = {
    word: string;
    tip: string | EditorState;
};
export type cryptogramOptions = cryptogramObj[];
