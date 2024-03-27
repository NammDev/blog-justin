import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import { WorkListItemHomepage } from '@/lib/interface'
import { urlForImage } from '@/sanity/lib/image'
import { SectionIntro } from '@/components/SectionIntro'
import { getWorksHomepage } from '@/sanity/query'

const clients = [
  ['Phobia', logoPhobiaLight],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <div className='mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56'>
      <Container>
        <FadeIn className='flex items-center gap-x-8'>
          <h2 className='text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left'>
            We’ve worked with hundreds of amazing people
          </h2>
          <div className='h-px flex-auto bg-neutral-800' />
        </FadeIn>
        <FadeInStagger faster>
          <ul role='list' className='mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4'>
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({ caseStudies }: { caseStudies: WorkListItemHomepage[] }) {
  return (
    <>
      <SectionIntro
        title='Leveraging Technology for Financial Empowerment'
        className='mt-24 sm:mt-32 lg:mt-40'
      >
        <p>
          We harness the power of technology to address financial challenges, recognizing its dual
          role as both solution and challenge. Embracing this duality, we navigate towards financial
          empowerment.
        </p>
      </SectionIntro>
      <Container className='mt-16'>
        <FadeInStagger className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.slug.current} className='flex'>
              <article className='relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8'>
                <h3>
                  <Link href={`/work/${caseStudy.slug.current}`}>
                    <span className='absolute inset-0 rounded-3xl' />
                    <Image
                      src={urlForImage(caseStudy.logo)}
                      alt={caseStudy.client}
                      className='h-16 w-16'
                      unoptimized
                      width={36}
                      height={36}
                    />
                  </Link>
                </h3>
                <p className='mt-6 flex gap-x-2 text-sm text-neutral-950'>
                  <time dateTime={caseStudy.date} className='font-semibold'>
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className='text-neutral-300' aria-hidden='true'>
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className='mt-6 font-display text-2xl font-semibold text-neutral-950'>
                  {caseStudy.title}
                </p>
                <p className='mt-4 text-base text-neutral-600'>{caseStudy.description}</p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow='Services'
        title='Our guiding principles towards excellence and client satisfaction'
        className='mt-24 sm:mt-32 lg:mt-40'
      >
        <p>
          At Mirae Asset, we uphold a commitment to integrity, innovation, and client-centricity.
          Through transparent practices and personalized solutions, we empower individuals to
          achieve their financial goals with confidence
        </p>
      </SectionIntro>
      <Container className='mt-16'>
        <div className='lg:flex lg:items-center lg:justify-end'>
          <div className='flex justify-center lg:w-1/2 lg:justify-end lg:pr-12'>
            <FadeIn className='w-[33.75rem] flex-none lg:w-[45rem]'>
              <StylizedImage
                src={imageLaptop}
                sizes='(min-width: 1024px) 41rem, 31rem'
                className='justify-center lg:justify-end'
              />
            </FadeIn>
          </div>
          <List className='mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4'>
            <ListItem title='Sensible'>
              Mirae Asset always provides customers with reliable information. As a result,
              customers can make the most sensible decisions in managing their finances.
            </ListItem>
            <ListItem title='Understanding'>
              In all of its products and services, Mirae Asset consistently emphasizes the power of
              understanding - understanding oneself and understanding the external environment.
              Financial autonomy stems from understanding.
            </ListItem>
            <ListItem title='Action'>
              Mirae Asset pursues a doable mindset - Instead of waiting for certain external
              conditions, we encourage you to take action immediately to gradually reach your
              financial goals.
            </ListItem>
            <ListItem title='Empowerment'>
              At Mirae Asset, we believe in empowering individuals to take control of their
              financial futures. Through our comprehensive resources and guidance, we empower you to
              make informed decisions and navigate the complexities of financial management with
              confidence.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description: 'We are developer studio working at the intersection of design and technology.',
}

export default async function Home() {
  let caseStudies = await getWorksHomepage()
  // get case studies from sanity for homepage
  return (
    <>
      <Container className='mt-24 sm:mt-32 md:mt-56'>
        <FadeIn className='max-w-3xl'>
          <h1 className='font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl'>
            Improve your own financial capacity
          </h1>
          <p className='mt-6 text-xl text-neutral-600'>
            Mirae Asset is a professional and trustworthy provider of training and investment
            solutions for individuals. All products of Mirae Asset aim to support customers in
            enhancing their personal financial capabilities, achieving financial peace of mind, and
            empowering them to design a meaningful and happy life.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className='mt-24 sm:mt-32 lg:mt-40'
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The Mirae Asset team surpassed expectations during onboarding, ingeniously accessing the
        user&apos;s microphone without intrusive permission dialogs. Their professional solutions
        empower individuals to take control of their finances, improving lives.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
