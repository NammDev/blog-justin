import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import React from 'react'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

import { formatDate } from '@/lib/formatDate'
import { PageLinks } from '@/components/PageLinks'
import { BlogInterface } from '@/lib/interface'
import { myPortableTextComponents } from '@/lib/myPortableTextComponents'

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

const page = async ({
  params,
}: {
  params: {
    slug: string
  }
}) => {
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
