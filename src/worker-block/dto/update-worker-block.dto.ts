import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerBlockDto } from './create-worker-block.dto';

export class UpdateWorkerBlockDto extends PartialType(CreateWorkerBlockDto) {
  worker_id: string;
  block_id: string;
}
