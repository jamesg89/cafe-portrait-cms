import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'site-settings',
  displayName: 'Site Settings',
  description: 'Global site configuration',
  icon: 'cog',

  schema: {
    type: 'object',
    properties: {
      siteName: { type: 'string', title: 'Site Name', required: true },
      tagline: { type: 'string', title: 'Tagline' },
      metaDescription: { type: 'textarea', title: 'Meta Description' },
      logoTextTop: { type: 'string', title: 'Logo Text Top', required: true },
      logoTextBottom: { type: 'string', title: 'Logo Text Bottom', required: true },
    },
    required: ['siteName', 'logoTextTop', 'logoTextBottom']
  },

  listFields: ['siteName', 'tagline'],
  searchFields: ['siteName'],
} satisfies CollectionConfig
