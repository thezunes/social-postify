import { Injectable, forwardRef, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class MediasService {
  constructor(
    private readonly mediasRepository: MediasRepository,
    @Inject(forwardRef(() => PublicationsService))
    private readonly publicationsService: PublicationsService
  ) { }

  async create(body: CreateMediaDto) {
    const { title, username } = body;
    const availability = await this.mediasRepository.verifyUserNameAndMedia(title, username);
    if (availability) throw new HttpException('CONFLICT', HttpStatus.CONFLICT);

    return await this.mediasRepository.create(title, username);
  }

  async findAllMedias() {
    return await this.mediasRepository.findAllMedias();
  }

  async findById(id: number) {
    const media = await this.mediasRepository.findById(id);
    if (!media) throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    
    await this.findById(id);
    const { title, username } = updateMediaDto;

    const media = await this.mediasRepository.verifyUserNameAndMedia(title, username);
    if (media) throw new HttpException("Media with this info already exists", HttpStatus.CONFLICT);

    return this.mediasRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    await this.findById(id);
    const conflict = await this.mediasRepository.findPublication(id);
    if (conflict) throw new HttpException('CONFLICT',HttpStatus.CONFLICT,);

    return await this.mediasRepository.remove(id);
  }
}
