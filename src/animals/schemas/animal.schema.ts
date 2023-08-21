import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  @Prop({ required: true })
  animal_type_id: number;

  @Prop({ required: true })
  photos: string;

  @Prop({ required: true })
  unique_id: number;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
