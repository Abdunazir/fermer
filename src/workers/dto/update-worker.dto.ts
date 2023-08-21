import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDto } from './create-worker.dto';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  name: string;

  age: number;

  experience: string;

  specialty_id: string;

  phone_number: string;

  username: string;

  worker_schedule: Date;
}
