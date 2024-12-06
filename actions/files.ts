'use server';

import * as path from 'path';
import { promises as fs } from 'fs';
import { imageExtensions } from '@/app/config';

export async function getFileList(folderPath: string): Promise<string[]> {
  const dirContent = await fs.readdir(path.join(process.cwd(), folderPath));

  const files: string[] = [];

  for (const file of dirContent) {
    const filePath = path.join(process.cwd(), folderPath, file);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isFile()) {
      files.push(file);
    }
  }

  return files;
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.stat(path.join(process.cwd(), filePath));
    return true;
  } catch {
    return false;
  }
}

export async function lookForImage(filePath: string): Promise<string | null> {
  for (const extension of imageExtensions) {
    const imagePath = `${filePath}${extension}`;
    if (await fileExists(imagePath)) {
      return extension;
    }
  }

  return null;
}

export async function imagesInFolder(folderPath: string): Promise<string[]> {
  const images: string[] = [];

  const dirContent = await fs.readdir(path.join(process.cwd(), folderPath));

  for (const file of dirContent) {
    const fileExtension = path.extname(file);
    if (imageExtensions.includes(fileExtension)) {
      const filePath = `${folderPath}${file}`.replace('/public', '');
      images.push(filePath);
    }
  }

  return images;
}
