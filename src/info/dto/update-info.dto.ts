import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from './create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
  weight: number;

  height: number;

  color: string;

  breed: string;

  gender: string;

  birth_or_acquisition: Date;

  block_id: number;

  animal_id: number;

  parent_id: number;
}
