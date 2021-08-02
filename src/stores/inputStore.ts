import { writable } from 'svelte/store';

export const numberOfQuestions = writable(1);
export const numberOfRounds = writable(1);