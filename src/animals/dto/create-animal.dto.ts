import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnimalDto {
  @ApiProperty({
    type: Number,
    description: 'ID of the animal type',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  animal_type_id: number;

  @ApiProperty({
    type: String,
    description: 'URLs of photos of the animal',
    example: 'https://example.com/photo1.jpg,https://example.com/photo2.jpg',
  })
  @IsNotEmpty()
  @IsString()
  photos: string;

  @ApiProperty({
    type: Number,
    description: 'Unique identifier for the animal',
    example: 12345,
  })
  @IsNotEmpty()
  @IsNumber()
  unique_id: number;
}
