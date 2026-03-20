import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'gallery',
  displayName: 'Gallery',
  description: 'Shared image gallery, filtered by page field',

  schema: {
    type: 'object',
    properties: {
      image:     { type: 'media',  title: 'Image (empty = gradient placeholder)' },
      label:     { type: 'string', title: 'Label' },
      page: {
        type: 'select',
        title: 'Page',
        required: true,
        enum: ['home', 'menu'],
        enumLabels: ['Home', 'Menu'],
      },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['page', 'sortOrder'],
  },

  listFields: ['label', 'page', 'sortOrder'],
  searchFields: ['label'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
