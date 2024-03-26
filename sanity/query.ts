import { WorkListItem, WorkListItemHomepage } from '@/lib/interface'
import { client } from './lib/client'

export async function getWorks(): Promise<WorkListItem[]> {
  const query = `*[_type == 'work'] {
      client,
      title, 
      slug,
      summary,
      logo,
      date,
      service,
      'testimonialContent': testimonial.content,
      'authorName': testimonial.author->name,
      'authorRole': testimonial.author->role
    }
    `
  const data: WorkListItem[] = await client.fetch(query)
  return data
}

export async function getWorksHomepage(): Promise<WorkListItemHomepage[]> {
  const query = `*[_type == 'work'] | order(date desc)[0...3] {
      client,
      title, 
      slug,
      description,
      logo,
      date
    }`
  const data: WorkListItemHomepage[] = await client.fetch(query)
  return data
}

export async function getWorkDetail(slug: string) {
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

export async function getMoreWorks(slug: string) {
  const query = `
    *[_type == "work" && slug.current != "${slug}"] | order(date desc) [0...2] {
      title,
      slug,
      date,
      description,
    }
    `
  const articles = await client.fetch(query)
  return articles
}
