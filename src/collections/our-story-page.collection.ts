import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'our-story-page',
  displayName: 'Our Story Page',
  description: 'All editable content for the Our Story / about page',
  icon: 'book',

  schema: {
    type: 'object',
    properties: {
      title:                       { type: 'string',   title: 'Title' },
      slug:                        { type: 'string',   title: 'Slug' },
      heroPressQuote:              { type: 'string',   title: 'Hero Press Quote (empty = hidden)' },
      heroPressQuoteAttribution:   { type: 'string',   title: 'Hero Press Quote Attribution' },
      section1ScriptHeading:       { type: 'string',   title: 'Section 1 Script Heading' },
      section1Heading:             { type: 'string',   title: 'Section 1 Heading' },
      section1Para1:               { type: 'textarea', title: 'Section 1 Paragraph 1' },
      section1Para2:               { type: 'textarea', title: 'Section 1 Paragraph 2' },
      section1Image:               { type: 'media',    title: 'Section 1 Image (empty = gradient placeholder)' },
      section2ScriptHeading:       { type: 'string',   title: 'Section 2 Script Heading' },
      section2Heading:             { type: 'string',   title: 'Section 2 Heading' },
      section2Para1:               { type: 'textarea', title: 'Section 2 Paragraph 1' },
      section2Para2:               { type: 'textarea', title: 'Section 2 Paragraph 2' },
      section2Image:               { type: 'media',    title: 'Section 2 Image (empty = gradient placeholder)' },
      section3ScriptHeading:       { type: 'string',   title: 'Section 3 Script Heading' },
      section3Heading:             { type: 'string',   title: 'Section 3 Heading' },
      section3Para1:               { type: 'textarea', title: 'Section 3 Paragraph 1' },
      section3Para2:               { type: 'textarea', title: 'Section 3 Paragraph 2' },
      section3Image:               { type: 'media',    title: 'Section 3 Image (empty = gradient placeholder)' },
      section3CtaText:             { type: 'string',   title: 'Section 3 CTA Text' },
      section3CtaUrl:              { type: 'string',   title: 'Section 3 CTA URL' },
      closingQuote:                { type: 'string',   title: 'Closing Quote' },
    },
  },

  listFields: ['section1Heading'],
  searchFields: ['section1Heading', 'section2Heading', 'section3Heading'],
} satisfies CollectionConfig
