import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from '../../speciality/schemas/speciality.schema';

export type WoorkersDocument = HydratedDocument<Woorkers>;

@Schema()
export class Woorkers {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  experience: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' })
  specialty_id: Speciality;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  worker_schedule: Date;
}

export const WoorkersSchema = SchemaFactory.createForClass(Woorkers);
