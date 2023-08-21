import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @ApiOkResponse({ description: 'Successfully created an animal.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @ApiOkResponse({ description: 'Successfully retrieved animals.' })
  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @ApiOkResponse({ description: 'Successfully retrieved an animal by ID.' })
  @ApiNotFoundResponse({ description: 'Animal with specified ID not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(id);
  }

  @ApiOkResponse({ description: 'Successfully updated an animal.' })
  @ApiNotFoundResponse({ description: 'Animal with specified ID not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @ApiOkResponse({ description: 'Successfully removed an animal.' })
  @ApiNotFoundResponse({ description: 'Animal with specified ID not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
