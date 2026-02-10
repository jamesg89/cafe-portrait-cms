import { CollectionConfig } from 'sonicjs';

export const pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'slug', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'chefsNote', type: 'textarea' },
  ],
};
