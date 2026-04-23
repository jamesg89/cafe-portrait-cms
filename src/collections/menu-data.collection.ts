import type { CollectionConfig } from '@sonicjs-cms/core'

function catFields(n: number) {
  const fields: Record<string, unknown> = {
    [`cat${n}Name`]: { type: 'string', title: `Category ${n} — Name` },
    [`cat${n}Type`]: {
      type: 'select',
      title: `Category ${n} — Column`,
      enum: ['drink', 'food'],
      enumLabels: ['Drinks', 'Food'],
    },
  }
  for (let i = 1; i <= 15; i++) {
    fields[`cat${n}Item${i}Name`]        = { type: 'string', title: `Cat ${n} · Item ${i} — Name` }
    fields[`cat${n}Item${i}Description`] = { type: 'string', title: `Cat ${n} · Item ${i} — Description` }
    fields[`cat${n}Item${i}Price`]       = { type: 'string', title: `Cat ${n} · Item ${i} — Price` }
  }
  return fields
}

const categoryProperties = Object.assign(
  {},
  catFields(1),  catFields(2),  catFields(3),  catFields(4),  catFields(5),
  catFields(6),  catFields(7),  catFields(8),  catFields(9),  catFields(10),
)

export default {
  name: 'menu-data',
  displayName: 'Menu',
  description: 'Flat menu: 10 category sections × 15 items each. Leave name empty to hide a section; leave item name empty to hide that row.',
  icon: 'document',

  schema: {
    type: 'object',
    properties: {
      title: { type: 'string', title: 'Title' },
      ...categoryProperties,
    },
  },

  listFields: ['cat1Name', 'cat2Name', 'cat3Name', 'cat4Name'],
  searchFields: ['cat1Name', 'cat2Name', 'cat3Name', 'cat4Name'],
} satisfies CollectionConfig
