import { CollectionConfig } from 'sonicjs';

export const siteSettings: CollectionConfig = {
  slug: 'site_settings',
  singleton: true,
  fields: [
    { name: 'siteName', type: 'text', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    { name: 'logoTextTop', type: 'text', required: true },
    { name: 'logoTextBottom', type: 'text', required: true },
  ],
};
