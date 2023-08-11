import * as fs from 'fs';
import * as path from 'path';
import hasNot from './hasNot';

export default function servicesLoader(basePath: string, services: string[] = []): any[] {
    const options = fs.readdirSync(basePath);
    for (const option of options) {
        const stats = fs.statSync(path.join(basePath, option));
        if (stats.isFile() && hasNot(option)) {
            const module = require(path.join(basePath, option));
            for(const key in module) {
                if (Reflect.getMetadata('isInjectable', module[key])) {
                    services.push(module[key]);
                }
            }
        }
    }
    return services;
}