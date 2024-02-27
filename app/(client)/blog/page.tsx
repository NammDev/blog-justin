import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import type { Image as ImageType } from 'sanity'

export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

interface Author {
  name: string
  role: string
  avatar: ImageType
}

// Define type for a single blog object
interface Blog {
  title: string
  slug: {
    current: string
    _type: string
  }
  date: string
  author: Author
  excerpt: string
}

async function getBlogs(): Promise<Blog[]> {
  const query = `*[_type == 'blog'] {
    title, 
    slug, 
    date, 
    excerpt,
    author -> {
      name, 
      role, 
      avatar
    }
  }`
  const data: Blog[] = await client.fetch(query)
  return data
}

export default async function Blog() {
  let articles = await getBlogs()

  return (
    <>
      <PageIntro eyebrow='Blog' title='The latest articles and news'>
        <p>
          Stay up-to-date with the latest industry news as our marketing teams finds new ways to
          re-purpose old CSS tricks articles!
        </p>
      </PageIntro>

      <Container className='mt-24 sm:mt-32 lg:mt-40'>
        <div className='space-y-24 lg:space-y-32'>
          {articles.map((article) => (
            <FadeIn key={article.slug}>
              <article>
                <Border className='pt-16'>
                  <div className='relative lg:-mx-4 lg:flex lg:justify-end'>
                    <div className='pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0'>
                      <h2 className='font-display text-2xl font-semibold text-neutral-950'>
                        <Link href={`/blog/${article.slug.current}`}>{article.title}</Link>
                      </h2>
                      <dl className='lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4'>
                        <dt className='sr-only'>Published</dt>
                        <dd className='absolute left-0 top-0 text-sm text-neutral-950 lg:static'>
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </dd>
                        <dt className='sr-only'>Author</dt>
                        <dd className='mt-6 flex gap-x-4'>
                          <div className='flex-none overflow-hidden rounded-xl bg-neutral-100'>
                            <Image
                              className='h-12 w-12 object-cover grayscale'
                              src={urlForImage(article.author.avatar)}
                              alt='Post'
                              width={1800}
                              height={1800}
                            />
                          </div>
                          <div className='text-sm text-neutral-950'>
                            <div className='font-semibold'>{article.author.name}</div>
                            <div>{article.author.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <p className='mt-6 max-w-2xl text-base text-neutral-600'>{article.excerpt}</p>
                      <Button
                        href={`/blog/${article.slug.current}`}
                        aria-label={`Read more: ${article.title}`}
                        className='mt-8'
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
