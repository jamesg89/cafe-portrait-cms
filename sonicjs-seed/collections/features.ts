import { CollectionConfig } from 'sonicjs';

export const features: CollectionConfig = {
  slug: 'features',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'sortOrder', type: 'number', required: true },
  ],
};
