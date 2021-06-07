import { Round, MusikquizResult, Question } from './quiz_interfaces'

window.addEventListener('DOMContentLoaded', () => {
    const generateQuizButton = document.querySelector("#quiztime") as HTMLButtonElement;
    generateQuizButton.addEventListener("click", async () => {
        await renderQuiz()
    });
});


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

/**
 * Creates the quiz data
 * @param {number} rounds | Number of quiz rounds
 * @param {number} questions | Number of questions per round
 * @returns Promise<MusikquizResult> | Created music quiz
 */
async function createQuizData(rounds: Number, questions: Number): Promise<MusikquizResult> {

    const questionPool = await getQuestions();
    let musikQuizResult: MusikquizResult = { rounds: [] };

    for (let index = 1; index <= rounds; index++) {
        const mqRound: Round = { roundNumber: index, questions: [] };
        for (let index = 0; index < questions; index++) {
            mqRound.questions.push(questionPool[randomInt(0, 18)])
        }
        musikQuizResult.rounds.push(mqRound);
    }

    return musikQuizResult;
}

/**
 * Renders the quiz result in HTML
 */
async function renderQuiz() {
    const questionsHtmlInput = document.querySelector("#questionsInput") as HTMLInputElement;
    const questionsPerRound = parseInt(questionsHtmlInput.value);
    const quizRoundsHtmlInput = document.querySelector("#roundsInput") as HTMLInputElement;
    const quizRounds = parseInt(quizRoundsHtmlInput.value);
    let quiz: MusikquizResult = { rounds: [] };

    try {
        quiz = await createQuizData(quizRounds, questionsPerRound)
    } catch (error) {
        console.error(error)
        return;
    }

    const quizGrid = document.querySelector('#quizGrid') as HTMLDivElement;

    for (const quizRound of quiz.rounds) {
        const roundDetailsElement = document.createElement('details') as HTMLDetailsElement
        roundDetailsElement.classList.add('mm-quiz-round-container')

        const roundDetailsSummary = document.createElement('summary') as HTMLElement
        roundDetailsSummary.classList.add('mm-quiz-round-container-header')
        roundDetailsSummary.innerText = `Runde ${quizRound.roundNumber}`

        roundDetailsElement.append(roundDetailsSummary)

        // Questions list
        const questionList = document.createElement('ol') as HTMLOListElement

        for (const question of quizRound.questions) {
            const questionItem = document.createElement('li') as HTMLLIElement
            questionItem.innerText = question.question
            questionList.append(questionItem)
        }

        roundDetailsElement.append(questionList)
        quizGrid.append(roundDetailsElement)
    }

    window.location.href = '#quiz';
}

