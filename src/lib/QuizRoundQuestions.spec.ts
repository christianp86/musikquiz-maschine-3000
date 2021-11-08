import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/svelte'

import type { Question, Player } from '$lib/utils/quiz_interfaces'

import QuizRoundQuestions from './QuizRoundQuestions.svelte'
import { players } from '../stores/player';


const currentQuestion: Question = {
    id: 1,
    question: 'What is the capital of France?'
}

beforeAll(() => {
    // Setup players store
    const allPlayers: Player[] = [
        {
            name: 'Player 1',
            correctQuestions: []
        },
        {
            name: 'Player 2',
            correctQuestions: []
        }
    ]
    players.set(allPlayers)
})

/**
* @jest-environment jsdom
*/
describe("QuizRoundQuestions Component Tests", () =>
    test('Initial rendering with all elements', () => {
        const { getByText, queryAllByRole } = render(QuizRoundQuestions, { round: 1, questionNumber: 1, question: currentQuestion })

        expect(getByText('Runde 1, Frage 1')).toBeInTheDocument()
        expect(getByText('What is the capital of France?')).toBeInTheDocument()
        expect(queryAllByRole('input')).toHaveLength(2)
    })
)