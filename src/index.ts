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
import contactInfoCollection from './collections/contact-info.collection'
import contactPageCollection from './collections/contact-page.collection'
import ourStoryPageCollection from './collections/our-story-page.collection'
import galleryCollection from './collections/gallery.collection'
import galleryItemsCollection from './collections/gallery-items.collection'

registerCollections([
  configCollection,
  homePageCollection,
  menuPageCollection,
  menuDataCollection,
  eventsPageCollection,
  giftCardsPageCollection,
  contactInfoCollection,
  contactPageCollection,
  ourStoryPageCollection,
  galleryCollection,
  galleryItemsCollection,
])

// Logs failing API write requests so errors are visible in `wrangler tail` and
// the Cloudflare dashboard.  Clones request/response bodies before downstream
// code consumes them to avoid interfering with normal request handling.
async function logApiErrors(c: Context, next: () => Promise<void>) {
  const { method } = c.req
  const path = c.req.path
  const isWrite = (method === 'POST' || method === 'PUT' || method === 'PATCH') && path.startsWith('/api/')

  let reqBody: string | undefined
  if (isWrite) {
    try { reqBody = await c.req.raw.clone().text() } catch { /* ignore */ }
  }

  await next()

  if (!path.startsWith('/api/')) return

  const { status } = c.res
  let resBody: string | undefined
  try { resBody = await c.res.clone().text() } catch { /* ignore */ }

  const isError = status >= 400 || (resBody && (resBody.includes('Failed to') || resBody.includes('"error"')))
  if (isError) {
    console.error('[CMS API Error]', method, path, '| status:', status, '| req:', reqBody, '| res:', resBody)
  }
}

// Middleware that patches the D1 database binding so that undefined values are
// coerced to null before reaching D1's .bind() call.  Cloudflare D1 rejects
// the JavaScript value `undefined` with D1_TYPE_ERROR, but it accepts `null`
// (SQL NULL) just fine.  SonicJS core passes `undefined` for optional system
// fields (e.g. slug, status) that aren't included in every form submission,
// which is the root cause of "Error creating content: D1_TYPE_ERROR".
async function patchD1Undefined(c: Context, next: () => Promise<void>) {
  const env = c.env as Record<string, unknown>
  const db = env?.DB as { prepare?: (q: string) => { bind?: (...a: unknown[]) => { run?: () => Promise<unknown> } } } | undefined
  if (db && typeof db.prepare === 'function') {
    const origPrepare = db.prepare.bind(db)
    db.prepare = (query: string) => {
      const stmt = origPrepare(query)
      if (stmt && typeof stmt.bind === 'function') {
        const origBind = stmt.bind.bind(stmt)
        stmt.bind = (...values: unknown[]) => {
          const coerced = values.map((v) => (v === undefined ? null : v))
          const bound = origBind(...coerced) as Record<string, unknown>
          // Wrap .run() to log D1 write failures with the full SQL and values
          if (bound && typeof bound.run === 'function') {
            const origRun = (bound.run as () => Promise<unknown>).bind(bound)
            bound.run = async () => {
              try {
                return await origRun()
              } catch (err) {
                console.error('[D1 Write Error] SQL:', query, '| values:', JSON.stringify(coerced), '| error:', err)
                throw err
              }
            }
          }
          return bound
        }
      }
      return stmt
    }
  }
  await next()
}

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

// Branding overrides injected into admin pages.
// Replaces the SonicJS wordmark SVG with the Cafe Portrait logo and swaps the
// favicon. The SVG is identified by its unique viewBox attribute so this is
// resilient to markup changes around it.
const BRANDING_PATCH = `
<style>
  /* Hide the SonicJS wordmark SVG */
  svg[viewBox="380 1300 2250 400"] { display: none !important; }
</style>
<script>
(function () {
  function injectLogo() {
    var svgs = document.querySelectorAll('svg[viewBox="380 1300 2250 400"]');
    svgs.forEach(function (svg) {
      if (svg.dataset.branded) return;
      svg.dataset.branded = '1';
      var img = document.createElement('img');
      img.src = '/files/uploads/bbdb35ff-5596-4f7d-bedc-06141174004b.png';
      img.alt = 'Cafe Portrait';
      img.style.cssText = 'height:2rem;width:auto;display:block;';
      svg.parentNode.insertBefore(img, svg);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLogo);
  } else {
    injectLogo();
  }
})();
<\/script>
`

const CAFE_FAVICON = '/files/uploads/f4e8e997-1662-466e-9e00-ad35be4a8eb8.png'

async function injectAdminPatch(c: Context, next: () => Promise<void>) {
  await next()
  if (!c.req.path.startsWith('/admin')) return
  const ct = c.res.headers.get('content-type') ?? ''
  if (!ct.includes('text/html')) return
  // Read the body — this consumes the stream, so always reconstruct the response
  const body = await c.res.text()
  const headers = new Headers(c.res.headers)
  headers.delete('content-length')
  let out = body
  // Swap favicon
  out = out.replace(
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    `<link rel="icon" type="image/png" href="${CAFE_FAVICON}">`
  )
  // Rename browser tab titles
  out = out.replace(/ - SonicJS AI Admin/g, ' - Cafe Portrait CMS')
  // Inject media-picker fix and logo branding before </body>
  if (out.includes('</body>')) {
    out = out.replace('</body>', MEDIA_PICKER_PATCH + BRANDING_PATCH + '</body>')
  }
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
    afterAuth: [logApiErrors, patchD1Undefined, injectAdminPatch]
  }
}

export default createSonicJSApp(config)
