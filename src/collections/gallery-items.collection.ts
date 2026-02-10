import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'gallery-items',
  displayName: 'Gallery Items',
  description: 'Gallery tile labels per page',

  schema: {
    type: 'object',
    properties: {
      label: { type: 'string', title: 'Label', required: true },
      page: {
        type: 'select',
        title: 'Page',
        required: true,
        enum: ['home', 'menu'],
        enumLabels: ['Home', 'Menu'],
      },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['label', 'page', 'sortOrder']
  },

  listFields: ['label', 'page', 'sortOrder'],
  searchFields: ['label'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
