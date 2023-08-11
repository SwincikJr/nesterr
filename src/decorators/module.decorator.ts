import { Module as NestModule } from "@nestjs/common";
import moduler from "../functions/moduler";
import controllersLoader from "../functions/controllersLoader";
import servicesLoader from "../functions/servicesLoader";

interface IModuleOptions {
    subModulesPath?: string,
    controllersPath?: string,
    providersPath?: string,
}

export function Module(options: IModuleOptions): ClassDecorator {
    return function (target: any): void {
        Reflect.defineMetadata('isModule', true, target);
        const imports = options.subModulesPath ? moduler(options.subModulesPath) : [];
        const providers = options.providersPath ? servicesLoader(options.providersPath) : [];
        const controllers = options.controllersPath ? controllersLoader(options.controllersPath) : [];
        NestModule({ imports, controllers, providers })(target);
    }
}
