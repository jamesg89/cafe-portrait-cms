import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'contact-info',
  displayName: 'Contact Info',
  description: 'Address, hours, phone and contact details shown across the site',
  icon: 'map-pin',

  schema: {
    type: 'object',
    properties: {
      addressLine1: { type: 'string', title: 'Address Line 1' },
      addressLine2: { type: 'string', title: 'Address Line 2' },
      shortAddress: { type: 'string', title: 'Short Address (footer / map pin)' },
      days:         { type: 'string', title: 'Opening Days (e.g. Monday – Sunday)' },
      hours:        { type: 'string', title: 'Opening Hours (e.g. 8:00 AM – 6:00 PM)' },
      hoursNote:    { type: 'string', title: 'Hours Note (e.g. Brunch served all day)' },
      phone:        { type: 'string', title: 'Phone Number' },
      email:        { type: 'string', title: 'Email Address' },
      mapsUrl:      { type: 'url',    title: 'Google Maps URL' },
    },
  },

  listFields: ['addressLine1', 'hours'],
  searchFields: ['addressLine1', 'email'],
} satisfies CollectionConfig
