import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Image as ImageType } from 'sanity'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

import { formatDate } from '@/lib/formatDate'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { getImageDimensions } from '@sanity/asset-utils'
import clsx from 'clsx'
import { Border } from '@/components/Border'
import { PageLinks } from '@/components/PageLinks'

interface Params {
  params: {
    slug: string
  }
}

interface Author {
  name: string
  role: string
  avatar: ImageType
  bio: string
}

// Define type for a single blog object
export interface BlogInterface {
  title: string
  slug: {
    current: string
    _type: string
  }
  date: string
  author: Author
  excerpt: string
  body: any
}

async function getBlog(slug: string) {
  const query = `
  *[_type == "blog" && slug.current == "${slug}"][0] {
    title,
    slug,
    date,
    excerpt,
    body,
    author -> {
        name, 
        role, 
        avatar
    }
  }
  `
  const blog = await client.fetch(query)
  return blog
}

async function getMoreArticles(slug: string) {
  const query = `
  *[_type == "blog" && slug.current != "${slug}"] | order(date desc) [0...2] {
    title,
    slug,
    date,
    excerpt,
  }
  `
  const articles = await client.fetch(query)
  return articles
}

export const revalidate = 60

const page = async ({ params }: Params) => {
  const article: BlogInterface = await getBlog(params?.slug)
  const moreArticles: BlogInterface[] = await getMoreArticles(params?.slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Container as='article' className='mt-24 sm:mt-32 lg:mt-40'>
        <FadeIn>
          <header className='mx-auto flex max-w-5xl flex-col text-center'>
            <h1 className='mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl'>
              {article.title}
            </h1>
            <time dateTime={article.date} className='order-first text-sm text-neutral-950'>
              {formatDate(article.date)}
            </time>
            <p className='mt-6 text-sm font-semibold text-neutral-950'>
              by {article.author.name}, {article.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-24 sm:mt-32 lg:mt-40'>
            <div className='typography'>
              <PortableText value={article?.body} components={myPortableTextComponents} />
            </div>
          </div>
        </FadeIn>
      </Container>

      {moreArticles.length > 0 && (
        <PageLinks className='mt-24 sm:mt-32 lg:mt-40' title='More articles' pages={moreArticles} />
      )}

      <ContactSection />
    </>
  )
}

export default page

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const { width, height } = getImageDimensions(value)
      return (
        <div className='group isolate my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6'>
          <GrayscaleTransitionImage
            src={urlForImage(value)}
            loading='lazy'
            alt={value.alt || ' '}
            sizes='(min-width: 768px) 42rem, 100vw'
            className='aspect-[16/10] w-full object-cover'
            width={width}
            height={height}
            style={{
              // Avoid jumping around with aspect-ratio CSS property
              aspectRatio: width / height,
            }}
          />
        </div>
      )
    },
  },
  block: {
    blockquote: ({ children }: any) => (
      <Border position='left' className={clsx('my-10 pl-8')}>
        <p className='font-display text-sm font-bold uppercase tracking-widest text-neutral-950'>
          Top tip
        </p>
        <div className='mt-4'>
          <p className='text-[16px] leading-7'>{children}</p>
        </div>
      </Border>
    ),
  },
}
