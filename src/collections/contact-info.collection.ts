import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'contact-info',
  displayName: 'Contact Info',
  description: 'Contact information and hours',
  icon: 'phone',

  schema: {
    type: 'object',
    properties: {
      addressLine1: { type: 'string', title: 'Address Line 1', required: true },
      addressLine2: { type: 'string', title: 'Address Line 2' },
      shortAddress: { type: 'string', title: 'Short Address' },
      hours: { type: 'string', title: 'Hours', required: true },
      days: { type: 'string', title: 'Days', required: true },
      hoursNote: { type: 'string', title: 'Hours Note' },
      email: { type: 'email', title: 'Email', required: true },
      mapsUrl: { type: 'url', title: 'Maps URL' },
    },
    required: ['addressLine1', 'hours', 'days', 'email']
  },

  listFields: ['addressLine1', 'email', 'hours'],
  searchFields: ['addressLine1', 'email'],
} satisfies CollectionConfig
