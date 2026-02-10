import { CollectionConfig } from 'sonicjs';

export const menuCategories: CollectionConfig = {
  slug: 'menu_categories',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'type', type: 'select', options: ['drink', 'food'], required: true },
    { name: 'sortOrder', type: 'number', required: true },
  ],
};
