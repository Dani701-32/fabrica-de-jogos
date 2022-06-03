import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export function getError(error: unknown) {
    if (isFetchBaseQueryError(error)) {
        // you can access all properties of `FetchBaseQueryError` here
        type messageType = {
            message: string;
        };
        const err = error as FetchBaseQueryError;
        const data = err.data as messageType;
        return `Ocorreu um erro ${err.status}: ${data.message}`;
    } else if (isErrorWithMessage(error)) {
        // you can access a string 'message' property here
        return `Ocorreu um erro: ${error.message}`;
    }
    return 'Ocorreu um erro não identificado!';
}
