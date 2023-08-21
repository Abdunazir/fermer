import { Module } from '@nestjs/common';
import { WorkerBlockService } from './worker-block.service';
import { WorkerBlockController } from './worker-block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkerBlock, WorkerBlockSchema } from './schemas/worker-block.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkerBlock.name, schema: WorkerBlockSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [WorkerBlockController],
  providers: [WorkerBlockService],
})
export class WorkerBlockModule {}
