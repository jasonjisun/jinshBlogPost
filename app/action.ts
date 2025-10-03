'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { prisma } from './utils/db'
import { redirect } from 'next/navigation'

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error('You must be logged in to create a post');
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('url') as string;

  // Ensure Author exists (create or update)
  const author = await prisma.author.upsert({
    where: { id: user.id },
    update: {
      name: user.given_name,
      image: user.picture,
    },
    create: {
      id: user.id,
      name: user.given_name,
      image: user.picture,
    },
  });

  // Create BlogPost linked to the Author
  await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl,
      authorId: author.id,
    },
  });

  return redirect('/dashboard');
}
