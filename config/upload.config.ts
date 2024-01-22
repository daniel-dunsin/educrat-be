import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import secrets from '../constants/secrets.const';
import ServiceException from '../schema/exception/service.exception';

const { apiKey, apiSecret, cloudName } = secrets.cloudinary;

cloudinary.config({
     api_key: apiKey,
     api_secret: apiSecret,
     cloud_name: cloudName,
});

export async function uploadResource(
     file: string,
     options: UploadApiOptions = {}
): Promise<Pick<UploadApiResponse, 'url' | 'public_id'>> {
     try {
          const data = await cloudinary.uploader.upload(file, { ...options, folder: 'educrat' });

          return { url: data.secure_url, public_id: data.public_id };
     } catch (error: any) {
          console.log(error);
          throw new ServiceException(400, `Unable to upload resource to cloud ${error.message ?? error}`);
     }
}

export async function deleteResource(public_id: string, options: UploadApiOptions = {}): Promise<void> {
     try {
          await cloudinary.uploader.destroy(public_id, { ...options });
     } catch (error: any) {
          console.log(error);
          throw new ServiceException(400, `Unable to delete resource from cloud ${error.message ?? error}`);
     }
}
