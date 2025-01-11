import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './modules/core/core.module';
import { RouterModule } from '@nestjs/core';
import appConfig from './common/config/app.config';
import { SystemModule } from './modules/system/system.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host:  configService.get<string>('app.db_host'),
        database: configService.get<string>('app.db_name'),
        username: configService.get<string>('app.db_username'),
        password: configService.get<string>('app.db_password'),
        autoLoadEntities: true,
        synchronize: true,
        keepConnectionAlive: true,
      }),
    }),
    CoreModule,
    SystemModule,

    RouterModule.register([
      {
        path: 'core',
        module: CoreModule,
      },
      {
        path: 'system',
        module: SystemModule,
      },
    
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
    
   
  }
}
