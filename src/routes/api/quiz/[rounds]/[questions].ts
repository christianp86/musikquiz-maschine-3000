import type { EndpointOutput, Request } from '@sveltejs/kit';
import type { Round, MusikquizResult, Question } from '$util/quiz_interfaces'

import questions from './data/questions.json'

/**
 * Generates a random integer between min and max (inclusive)
 * @param  {number} min
 * @param  {number} max
 * @returns randomly generated integer
 */
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Converts the import json into an array
 * @returns {Question[]} Array of music quiz questions
 */
function getQuestions(): Question[] {
    const questionPool: Question[] = []

    for (const question of questions) {
        questionPool.push(question)
    }

    return questionPool
}

/**
 * Creates the quiz data
 * @param {number} rounds | Number of quiz rounds
 * @param {number} questions | Number of questions per round
 * @returns Promise<MusikquizResult> | Created music quiz
 */
async function createQuizData(rounds: number, questions: number): Promise<MusikquizResult> {

    const questionPool = getQuestions();
    const musikQuizResult: MusikquizResult = { rounds: [] };

    for (let index = 1; index <= rounds; index++) {
        const mqRound: Round = { roundNumber: index, questions: [] };
        for (let index = 0; index < questions; index++) {
            mqRound.questions.push(questionPool[randomInt(0, 30)])
        }
        musikQuizResult.rounds.push(mqRound);
    }

    return musikQuizResult;
}

/**
 * 
 */
export async function get({ params }: Request ): Promise<EndpointOutput> {
    console.log(params)
    const musicQuiz = await createQuizData(parseInt(params.rounds), parseInt(params.questions))
    return {
        status: 200,
        body: musicQuiz
    };
}