import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
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
  const post = await getData(id);

  return {
    title: `${post.title} | Next App`,
  };
}

export default async function Post({ params }: Props) {
  const { id } = await params;
  const post = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
