interface Genre {
    id: Number;
    genre: String
}

interface Question {
    id: Number;
    question: String
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