import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerBlockDto } from './dto/create-worker-block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkerBlock } from './schemas/worker-block.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class WorkerBlockService {
  constructor(
    @InjectModel(WorkerBlock.name) private specialModel: Model<WorkerBlock>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateWorkerBlockDto) {
    return this.specialModel.create(createUserDto);
  }

  async findAll(): Promise<WorkerBlock[]> {
    const specialitys = await this.specialModel
      .find()
      .populate('worker_id')
      .populate('block_id')
      .exec();
    return specialitys;
  }

  async findOne(id: string) {
    return this.specialModel.findById(id).exec();
  }

  async update(id: string, updateSpecialityDto: UpdateWorkerBlockDto) {
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
