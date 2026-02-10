import { CollectionConfig } from 'sonicjs';

export const galleryItems: CollectionConfig = {
  slug: 'gallery_items',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'page', type: 'select', options: ['home', 'menu'], required: true },
    { name: 'sortOrder', type: 'number', required: true },
  ],
};
