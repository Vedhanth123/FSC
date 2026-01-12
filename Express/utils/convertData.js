/*
FIle to convert csv to json
*/

import fs from "fs";
import path from "path";
import csv from 'csv-parser';

const results = [];

async function convertData() {
  fs.createReadStream('DSA.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.writeFile('data.json', JSON.stringify(results, null, 2), (err) => {
        if (err) {
          console.log("error writing", err);
        }
        else {
          console.log("successfully converted into data.json")
        }
      })
    })

}
convertData()