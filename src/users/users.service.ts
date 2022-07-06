import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from './user.entity';
import { QuizData } from '../quizDatas/quizData.entity';
import { CreateUserDto, AddQuizResultDto } from './dto';
import { Repository } from 'typeorm';
import { Answer } from '../questions/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.birthday = createUserDto.birthday;
    user.gender = createUserDto.gender;

    try {
      await this.findByEmail(createUserDto.email);
    } catch (err) {
      await this.usersRepository.save(user);
      delete user.password;
      return user;
    }
    throw new UnprocessableEntityException('Email already in use');
  }

  public async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneByOrFail({ email });
  }

  async updateQuizDatas(userId: number, addQuizResultDto: AddQuizResultDto) {
    const dataUser = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.quizDatas', 'quizDatas')
      .where({ id: userId })
      .getOne();

    for (const e of addQuizResultDto.quizDatas) {
      const answer = await this.answerRepository.findOneBy({ id: e });
      const quizData = new QuizData();
      quizData.answer = answer;
      dataUser.quizDatas.push(quizData);
    }

    dataUser.profile = addQuizResultDto.score;

    return await this.usersRepository.save(dataUser);
  }
}
