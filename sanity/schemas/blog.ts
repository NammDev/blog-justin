import { Rule } from 'sanity'

export const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'date',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: (Rule: Rule) => Rule.max(350).error('Max 350 characters'),
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image', fields: [{ name: 'alt', type: 'string', title: 'Alt' }] },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
  ],
}
