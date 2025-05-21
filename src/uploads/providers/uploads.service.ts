import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';

import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadsService {
  constructor(
    // Inject uploadToAwsProvider
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    // Inject configService
    private readonly configService: ConfigService,

    // Inject UploadsRepository
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
  ) {}

  public async uploadFile(file: Express.Multer.File) {
    // Throw error for unsupported MIME types.
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadGatewayException('Mime type not supported');
    }

    try {
      //  Upload the file to AWS S3
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // Generate to a new entry in database
      const uploadFile: UploadFile = {
        name,
        path: `${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);

      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
