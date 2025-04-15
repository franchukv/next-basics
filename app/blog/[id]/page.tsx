import type Post from '@/types/Post';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

async function getData(id: string | number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post: Post = await getData(id);

  return {
    title: `${post.title} | Next App`,
  };
}

export default async function Post({ params }: Props) {
  const { id } = await params;
  const post: Post = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
