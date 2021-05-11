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

export {Genre, Question, Musikquiz, Round, MusikquizResult}