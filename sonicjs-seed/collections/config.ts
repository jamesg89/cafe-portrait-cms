import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'config',
  displayName: 'Site Config',
  description: 'Site-wide settings — logo, footer, contact details, social links',
  icon: 'cog',

  schema: {
    type: 'object',
    properties: {
      logoTextTop:        { type: 'string',   title: 'Logo Text Top' },
      logoTextBottom:     { type: 'string',   title: 'Logo Text Bottom' },
      siteName:           { type: 'string',   title: 'Site Name' },
      metaDescription:    { type: 'textarea', title: 'Meta Description' },
      tagline:            { type: 'string',   title: 'Tagline' },
      footerAddressLine1: { type: 'string',   title: 'Footer Address Line 1' },
      footerAddressLine2: { type: 'string',   title: 'Footer Address Line 2' },
      footerShortAddress: { type: 'string',   title: 'Footer Short Address' },
      footerPhone:        { type: 'string',   title: 'Footer Phone' },
      footerEmail:        { type: 'string',   title: 'Footer Email' },
      footerDays:         { type: 'string',   title: 'Footer Days' },
      footerHours:        { type: 'string',   title: 'Footer Hours' },
      footerHoursNote:    { type: 'string',   title: 'Footer Hours Note' },
      footerMapsUrl:      { type: 'url',      title: 'Footer Maps URL' },
      footerFacebookUrl:  { type: 'url',      title: 'Footer Facebook URL' },
      footerInstagramUrl: { type: 'url',      title: 'Footer Instagram URL' },
    },
  },

  listFields: ['siteName', 'tagline'],
  searchFields: ['siteName'],
} satisfies CollectionConfig
