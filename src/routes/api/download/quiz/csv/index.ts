import fs from 'fs';
import { json2csv } from 'json-2-csv';
import type { MusikquizResult } from '../../../quiz_interfaces'

function generateCSVFile(musicQuiz: MusikquizResult): void {
    // 1.  Convert JSON to CSV
    json2csv(musicQuiz.rounds, (error, csv) => {
        if (error) {
            throw error;
        }

        // print CSV string
        console.log(csv);

        // write CSV to a file
        fs.writeFileSync('./data/music_quiz.csv', csv);
    })

    // // 2. Generate file and return it
    // const writeStream = fs.createWriteStream("./data/musikquiz.csv");

}