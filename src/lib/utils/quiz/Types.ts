interface QuizSettings {
    rounds: number;
    questions: number;
}

interface Question {
    id: string;
    spotifyTrackId: string;
    question: number;
}

export interface Quiz {
    id: string;
    description: string;
    spotifyPlaylistId: string;
    settings: QuizSettings;
    questions: Question[];
}