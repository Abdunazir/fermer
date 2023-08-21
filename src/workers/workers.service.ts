import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Woorkers } from './schemas/worker.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Woorkers.name) private specialModel: Model<Woorkers>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateWorkerDto) {
    return this.specialModel.create(createUserDto);
  }

  async findAll(): Promise<Woorkers[]> {
    const workers = await this.specialModel
      .find()
      .populate('specialty_id')
      .exec();
    return workers;
  }

  async findOne(id: string) {
    return this.specialModel.findById(id).exec();
  }

  async update(id: string, updateSpecialityDto: UpdateWorkerDto) {
    const updateWorker = await this.specialModel
      .findByIdAndUpdate(id, updateSpecialityDto, { new: true })
      .exec();

    if (!updateWorker) {
      throw new NotFoundException(`Worker ${id} does not exist`);
    }
    return updateWorker;
  }

  remove(id: string) {
    return this.specialModel.findByIdAndDelete(id);
  }
}
