import { Injectable as NestInjectable, ScopeOptions } from "@nestjs/common";

export function Injectable(options?: ScopeOptions): ClassDecorator {
    return function(target: any): void {
        Reflect.defineMetadata('isInjectable', true, target);
        NestInjectable(options)(target);
    }
}
