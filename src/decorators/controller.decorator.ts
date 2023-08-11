import { Controller as NestController } from "@nestjs/common";

export function Controller(prefix?: string | string[]): ClassDecorator {
    return function(target: any): void {
        Reflect.defineMetadata('isController', true, target);
        NestController(prefix)(target);
    }
}
