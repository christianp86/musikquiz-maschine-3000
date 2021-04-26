import { Round, MusikquizResult, Question } from './quiz_interfaces'

// @ts-ignore
//import * as Questions from './data/questions.json'
// @ts-ignore
//import * as Genres from './data/genre.json'

/* const genres: Genre[] = Genres;

const musikQuiz: Musikquiz = {
    genres: [],
    questions: [],
    players: 0,
    rounds: 0
} */

window.addEventListener('DOMContentLoaded', () => {
    createQuiz(3,5)
    .then((data) => {
        console.table(data)
    })
    .catch((error) => {console.error(error)})
});
/* window.addEventListener('DOMContentLoaded', () => {
     const section = document.querySelector("#genres") as HTMLElement
    const template = document.getElementById("buttonTemplate") as HTMLTemplateElement

    genres.forEach(genre => {
        const clone = template.content.cloneNode(true) as HTMLElement
        const button = clone.querySelector("#button") as HTMLButtonElement
        button.id = genre.id.toString()
        button.innerHTML = genre.genre.toString()
        section.append(clone)
    })
});
console.table(musikQuiz.genres) */


/**
 * Generates a random integer between min and max (inclusive)
 * @param  {number} min
 * @param  {number} max
 * @returns randomly generated integer
 */
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

async function getQuestions(): Promise<Question[]> {
    let questionPool: Question[] = [];
    try {
        const data = await fetch("./data/questions.json");
        questionPool = await data.json();
    } catch (error) {
        console.log(error)
    }

    return questionPool;
}

async function createQuiz(rounds: Number, questions: Number): Promise<MusikquizResult> {

    const questionPool = await getQuestions();
    let musikQuizResult: MusikquizResult = {rounds: []};

    for (let index = 0; index < rounds; index++) {
        const mqRound: Round = {roundNumber: index, questions: []};
        for (let index = 0; index < questions; index++) {
            mqRound.questions.push(questionPool[randomInt(0,18)])
        }
        musikQuizResult.rounds.push(mqRound);
    }

    return musikQuizResult;
}



