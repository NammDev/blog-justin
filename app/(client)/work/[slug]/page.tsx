import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { BlogListItem, WorkInterface } from '@/lib/interface'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from '@/lib/myPortableTextComponents'
import { formatDate } from '@/lib/formatDate'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlForImage } from '@/sanity/lib/image'
import { SanityImageAsset } from '@sanity/image-url/lib/types/types'
import { TagList, TagListItem } from '@/components/TagList'
import { BlockquoteWithImage, BlockquoteWithoutImage } from '@/components/Blockquote'
import clsx from 'clsx'
import { StatList, StatListItem } from '@/components/StatList'

async function getCaseStudy(slug: string) {
  const query = `
  *[_type == "work" && slug.current == "${slug}"][0] {
    client,
    title,
    slug,
    description,
    logo,
    image,
    date,
    service,
    testimonial {
      content,
      author -> {
        name,
        role,
        avatar
      }
    },
    tags,
    stats,
    body
  }
  `
  const blog = await client.fetch(query)
  return blog
}

// async function getMoreCaseStudies(slug: string) {
//   const query = `
//   *[_type == "blog" && slug.current != "${slug}"] | order(date desc) [0...2] {
//     title,
//     slug,
//     date,
//     excerpt,
//   }
//   `
//   const articles = await client.fetch(query)
//   return articles
// }

export const revalidate = 60

export default async function CaseStudyLayout({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const caseStudy: WorkInterface = await getCaseStudy(params?.slug)

  console.log(caseStudy.stats)

  const { width, height } = getImageDimensions(caseStudy.image as SanityImageAsset)

  return (
    <>
      <article className='mt-24 sm:mt-32 lg:mt-40'>
        <header>
          <PageIntro eyebrow='Case Study' title={caseStudy.title} centered>
            <p>{caseStudy.description}</p>
          </PageIntro>

          <FadeIn>
            <div className='mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40'>
              <Container>
                <div className='mx-auto max-w-5xl'>
                  <dl className='-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3'>
                    <div className='border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0'>
                      <dt className='font-semibold'>Client</dt>
                      <dd>{caseStudy.client}</dd>
                    </div>
                    <div className='border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0'>
                      <dt className='font-semibold'>Year</dt>
                      <dd>
                        <time dateTime={caseStudy.date}>
                          {/* {formatDate(caseStudy.date)} */}
                          2023
                        </time>
                      </dd>
                    </div>
                    <div className='border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0'>
                      <dt className='font-semibold'>Service</dt>
                      <dd>{caseStudy.service}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className='border-y border-neutral-200 bg-neutral-100'>
              <div className='-my-px mx-auto max-w-[76rem] bg-neutral-200'>
                <GrayscaleTransitionImage
                  src={urlForImage(caseStudy.image)}
                  alt={caseStudy.image.alt || ' '}
                  quality={90}
                  className='w-full'
                  sizes='(min-width: 1216px) 76rem, 100vw'
                  priority
                  width={width}
                  height={height}
                  style={{
                    aspectRatio: width / height,
                  }}
                  blurWidth={8}
                  blurHeight={7}
                />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className='mt-24 sm:mt-32 lg:mt-40'>
          <FadeIn>
            <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0'>
              <div className='typography'>
                <PortableText value={caseStudy?.body} components={myPortableTextComponents} />
              </div>
              <TagList className={'my-6'}>
                {caseStudy.tags.map((tag) => (
                  <TagListItem key={tag}>{tag}</TagListItem>
                ))}
              </TagList>
              <BlockquoteWithImage
                author={{
                  name: caseStudy.testimonial.author.name,
                  role: caseStudy.testimonial.author.role,
                }}
                image={caseStudy.testimonial.author.avatar}
                className={clsx('my-32')}
              >
                {caseStudy.testimonial.content}
              </BlockquoteWithImage>
              <StatList className={clsx('my-32 !max-w-none')}>
                {caseStudy.stats.map((stat, i) => (
                  <StatListItem key={i} label={stat.label} value={stat.value} />
                ))}
              </StatList>
            </div>
          </FadeIn>
        </Container>
      </article>

      {/* {moreCaseStudies.length > 0 && (
        <PageLinks
          className='mt-24 sm:mt-32 lg:mt-40'
          title='More case studies'
          pages={moreCaseStudies}
        />
      )} */}

      <ContactSection />
    </>
  )
}
