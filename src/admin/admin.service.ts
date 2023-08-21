import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      return new BadRequestException('passwords is not match');
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const createdAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.generateTokens(createdAdmin);

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminModel.findByIdAndUpdate(
      createdAdmin._id,
      { hashed_token },
      { new: true },
    );
    console.log(updateAdmin);

    return updateAdmin;
  }

  async generateTokens(admin: AdminDocument) {
    const jwtPayload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    const response = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    return response;
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find().exec();
    return admins;
  }

  async findOne(id: string) {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin ${id} does not exist`);
    }
    return existingAdmin;
  }

  remove(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string) {
    const admin = await this.adminModel.findOne({ email }).exec();
    if (!admin) {
      throw new NotFoundException(`Admin ${email} does not exist`);
    }
    return admin;
  }
}
