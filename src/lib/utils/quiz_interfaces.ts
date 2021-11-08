interface Genre {
    id: number;
    genre: string
}

interface Question {
    id: number;
    question: string
}

interface Musikquiz {
    players: number;
    rounds: number;
    genres: Genre[];
    questions: Question[]
}

interface Round {
    roundNumber: number;
    questions: Question[]
}

interface MusikquizResult {
    rounds: Round[]
}

interface ApiParameter {
    rounds: number, 
    questions: number
}

type Player = {
    name: string,
    correctQuestions: CorrectAnswer[]
}

type CorrectAnswer = {
    round: number,
    question: number,
    correct: boolean
}

export type {Genre, Question, Musikquiz, Round, MusikquizResult, ApiParameter as apiParameter, Player, CorrectAnswer}