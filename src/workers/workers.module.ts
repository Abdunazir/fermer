import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Woorkers, WoorkersSchema } from './schemas/worker.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Woorkers.name, schema: WoorkersSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
