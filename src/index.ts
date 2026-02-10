/**
 * SonicJS Starter Application
 *
 * Entry point for your SonicJS headless CMS application
 */

import { createSonicJSApp, registerCollections } from '@sonicjs-cms/core'
import type { SonicJSConfig } from '@sonicjs-cms/core'

// Import your collection configurations
import blogPostsCollection from './collections/blog-posts.collection'
import siteSettingsCollection from './collections/site-settings.collection'
import contactInfoCollection from './collections/contact-info.collection'
import featuresCollection from './collections/features.collection'
import menuCategoriesCollection from './collections/menu-categories.collection'
import menuItemsCollection from './collections/menu-items.collection'
import galleryItemsCollection from './collections/gallery-items.collection'
import pressQuotesCollection from './collections/press-quotes.collection'
import pagesCollection from './collections/pages.collection'

// Register collections BEFORE creating the app
// This ensures they are synced to the database on startup
registerCollections([
  blogPostsCollection,
  siteSettingsCollection,
  contactInfoCollection,
  featuresCollection,
  menuCategoriesCollection,
  menuItemsCollection,
  galleryItemsCollection,
  pressQuotesCollection,
  pagesCollection,
])

// Application configuration
const config: SonicJSConfig = {
  collections: {
    autoSync: true
  },
  plugins: {
    directory: './src/plugins',
    autoLoad: false  // Set to true to auto-load custom plugins
  }
}

// Create and export the application
export default createSonicJSApp(config)
