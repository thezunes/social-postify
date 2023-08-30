import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.prisma.media.create({
      data: createMediaDto,
    });
  }

  async findAllMedias() {
    return await this.prisma.media.findMany();
  }

  async findById(id: number) {
    return await this.prisma.media.findFirst({ where: { id } });
  }

  async update(id: number, data: UpdateMediaDto) {
    return await this.prisma.media.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.media.delete({ where: { id } });
  }

  async verifyUserNameAndMedia(title: string, username: string) {
  return this.prisma.media.findFirst({
    where: { title_username: { title,username} }
  });
}

findPublication(id: number) {
  return this.prisma.publication.findFirst({
    where: { mediaId: id,},});
}
}