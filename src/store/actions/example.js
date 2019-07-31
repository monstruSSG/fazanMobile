import { EXAMPLE } from './actionTypes';

export const executeExample = exampleName => ({
    type: EXAMPLE,
    example: exampleName
});