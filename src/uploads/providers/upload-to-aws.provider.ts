import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsPublicBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    const name = file.originalname.split('.')[0];

    // Remove white space
    name.replace(/\s/g, '').trim();

    // Extract the extension
    const extension = path.extname(file.originalname);

    // Generate time stamp
    const timestamp = new Date().getTime().toString().trim();

    // Return file uuid
    return `${name}-${timestamp}-${randomUUID()}${extension}`;
  }
}
