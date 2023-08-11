import { NestFactory } from '@nestjs/core';
import { Module, applyDecorators } from '@nestjs/common';
import { AppController } from './app.controller';
import moduler from './functions/moduler';

interface IAppOptions {
  port?: number,
  modulesPath: string
}

class AppModule {}

export async function InititalizeApp(options: IAppOptions) {
  
  applyDecorators(
    Module({
      imports: moduler(options.modulesPath),
      controllers: [AppController],
      providers: [],
    })
  )(AppModule);

  const app = await NestFactory.create(AppModule);
  
  await app.listen(options.port || 3000);
};
