import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from './schemas/info.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private infoModel: Model<Info>,
    private readonly jwtService: JwtService,
  ) {}

  create(createInfoDto: CreateInfoDto) {
    return this.infoModel.create(createInfoDto);
  }

  async findAll(): Promise<Info[]> {
    const infos = await this.infoModel.find().populate('block_id').exec();
    return infos;
  }

  async findOne(id: string) {
    return this.infoModel.findById(id).exec();
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const updateWorker = await this.infoModel
      .findByIdAndUpdate(id, updateInfoDto, { new: true })
      .exec();

    if (!updateWorker) {
      throw new NotFoundException(`Worker ${id} does not exist`);
    }
    return updateWorker;
  }

  remove(id: string) {
    return this.infoModel.findByIdAndDelete(id);
  }
}
