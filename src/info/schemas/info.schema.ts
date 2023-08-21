import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Block } from "../../block/schemas/block.schema";
import mongoose, { HydratedDocument } from "mongoose";

export type InfoDocument = HydratedDocument<Info>;


@Schema()
export class Info {
  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birth_or_acquisition: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Block' })
  block_id:Block;

  @Prop({ required: true })
  animal_id: number;

  @Prop({ required: true })
  parent_id: number;
}

export const InfoSchema = SchemaFactory.createForClass(Info);



