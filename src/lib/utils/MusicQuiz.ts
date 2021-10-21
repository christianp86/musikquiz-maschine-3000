import jsonexport from 'jsonexport/dist'
import type { MusikquizResult, Question, Round } from './quiz_interfaces'

/**
 * Converts the music quiz result json to csv
 * @param musicQuiz Result of the musicquiz
 * @returns {string} Music Quiz Rounds as CSV
 */
export async function convertJSONtoCSV(musicQuiz: MusikquizResult): Promise<string> {
    const musicQuizCSV = await jsonexport(musicQuiz.rounds)
        .catch((error) => { throw error })

    console.log(musicQuizCSV)
    return musicQuizCSV
}

export function convertToCSV(musicQuiz: MusikquizResult): string {
    const csvHeader = getHeader(musicQuiz)
    const csvContent = getValuesFromObject(musicQuiz)
    return `${csvHeader}${csvContent}`
}

function getHeader(object: MusikquizResult | Round | Question) {
    let csvHeader = getCSVHeaderFromObject(object); // rounds

    // Get all sub objects
    let values = Object.values(object).filter((entry) => typeof (entry) === 'object' && !Array.isArray(entry));
    for (const value of values) {
        csvHeader += `,${getCSVHeaderFromObject(value)}`;
    }

    // Get all arrays
    values = Object.values(object).filter((entry) => Array.isArray(entry));
    for (const value of values) {
        if (Array.isArray(value))
            csvHeader += `,${getHeader(value[0])}`;
    }

    return `${csvHeader}\n`;
}

function getCSVHeaderFromObject(object: MusikquizResult | Round | Question): string {
    return Object.keys(object).toString()
}

function getValuesFromObject(object: MusikquizResult | Round | Question): string {
    let csv = ''

    for (const value of Object.values(object)) {
        // Regular value
        csv += !Array.isArray(value) && typeof (value) !== 'object' ? `${value},` : ''

        // Object
        csv += !Array.isArray(value) && typeof (value) === 'object' ? getValuesFromObject(value) : ''

        //Array
        csv += Array.isArray(value) ? getValuesFromArray(value) : ''
    }
    return `${csv.slice(0,-1)}\n`
}

function getValuesFromArray(array: Round[] | Question[]): string {
    let csv = ''
    for (const entry of array) {
        // Regular value
        csv += !Array.isArray(entry) && typeof (entry) !== 'object' ? `${entry},` : ''

        // Object
        csv += !Array.isArray(entry) && typeof (entry) === 'object' ? getValuesFromObject(entry) : ''

        //Array
        csv += Array.isArray(entry) ? getValuesFromArray(entry) : ''
    }

    return csv.slice(0,-1)
}