import * as util from 'util';
import * as fs from 'fs';

interface Configuration {
    api: {
        contents: {
            host: string;
            port: string;
        }
    };
}
export let configuration: Configuration | null = null;
export const readFileAsync = util.promisify(fs.readFile)

export async function loadConfiguration(filePath: string) {
    try {
        const data = await readFileAsync(filePath, {encoding: 'utf8'});
        configuration = JSON.parse(data);
    } catch (e) {
        console.log(e);
        throw e;
    }
}