import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciality, SpecialitySchema } from './schemas/speciality.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speciality.name, schema: SpecialitySchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [SpecialityController],
  providers: [SpecialityService],
})
export class SpecialityModule {}
