import fs from 'fs';
export class CsvFileReader {
  data: string[][] = [];
  fileName: string;
  constructor(fileName: string) {
    this.fileName = fileName;
  }
  read(): void {
    this.data = fs
      .readFileSync(this.fileName, { encoding: 'utf-8' })
      .split('\n')
      .map((row: string): string[] => {
        return row.split(',');
      });
  }
}
