import type { Image as ImageType } from 'sanity'

export interface Author {
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

export interface BlogListItem extends Omit<BlogInterface, 'body'> {}
