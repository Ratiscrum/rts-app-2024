'use client';

import { MDXRemote } from 'next-mdx-remote';

export default function Content({ mdx }: { mdx: any }): JSX.Element {
  return (
    <div className="flex flex-col gap-2 text-sm text-foreground">
      <MDXRemote {...mdx} />
    </div>
  );
}
