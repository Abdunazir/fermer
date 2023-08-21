import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Block } from '../../block/schemas/block.schema';
import { Woorkers } from '../../workers/schemas/worker.schema';

export type WorkerBlockDocument = HydratedDocument<WorkerBlock>;

@Schema()
export class WorkerBlock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Woorkers' })
  worker_id: Woorkers;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Block' })
  block_id: Block;
  static schema: any;
}

export const WorkerBlockSchema = SchemaFactory.createForClass(WorkerBlock);
