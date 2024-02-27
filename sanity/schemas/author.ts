import { Rule } from 'sanity'

export const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Name of author is required'),
    },
    {
      name: 'role',
      title: 'Job Description',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Job of author is required'),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [{ name: 'alt', type: 'string', title: 'Alt', options: { source: 'avatar' } }],
    },
  ],
}
