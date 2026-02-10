import { CollectionConfig } from 'sonicjs';

export const menuItems: CollectionConfig = {
  slug: 'menu_items',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'text', required: true },
    { name: 'category', type: 'relationship', relationTo: 'menu_categories', required: true },
    { name: 'sortOrder', type: 'number', required: true },
  ],
};
