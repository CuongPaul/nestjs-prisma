import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(data: CreatePostDto) {
    const author = await this.userService.findOne(data.authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    return this.prisma.post.create({ data });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
