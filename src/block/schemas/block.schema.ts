import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlockDocument = HydratedDocument<Block>;

@Schema()
export class Block {
  @Prop({ required: true })
  title: number;

  @Prop({ required: true })
  description: string;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
