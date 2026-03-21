import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'gallery',
  displayName: 'Gallery',
  description: 'Site image gallery — add or remove images for the home and menu pages',
  icon: 'photo',

  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: 'Gallery Title' },
      homeImages: {
        type: 'array',
        title: 'Home Page Images',
        items: {
          type: 'object',
          title: 'Image',
          properties: {
            image: { type: 'media', title: 'Image' },
          },
        },
      },
      menuImages: {
        type: 'array',
        title: 'Menu Page Images',
        items: {
          type: 'object',
          title: 'Image',
          properties: {
            image: { type: 'media', title: 'Image' },
          },
        },
      },
    },
  },

  listFields: ['homeImages', 'menuImages'],
} satisfies CollectionConfig
