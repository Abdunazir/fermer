import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../admin/schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Speciality } from './schemas/speciality.schema';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Speciality.name) private specialModel: Model<Speciality>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateSpecialityDto) {
    return this.specialModel.create(createUserDto);
  }

  async findAll(): Promise<Speciality[]> {
    const specialitys = await this.specialModel.find().exec();
    return specialitys;
  }

  async findOne(id:string) {
    return this.specialModel.findById(id).exec();
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const updateSpecial=await this.specialModel
    .findByIdAndUpdate(id,updateSpecialityDto, {new:true})
    .exec()

    if(!updateSpecial){
      throw new NotFoundException(`Specialisty ${id} does not exist`);
    }
    return updateSpecial
  }

  async remove(id: string):Promise<Speciality> {
    return this.specialModel.findByIdAndDelete(id)
  }
}


