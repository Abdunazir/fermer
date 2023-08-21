import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schemas/block.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private specialModel: Model<Block>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateBlockDto) {
    return this.specialModel.create(createUserDto);
  }

  async findAll(): Promise<Block[]> {
    const specialitys = await this.specialModel.find().exec();
    return specialitys;
  }

  async findOne(id: string) {
    return this.specialModel.findById(id).exec();
  }

  async update(id: string, updateSpecialityDto: UpdateBlockDto) {
    const updateSpecial = await this.specialModel
      .findByIdAndUpdate(id, updateSpecialityDto, { new: true })
      .exec();

    if (!updateSpecial) {
      throw new NotFoundException(`Specialisty ${id} does not exist`);
    }
    return updateSpecial;
  }

  remove(id: string) {
    return this.specialModel.findByIdAndDelete(id);
  }
}
