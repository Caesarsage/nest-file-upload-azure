/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FilesAzureService } from '../files/file.azure.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FilesAzureService
  ) {}

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    const containerName = 'fileupload';
    const upload = await this.fileService.uploadFile(file, containerName)
    this.userService.saveUrl(id, upload, containerName);
    return {
      upload,
      message: 'uploaded successfully'
    }
  }

  @Get('/:id')
  async getimage(@Param('id') id) {
    const image = await this.userService.getimage(id);
    return {
      image,
      message: 'get image successfully'
    }
  }

  @Delete('remove/:id')
  @UseInterceptors(FileInterceptor('image'))
  async remove(@UploadedFile() file: Express.Multer.File , @Param('id') id) {
    const containerName = 'fileupload';
    const user = await this.userService.remove(id, containerName);
    return {
      user,
      message: 'deleted successfully'
    }
  }
}
