import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesAzureService } from './file.azure.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [FilesAzureService],
  exports: [FilesAzureService],
})
export class FileModule {}
