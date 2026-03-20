import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'gift-cards-page',
  displayName: 'Gift Cards Page',
  description: 'All editable content for the gift cards page',
  icon: 'gift',

  schema: {
    type: 'object',
    properties: {
      pageTitle:                { type: 'string',   title: 'Page Title' },
      heroSubtitle:             { type: 'string',   title: 'Hero Script Heading' },
      heroDescription:          { type: 'string',   title: 'Hero Description' },
      descriptionScriptHeading: { type: 'string',   title: 'Description Script Heading' },
      descriptionHeading:       { type: 'string',   title: 'Description Heading' },
      description:              { type: 'textarea', title: 'Description' },
      highlight1Label:          { type: 'string',   title: 'Highlight 1 Label' },
      highlight1Sublabel:       { type: 'string',   title: 'Highlight 1 Sublabel' },
      highlight2Label:          { type: 'string',   title: 'Highlight 2 Label' },
      highlight2Sublabel:       { type: 'string',   title: 'Highlight 2 Sublabel' },
      highlight3Label:          { type: 'string',   title: 'Highlight 3 Label' },
      highlight3Sublabel:       { type: 'string',   title: 'Highlight 3 Sublabel' },
      purchaseHeading:          { type: 'string',   title: 'Purchase Heading' },
      purchaseDescription:      { type: 'string',   title: 'Purchase Description' },
      purchaseButtonText:       { type: 'string',   title: 'Purchase Button Text' },
      purchaseButtonUrl:        { type: 'string',   title: 'Purchase Button URL' },
      ctaScriptHeading:         { type: 'string',   title: 'CTA Script Heading' },
      ctaHeading:               { type: 'string',   title: 'CTA Heading' },
      ctaDescription:           { type: 'textarea', title: 'CTA Description' },
      ctaButtonText:            { type: 'string',   title: 'CTA Button Text' },
      ctaButtonUrl:             { type: 'string',   title: 'CTA Button URL' },
    },
  },

  listFields: ['pageTitle'],
  searchFields: ['pageTitle'],
} satisfies CollectionConfig
