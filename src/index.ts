/**
 * Cafe Portrait CMS
 *
 * Entry point for the SonicJS headless CMS application
 */

import { createSonicJSApp, registerCollections } from '@sonicjs-cms/core'
import type { SonicJSConfig } from '@sonicjs-cms/core'

import configCollection from './collections/config.collection'
import homePageCollection from './collections/home-page.collection'
import menuPageCollection from './collections/menu-page.collection'
import menuCategoriesCollection from './collections/menu-categories.collection'
import menuItemsCollection from './collections/menu-items.collection'
import eventsPageCollection from './collections/events-page.collection'
import giftCardsPageCollection from './collections/gift-cards-page.collection'
import contactPageCollection from './collections/contact-page.collection'
import ourStoryPageCollection from './collections/our-story-page.collection'
import galleryCollection from './collections/gallery.collection'

registerCollections([
  configCollection,
  homePageCollection,
  menuPageCollection,
  menuCategoriesCollection,
  menuItemsCollection,
  eventsPageCollection,
  giftCardsPageCollection,
  contactPageCollection,
  ourStoryPageCollection,
  galleryCollection,
])

const config: SonicJSConfig = {
  collections: {
    autoSync: true
  },
  plugins: {
    directory: './src/plugins',
    autoLoad: false
  }
}

export default createSonicJSApp(config)
