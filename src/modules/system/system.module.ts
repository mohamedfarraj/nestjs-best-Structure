import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UploadsController } from './uploads/uploads.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([

    ]),
  ],
  controllers: [

    UploadsController,
    

  ],
  providers: [

    

  ],
})
export class SystemModule {}
