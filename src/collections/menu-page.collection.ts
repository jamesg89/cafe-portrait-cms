import type { CollectionConfig } from '@sonicjs-cms/core'

export default {
  name: 'menu-page',
  displayName: 'Menu Page',
  description: 'Editable text for the menu page header and chef\'s note',
  icon: 'document',

  schema: {
    type: 'object',
    properties: {
      title:                  { type: 'string',   title: 'Title' },
      pageTitle:              { type: 'string',   title: 'Page Title' },
      heroH1:                 { type: 'string',   title: 'Hero H1' },
      heroSubtitle:           { type: 'string',   title: 'Hero Subtitle' },
      drinksHeading:          { type: 'string',   title: 'Drinks Column Heading' },
      foodHeading:            { type: 'string',   title: 'Food Column Heading' },
      chefsNoteScriptHeading: { type: 'string',   title: "Chef's Note Script Heading" },
      chefsNote:              { type: 'textarea', title: "Chef's Note (empty = hidden)" },
    },
  },

  listFields: ['pageTitle'],
  searchFields: ['pageTitle'],
} satisfies CollectionConfig
