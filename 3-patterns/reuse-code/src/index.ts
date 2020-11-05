import fs from 'fs';

const csvFile = 'football.csv'
const data = fs.readFileSync(csvFile,{encoding: 'utf-8'})
.split('\n')
.map((row: string): string[] =>{
  return row.split(',')
})
console.log(data)
console.log(data[0])