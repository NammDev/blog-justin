export interface Author {
  name: string
  role: string
  image: {
    alt: string
    asset: {
      _ref: string
    }
  }
}

// Define type for a single blog object
export interface Blog {
  title: string
  href: {
    current: string
  }
  date: string
  author: Author
  body: any
  excerpt: string
}
