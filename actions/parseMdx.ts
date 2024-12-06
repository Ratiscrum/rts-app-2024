'use server';

import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { fileExists } from './files';
import * as path from 'path';

export default async function parseMdx(filePath: string) {
  if (!(await fileExists(filePath))) {
    throw new Error(`File not found: ${path}`);
  }

  const postFile = await fs.readFile(path.join(process.cwd(), filePath));

  const mdxSource = await serialize(postFile, { parseFrontmatter: true });

  if (!mdxSource) {
    throw new Error(`Invalid MDX source for file: ${path}`);
  }

  return mdxSource;
}
