import { Metadata } from 'next';

type Props = {
  id: string;
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

async function generateMetadata({ id }: Props): Promise<Metadata> {
  const post = await getData(id);

  return {
    title: `${post.title} | Next App`,
  };
}

export default async function Post({ id }: Props) {
  const post = await getData(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
