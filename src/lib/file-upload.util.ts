import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

export const fileUploadOptions = (folder: string) => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `public/upload/${folder}`;
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
});

export const getFileUrl = (folder: string, file: Express.Multer.File): string | null => {
  return file ? `/public/upload/${folder}/${file.filename}` : null;
};

export const getFileUrls = (folder: string, files: Express.Multer.File[]) => {
  return files.map(file => getFileUrl(folder, file));
};