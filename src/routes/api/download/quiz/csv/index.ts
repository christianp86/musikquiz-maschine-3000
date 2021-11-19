import type { EndpointOutput } from '@sveltejs/kit';
import type { MusikquizResult } from '$util/quiz_interfaces'
import { convertJSONtoCSV } from '$lib/utils/MusicQuiz'

const TESTDATA: MusikquizResult = {
    rounds: [
        {
            roundNumber: 1,
            questions: [
                {
                    id: 1,
                    question: 'Blablabla'
                }
            ]
        }
    ]
}

export async function get(): Promise<EndpointOutput> {
    const musicQuizCSV = await convertJSONtoCSV(TESTDATA);

    return {
        body: musicQuizCSV
    };
}