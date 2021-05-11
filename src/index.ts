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

    const generateQuizButton = document.querySelector("#quiztime") as HTMLButtonElement;
    generateQuizButton.addEventListener("click", async () => {
        await renderQuiz()
    });

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
        const data = await fetch("./src/data/questions.json");
        questionPool = await data.json();
    } catch (error) {
        console.log(error)
    }

    return questionPool;
}

async function createQuizData(rounds: Number, questions: Number): Promise<MusikquizResult> {

    const questionPool = await getQuestions();
    let musikQuizResult: MusikquizResult = { rounds: [] };

    for (let index = 0; index < rounds; index++) {
        const mqRound: Round = { roundNumber: index, questions: [] };
        for (let index = 0; index < questions; index++) {
            mqRound.questions.push(questionPool[randomInt(0, 18)])
        }
        musikQuizResult.rounds.push(mqRound);
    }

    return musikQuizResult;
}

async function renderQuiz() {
    const questionsHtmlInput = document.querySelector("#questionsInput") as HTMLInputElement;
    const questionsPerRound = parseInt(questionsHtmlInput.value);
    const quizRoundsHtmlInput = document.querySelector("#roundsInput") as HTMLInputElement;
    const quizRounds = parseInt(quizRoundsHtmlInput.value);
    let quiz:MusikquizResult = {rounds : []};

    try {
        quiz = await createQuizData(quizRounds, questionsPerRound)
    } catch (error) {
        console.error(error)
        return;
    }


    /* <div id="round1" class="mm-quiz-round-container">
                                <div class="mm-quiz-round-container-header">
                                    Runde 1
                                </div>
                                <div class="mm-quiz-round-container-questions">
                                    <ol>
                                        <li>BLABLASBLA</li>
                                        <li>Seulem epsum psum</li>
                                    </ol>
                                </div>
                            </div> */
    const quizGrid = document.querySelector('#quizGrid') as HTMLDivElement;

    for (const quizRound of quiz.rounds) {
        // Round Container
        const divRoundContainer = document.createElement('div') as HTMLDivElement
        divRoundContainer.classList.add('mm-quiz-round-container')

        // Header Text
        const divRoundHeader = document.createElement('div') as HTMLDivElement
        divRoundHeader.classList.add('mm-quiz-round-container-header')
        divRoundHeader.innerText = `Runde ${quizRound.roundNumber}`

        // Questions Container
        const divRoundQuestions = document.createElement('div') as HTMLDivElement
        divRoundQuestions.classList.add('mm-quiz-round-container-questions')

        // Questions list
        const questionList = document.createElement('ol') as HTMLOListElement

        for(const question of quizRound.questions) {
            const questionItem = document.createElement('li') as HTMLLIElement
            questionItem.innerText = question.question
            questionList.append(questionItem)
        }

        divRoundContainer.append(divRoundHeader)
        divRoundContainer.append(divRoundQuestions)
        divRoundQuestions.append(questionList)
        
        quizGrid.append(divRoundContainer)
    }
}

