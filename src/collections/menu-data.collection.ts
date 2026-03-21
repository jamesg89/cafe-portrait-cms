import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'menu-data',
  displayName: 'Menu',
  description: 'All menu categories and items — add, remove, and reorder inline',
  icon: 'document',

  schema: {
    type: 'object',
    properties: {
      title:      { type: 'string', title: 'Title' },
      categories: {
        type: 'array',
        title: 'Categories',
        items: {
          type: 'object',
          title: 'Category',
          properties: {
            name: {
              type: 'string',
              title: 'Category Name',
              required: true,
            },
            type: {
              type: 'select',
              title: 'Column',
              required: true,
              enum: ['drink', 'food'],
              enumLabels: ['Drinks', 'Food'],
            },
            items: {
              type: 'array',
              title: 'Items',
              items: {
                type: 'object',
                title: 'Item',
                properties: {
                  name:        { type: 'string',   title: 'Name',        required: true },
                  description: { type: 'string',   title: 'Description' },
                  price:       { type: 'string',   title: 'Price (e.g. "$5.50")' },
                },
              },
            },
          },
        },
      },
    },
  },

  listFields: ['categories'],
} satisfies CollectionConfig
