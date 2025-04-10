'use client';

export default function Error({ error }: { error: Error }) {
  return <span>{error.message}</span>;
}
