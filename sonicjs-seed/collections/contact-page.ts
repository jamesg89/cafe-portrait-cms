import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'contact-page',
  displayName: 'Contact Page',
  description: 'Editable text for the contact page (contact info lives in Site Config)',
  icon: 'mail',

  schema: {
    type: 'object',
    properties: {
      pageTitle:                 { type: 'string', title: 'Page Title' },
      heroSubtitle:              { type: 'string', title: 'Hero Script Heading' },
      heroPressQuote:            { type: 'string', title: 'Hero Press Quote (empty = hidden)' },
      heroPressQuoteAttribution: { type: 'string', title: 'Hero Press Quote Attribution' },
      infoSectionHeading:        { type: 'string', title: 'Info Section Heading' },
      locationCardTitle:         { type: 'string', title: 'Location Card Title' },
      hoursCardTitle:            { type: 'string', title: 'Hours Card Title' },
      phoneCardTitle:            { type: 'string', title: 'Phone Card Title' },
      formHeading:               { type: 'string', title: 'Form Heading' },
    },
  },

  listFields: ['pageTitle'],
  searchFields: ['pageTitle'],
} satisfies CollectionConfig
