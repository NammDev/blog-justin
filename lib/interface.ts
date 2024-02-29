import type { Image as ImageType } from 'sanity'
import type { Slug } from 'sanity'

export interface Author {
  name: string
  role: string
  avatar: ImageType
  bio: string
}

// Define type for a single blog object
export interface BlogInterface {
  title: string
  slug: Slug
  date: string
  author: Author
  description: string
  body: any
}

export interface BlogListItem extends Omit<BlogInterface, 'body'> {}

// WorkInterface.ts

export interface WorkInterface {
  client: string
  title: string
  slug: Slug
  description: string
  logo: ImageType
  image: ImageType
  date: string
  service: string
  testimonial: {
    author: Author
    content: string
  }
  tags: string[]
  stats: {
    value: string
    label: string
  }[]
  body: any
}

export interface WorkListItem {
  client: string
  title: string
  slug: Slug
  summary: string[]
  logo: ImageType
  date: string
  service: string
  testimonialContent: string
  authorName: string
  authorRole: string
}

export interface WorkListItemHomepage {
  client: string
  title: string
  slug: Slug
  description: string
  logo: ImageType
  date: string
}

export interface CaseStudiesListItem {
  title: string
  slug: Slug
  date: string
  author: Author
  description: string
}
