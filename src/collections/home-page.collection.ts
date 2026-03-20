import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'home-page',
  displayName: 'Home Page',
  description: 'All editable content for the home page',
  icon: 'home',

  schema: {
    type: 'object',
    properties: {
      pageTitle:                 { type: 'string',   title: 'Page Title' },
      heroSubtitle:              { type: 'string',   title: 'Hero Subtitle' },
      heroCtaText:               { type: 'string',   title: 'Hero CTA Button Text' },
      heroCtaUrl:                { type: 'string',   title: 'Hero CTA Button URL' },
      heroImage:                 { type: 'media',    title: 'Hero Image' },
      feature1Title:             { type: 'string',   title: 'Feature 1 Title' },
      feature1Description:       { type: 'textarea', title: 'Feature 1 Description' },
      feature2Title:             { type: 'string',   title: 'Feature 2 Title' },
      feature2Description:       { type: 'textarea', title: 'Feature 2 Description' },
      feature3Title:             { type: 'string',   title: 'Feature 3 Title' },
      feature3Description:       { type: 'textarea', title: 'Feature 3 Description' },
      gallerySectionScriptHeading: { type: 'string', title: 'Gallery Section Script Heading' },
      gallerySectionHeading:     { type: 'string',   title: 'Gallery Section Heading' },
      pressQuote:                { type: 'string',   title: 'Press Quote' },
      pressQuoteAttribution:     { type: 'string',   title: 'Press Quote Attribution' },
      ctaScriptHeading:          { type: 'string',   title: 'CTA Script Heading' },
      ctaHeading:                { type: 'string',   title: 'CTA Heading' },
      ctaPrimaryButtonText:      { type: 'string',   title: 'CTA Primary Button Text' },
      ctaPrimaryButtonUrl:       { type: 'string',   title: 'CTA Primary Button URL' },
      ctaSecondaryButtonText:    { type: 'string',   title: 'CTA Secondary Button Text' },
      ctaSecondaryButtonUrl:     { type: 'string',   title: 'CTA Secondary Button URL' },
    },
  },

  listFields: ['pageTitle'],
  searchFields: ['pageTitle', 'heroSubtitle'],
} satisfies CollectionConfig
