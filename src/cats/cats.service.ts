import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.firstName = createCatDto.firstName;
    cat.lastName = createCatDto.lastName;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const toUpdate = await this.catsRepository.findOneBy({ id });

    const updated = Object.assign(toUpdate, updateCatDto);
    return await this.catsRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
