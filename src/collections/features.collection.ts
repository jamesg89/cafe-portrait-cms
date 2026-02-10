import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'features',
  displayName: 'Features',
  description: 'Homepage feature cards',

  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: 'Title', required: true },
      description: { type: 'textarea', title: 'Description', required: true },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['title', 'description', 'sortOrder']
  },

  listFields: ['title', 'sortOrder'],
  searchFields: ['title', 'description'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
