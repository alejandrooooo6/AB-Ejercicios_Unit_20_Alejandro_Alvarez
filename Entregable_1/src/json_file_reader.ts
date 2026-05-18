import fs from 'node:fs/promises';

export class JsonFileReader {
  async read(filePath: string): Promise<any> {
    const rawData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(rawData);
  }
}