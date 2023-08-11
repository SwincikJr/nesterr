import * as fs from 'fs';
import * as path from 'path';
import hasNot from './hasNot';

export default function moduler(basePath: string, modules: string[] = []): any[] {
    const modulePaths = fs.readdirSync(basePath);
    for (const modulePath of modulePaths) {
        const options = fs.readdirSync(path.join(basePath, modulePath));
        for (const option of options) {
            const stats = fs.statSync(path.join(basePath, modulePath, option));
            if (stats.isFile() && hasNot(option)) {
                const module = require(path.join(basePath, modulePath, option));
                for(const key in module) {
                    if (Reflect.getMetadata('isModule', module[key])) {
                        modules.push(module[key]);
                    }
                }
            }
        }
    }
    return modules;
}
