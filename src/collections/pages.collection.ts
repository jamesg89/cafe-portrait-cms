import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'pages',
  displayName: 'Pages',
  description: 'Page-level metadata',

  schema: {
    type: 'object',
    properties: {
      slug: { type: 'slug', title: 'URL Slug', required: true },
      title: { type: 'string', title: 'Title', required: true },
      heroSubtitle: { type: 'string', title: 'Hero Subtitle' },
      chefsNote: { type: 'textarea', title: "Chef's Note" },
    },
    required: ['slug', 'title']
  },

  listFields: ['slug', 'title'],
  searchFields: ['slug', 'title'],
} satisfies CollectionConfig
