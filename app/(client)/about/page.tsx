import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { client } from '@/sanity/lib/client'
import { BlogInterface } from '@/lib/interface'
import { urlForImage } from '@/sanity/lib/image'

function Culture() {
  return (
    <div className='mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32'>
      <SectionIntro
        eyebrow='Our culture'
        title='Balance your passion with your passion for life.'
        invert
      >
        <p>We are a group of like-minded people who share the same core values.</p>
      </SectionIntro>
      <Container className='mt-16'>
        <GridList>
          <GridListItem title='Loyalty' invert>
            Our team has been with us since the beginning because none of them are allowed to have
            LinkedIn profiles.
          </GridListItem>
          <GridListItem title='Trust' invert>
            We don’t care when our team works just as long as they are working every waking second.
          </GridListItem>
          <GridListItem title='Compassion' invert>
            You never know what someone is going through at home and we make sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

function Team({ team }: { team: any }) {
  return (
    <Container className='mt-24 sm:mt-32 lg:mt-40'>
      <div className='space-y-24'>
        {team.map((group: any) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className='grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8'>
              <FadeIn>
                <h2 className='font-display text-2xl font-semibold text-neutral-950'>
                  {group.title}
                </h2>
              </FadeIn>
              <div className='lg:col-span-3'>
                <ul
                  role='list'
                  className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8'
                >
                  {group.people.map((person: any) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className='group relative overflow-hidden rounded-3xl bg-neutral-100'>
                          <Image
                            alt={person.name}
                            src={urlForImage(person.image)}
                            loading='lazy'
                            width={1800}
                            height={1800}
                            className='h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105'
                          />
                          <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6'>
                            <p className='font-display text-base/6 font-semibold tracking-wide text-white'>
                              {person.name}
                            </p>
                            <p className='mt-2 text-sm text-white'>{person.role}</p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

async function getMoreArticles(slug?: string) {
  const query = `
    *[_type == 'blog'] | order(date desc) [0..1] {
        title, 
        slug, 
        date, 
        description,
    }  
    `
  const articles = await client.fetch(query)
  return articles
}

async function getTeam() {
  const query = `
    *[_type == 'author' && (type in ["leadership", "member"])] {
      name,
      role,
      avatar,
      type
    }
  `
  let team = await client.fetch(query)

  // convert to desire format
  team = team.reduce((acc: any, person: any) => {
    if (!acc[person.type]) {
      acc[person.type] = []
    }
    acc[person.type].push({
      name: person.name,
      role: person.role,
      image: person.avatar, // Assuming 'asset' contains the image URL
    })
    return acc
  }, {})

  team = Object.keys(team).map((type) => ({
    title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter of the type
    people: team[type],
  }))
  return team
}

export default async function About() {
  const moreArticles: BlogInterface[] = await getMoreArticles()
  const team = await getTeam()

  return (
    <>
      <PageIntro eyebrow='About us' title='Our strength is collaboration'>
        <p>
          We believe that our strength lies in our collaborative approach, which puts our clients at
          the center of everything we do.
        </p>
        <div className='mt-10 max-w-2xl space-y-6 text-base'>
          <p>
            Studio was started by three friends who noticed that developer studios were charging
            clients double what an in-house team would cost. Since the beginning, we have been
            committed to doing things differently by charging triple instead.
          </p>
          <p>
            At Studio, we’re more than just colleagues — we’re a family. This means we pay very
            little and expect people to work late. We want our employees to bring their whole selves
            to work. In return, we just ask that they keep themselves there until at least 6:30pm.
          </p>
        </div>
      </PageIntro>
      <Container className='mt-16'>
        <StatList>
          <StatListItem value='35' label='Underpaid employees' />
          <StatListItem value='52' label='Placated clients' />
          <StatListItem value='$25M' label='Invoices billed' />
        </StatList>
      </Container>

      <Culture />

      <Team team={team} />

      <PageLinks
        className='mt-24 sm:mt-32 lg:mt-40'
        title='From the blog'
        intro='Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design.'
        pages={moreArticles}
      />

      <ContactSection />
    </>
  )
}
