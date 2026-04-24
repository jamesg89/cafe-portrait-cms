import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'gallery-items',
  displayName: 'Gallery Items',
  description: 'Gallery images for home and menu pages',
  icon: 'photo',

  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: 'Title', required: true },
      slug:  { type: 'string', title: 'Slug' },
      image: { type: 'media', title: 'Image' },
      page: {
        type: 'select',
        title: 'Page',
        required: true,
        enum: ['home', 'menu'],
        enumLabels: ['Home Page', 'Menu Page'],
      },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['title', 'page', 'sortOrder'],
  },

  // Sort by page first (home → menu), then by sort order within each page.
  // This groups all Home Page items together above all Menu Page items in the list view.
  listFields: ['page', 'image', 'title', 'sortOrder'],
  searchFields: ['label'],
  defaultSort: 'page',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
