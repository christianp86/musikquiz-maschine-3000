import type { MusikquizResult } from '$util/quiz_interfaces'
import { convertJSONtoCSV, convertToCSV } from '../lib/utils/MusicQuiz'

const TESTDATA: MusikquizResult = {
    rounds: [
        {
            roundNumber: 1,
            questions: [
                {
                    id: 7,
                    question: "Lebt der Frontmann/die Frontfrau noch?"
                },
                {
                    id: 4,
                    question: "In welchem Jahr erschien das Album?"
                },
                {
                    id: 9,
                    question: "Wie heißt der Frontmann/die Frontfrau der Band?"
                },
                {
                    id: 15,
                    question: "Nenne die ersten fünf gesungenen Wörter des Liedes."
                },
                {
                    id: 15,
                    question: "Nenne die ersten fünf gesungenen Wörter des Liedes."
                }
            ]
        },
        {
            roundNumber: 2,
            questions: [
                {
                    id: 22,
                    question: "Was ist das letzte gesungene Wort des Lieds?"
                },
                {
                    id: 8,
                    question: "Aus welcher Stadt kommt der Interpret?"
                },
                {
                    id: 20,
                    question: "Was passierte Weltbewegendes in dem Jahr als dieses Lied veröffentlicht wurde?"
                },
                {
                    id: 15,
                    question: "Nenne die ersten fünf gesungenen Wörter des Liedes."
                },
                {
                    id: 17,
                    question: "Wie heißt der Songtitel und das dazugehörige Album?"
                }
            ]
        },
        {
            roundNumber: 3,
            questions: [
                {
                    id: 18,
                    question: "Aus welchem Jahr ist das Lied?"
                },
                {
                    id: 8,
                    question: "Aus welcher Stadt kommt der Interpret?"
                },
                {
                    id: 14,
                    question: "Was ist auf dem Cover des Albums zu sehen?"
                },
                {
                    id: 29,
                    question: "Wie heißt der Interpret rückwärts ausgesprochen?"
                },
                {
                    id: 7,
                    question: "Lebt der Frontmann/die Frontfrau noch?"
                }
            ]
        },
        {
            roundNumber: 4,
            questions: [
                {
                    id: 1,
                    question: "Nenne den Interpreten."
                },
                {
                    id: 14,
                    question: "Was ist auf dem Cover des Albums zu sehen?"
                },
                {
                    id: 8,
                    question: "Aus welcher Stadt kommt der Interpret?"
                },
                {
                    id: 10,
                    question: "Wie heißt das Debütalbum des Interpreten?"
                },
                {
                    id: 6,
                    question: "Wie heißt der Interpret und wann kam das erste Album des Interpreten raus?"
                }
            ]
        }

    ]
}

describe('MusicQuiz Converter Test', () => {
/*     test('Convert MusicQuiz JSON data to CSV', async () => {
        const musciQuizCSV = await convertJSONtoCSV(TESTDATA);
        expect(musciQuizCSV).not.toBe("")
    }), */
    test('Convert Result to CSV', () => {
        const csv = convertToCSV(TESTDATA)
        console.log(csv)
        expect(csv).not.toBe('')
    })
})