import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './schemas/animal.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<Animal>
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    return this.animalModel.create(createAnimalDto);
  }

  async findAll(): Promise<Animal[]> {
    const animal = await this.animalModel.find().exec();
    return animal;
  }

  async findOne(id: string): Promise<Animal> {
    return this.animalModel.findById(id).exec();
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const updateSpecial = await this.animalModel
      .findByIdAndUpdate(id, updateAnimalDto, { new: true })
      .exec();

    if (!updateSpecial) {
      throw new NotFoundException(`Specialisty ${id} does not exist`);
    }
    return updateSpecial;
  }

  async remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
