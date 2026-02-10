import { CollectionConfig } from 'sonicjs';

export const pressQuotes: CollectionConfig = {
  slug: 'press_quotes',
  fields: [
    { name: 'quote', type: 'text', required: true },
    { name: 'attribution', type: 'text', required: true },
  ],
};
