import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'menu-categories',
  displayName: 'Menu Categories',
  description: 'Menu category groupings',

  schema: {
    type: 'object',
    properties: {
      name:      { type: 'string', title: 'Name', required: true },
      type: {
        type: 'select',
        title: 'Type',
        required: true,
        enum: ['drink', 'food'],
        enumLabels: ['Drink', 'Food'],
      },
      sortOrder: { type: 'number', title: 'Sort Order', required: true },
    },
    required: ['name', 'type', 'sortOrder'],
  },

  listFields: ['name', 'type', 'sortOrder'],
  searchFields: ['name'],
  defaultSort: 'sortOrder',
  defaultSortOrder: 'asc',
} satisfies CollectionConfig
