import { SeaElementProps } from '@/models/sea-element-props.type';
import { fileExists } from '@/actions/files';
import { notFound } from 'next/navigation';
import parseMdx from '@/actions/parseMdx';
import { SeaElementContent } from '@/models/seaElementContent';

export default async function getSeaElementContent(
  elementName: string,
): Promise<SeaElementContent> {
  const path = '/content/sea-elements/' + elementName + '.mdx';

  if (!(await fileExists(path))) {
    return notFound();
  }

  const mdxSource = await parseMdx(path);

  if (!mdxSource) {
    throw new Error(
      `Invalid MDX source for article: ${elementName}. Folder name & mdx file name must be the same.`,
    );
  }

  return {
    seaElementProps: {
      title: mdxSource.frontmatter.title,
      description: mdxSource.frontmatter.description,
      organ: mdxSource.frontmatter.organ,
      topPrct: mdxSource.frontmatter.topPrct,
    } as unknown as SeaElementProps,
    mdx: mdxSource,
  };
}
