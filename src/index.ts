/**
 * Cafe Portrait CMS
 *
 * Entry point for the SonicJS headless CMS application
 */

import { createSonicJSApp, registerCollections } from '@sonicjs-cms/core'
import type { SonicJSConfig } from '@sonicjs-cms/core'
import type { Context } from 'hono'

import configCollection from './collections/config.collection'
import homePageCollection from './collections/home-page.collection'
import menuPageCollection from './collections/menu-page.collection'
import menuDataCollection from './collections/menu-data.collection'
import eventsPageCollection from './collections/events-page.collection'
import giftCardsPageCollection from './collections/gift-cards-page.collection'
import contactPageCollection from './collections/contact-page.collection'
import ourStoryPageCollection from './collections/our-story-page.collection'
import galleryCollection from './collections/gallery.collection'

registerCollections([
  configCollection,
  homePageCollection,
  menuPageCollection,
  menuDataCollection,
  eventsPageCollection,
  giftCardsPageCollection,
  contactPageCollection,
  ourStoryPageCollection,
  galleryCollection,
])

// Patch script injected into admin pages.
// Fixes a SonicJS bug where selectMediaFile sets hiddenInput.value directly
// without dispatching a DOM event, so structured-array fields (gallery images,
// etc.) never re-serialize after a media pick and the selection is lost on save.
const MEDIA_PICKER_PATCH = `
<script>
(function () {
  var _patchedFieldId = null;
  function patch() {
    var origOpen = window.openMediaSelector;
    if (origOpen && !origOpen.__patched) {
      window.openMediaSelector = function (fieldId) {
        _patchedFieldId = fieldId;
        return origOpen.call(this, fieldId);
      };
      window.openMediaSelector.__patched = true;
    }
    var origSelect = window.selectMediaFile;
    if (origSelect && !origSelect.__patched) {
      window.selectMediaFile = function (mediaId, mediaUrl, filename) {
        origSelect.call(this, mediaId, mediaUrl, filename);
        if (_patchedFieldId) {
          var el = document.getElementById(_patchedFieldId);
          if (el) el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      window.selectMediaFile.__patched = true;
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patch);
  } else {
    patch();
  }
})();
<\/script>
`

async function injectAdminPatch(c: Context, next: () => Promise<void>) {
  await next()
  if (!c.req.path.startsWith('/admin')) return
  const ct = c.res.headers.get('content-type') ?? ''
  if (!ct.includes('text/html')) return
  // Read the body — this consumes the stream, so always reconstruct the response
  const body = await c.res.text()
  const headers = new Headers(c.res.headers)
  headers.delete('content-length')
  const out = body.includes('</body>')
    ? body.replace('</body>', MEDIA_PICKER_PATCH + '</body>')
    : body
  c.res = new Response(out, { status: c.res.status, headers })
}

const config: SonicJSConfig = {
  collections: {
    autoSync: true
  },
  plugins: {
    directory: './src/plugins',
    autoLoad: false
  },
  middleware: {
    afterAuth: [injectAdminPatch]
  }
}

export default createSonicJSApp(config)
