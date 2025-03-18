import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService {
    async logError(error: string): Promise<void> {
        const errorLog = `error message : ${new Date().toISOString()}: ${error}\n`;
        //console.log("eroooo", errorLog);
        let dirPath = path.resolve(__dirname, '../errors');
        const filePath = path.join(dirPath, 'logfile.log');
        fs.appendFileSync(filePath, errorLog);
    }
}