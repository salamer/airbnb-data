import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import urlJoin from 'url-join';

const objectStorageClient = new S3Client({
  region: config.OBJECT_STORAGE_REGION,
  credentials: {
    accessKeyId: config.OBJECT_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: config.OBJECT_STORAGE_SECRET_ACCESS_KEY,
  },
  endpoint: config.OBJECT_STORAGE_ENDPOINT,
});

interface UploadBase64Response {
  objectKey: string;
  objectUrl: string; // The full public URL
  rawResponse: PutObjectCommandOutput; // Raw Object Storage response
}

export const uploadBase64ToObjectStorage = async (
  base64Data: string,
  fileType: string,
  customKey?: string,
): Promise<UploadBase64Response> => {
  console.log('Uploading base64 data to Object Storage...');
  if (!config.OBJECT_STORAGE_BUCKET_NAME) {
    throw new Error('OBJECT_STORAGE_BUCKET_NAME is not configured.');
  }
  console.log('OBJECT_STORAGE_BUCKET_NAME:', config.OBJECT_STORAGE_BUCKET_NAME);
  if (!fileType.startsWith('image/')) {
    throw new Error(
      'Invalid fileType. Must be an image MIME type (e.g., image/jpeg, image/png).',
    );
  }

  const buffer = Buffer.from(base64Data, 'base64');
  console.log('Buffer length:', buffer.length);

  const extension = fileType.split('/')[1] || 'tmp';
  const objectKey = customKey || `uploads/images/${uuidv4()}.${extension}`;

  console.log('Generated object storage key:', objectKey);
  const command = new PutObjectCommand({
    Bucket: config.OBJECT_STORAGE_BUCKET_NAME,
    Key: objectKey,
    Body: buffer,
    ContentType: fileType,
  });

  try {
    console.log('Sending Object Storage upload command...');
    const response = await objectStorageClient.send(command);

    const objectUrl = getPublicObjectStorageUrl(objectKey);

    console.log('Object Storage upload result:', response);

    return {
      objectKey,
      objectUrl,
      rawResponse: response,
    };
  } catch (error) {
    console.error('Error uploading base64 data to Object Storage:', error);
    throw new Error('Could not upload image to Object Storage.');
  }
};

export const getPublicObjectStorageUrl = (objectKey: string): string => {
  if (
    !config.OBJECT_STORAGE_BUCKET_NAME ||
    !config.OBJECT_STORAGE_CDN_URL_PREFIX
  ) {
    console.warn('Object Storage config missing.');
    return objectKey;
  }

  return urlJoin(
    config.OBJECT_STORAGE_CDN_URL_PREFIX,
    config.OBJECT_STORAGE_BUCKET_NAME,
    objectKey,
  );
};
