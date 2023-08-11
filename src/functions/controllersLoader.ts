import * as fs from 'fs';
import * as path from 'path';
import hasNot from './hasNot';

export default function controllersLoader(basePath: string, controllers: string[] = []): any[] {
    const options = fs.readdirSync(basePath);
    for (const option of options) {
        const stats = fs.statSync(path.join(basePath, option));
        if (stats.isFile() && hasNot(option)) {
            const module = require(path.join(basePath, option));
            for(const key in module) {
                if (Reflect.getMetadata('isController', module[key])) {
                    controllers.push(module[key]);
                }
            }
        }
    }
    return controllers;
}
