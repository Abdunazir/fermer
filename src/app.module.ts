import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialityModule } from './speciality/speciality.module';
// import { WorkersModule } from './workers/workers.module';
import { WorkersModule } from './workers/workers.module';
// import { BlockModule } from './block/block.module';
import { BlockModule } from './block/block.module';
import { WorkerBlockModule } from './worker-block/worker-block.module';
import { InfoModule } from './info/info.module';
// import { AnimalsModule } from './no--spec/animals/animals.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    SpecialityModule,
    WorkersModule,
    BlockModule,
    WorkerBlockModule,
    InfoModule,
    AnimalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
