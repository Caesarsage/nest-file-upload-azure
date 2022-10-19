import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesAzureService } from '../files/file.azure.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly fileService: FilesAzureService,
  ) {}

  async saveUrl(id, file_url: string, containerName: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    const file_image = user?.image_url;
    let getfile = '';

    if (file_image) {
      getfile = file_image.split('/').pop();
    }
    await this.userRepository.save({
      ...user,
      image_url: file_url,
    });
    await this.fileService.deleteFile(getfile, containerName);
  }

  async getimage(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return user;
  }

  async remove(id: number, containerName: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      const file_url = user?.image_url;
      if (file_url) {
        await this.userRepository.update(id, {
          ...user,
          image_url: '',
        });

        const file_ = file_url.split('/').pop();

        await this.fileService.deleteFile(file_, containerName);
      }

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
