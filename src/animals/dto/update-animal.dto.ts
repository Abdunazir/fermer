import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  @IsNotEmpty()
  @IsNumber()
  animal_type_id: number;

  @IsNotEmpty()
  @IsString()
  photos: string;

  @IsNotEmpty()
  @IsNumber()
  unique_id: number;
}
