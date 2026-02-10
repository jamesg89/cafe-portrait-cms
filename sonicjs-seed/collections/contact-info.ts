import { CollectionConfig } from 'sonicjs';

export const contactInfo: CollectionConfig = {
  slug: 'contact_info',
  singleton: true,
  fields: [
    { name: 'addressLine1', type: 'text', required: true },
    { name: 'addressLine2', type: 'text' },
    { name: 'shortAddress', type: 'text' },
    { name: 'hours', type: 'text', required: true },
    { name: 'days', type: 'text', required: true },
    { name: 'hoursNote', type: 'text' },
    { name: 'email', type: 'text', required: true },
    { name: 'mapsUrl', type: 'text' },
  ],
};
