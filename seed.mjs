/**
 * Seed script for Cafe Portrait CMS
 * Seeds all 9 singleton collections from sonicjs-seed/seed-data/ into the deployed SonicJS CMS
 *
 * Usage: node seed.mjs
 */

const BASE_URL = 'https://cafe-portrait-cms.jamesgoodwinrealty.workers.dev';

// Collection IDs from the deployed CMS (GET /api/collections to refresh these)
const COLLECTION_IDS = {
  'config':          'col-config-8bd253ab',
  'home-page':       'col-home-page-ba6523e3',
  'menu-page':       'col-menu-page-e38b1245',
  'menu-data':       'col-menu-data-addf7cbd',
  'events-page':     'col-events-page-1c85dc09',
  'gift-cards-page': 'col-gift-cards-page-829cf280',
  'contact-page':    'col-contact-page-9bfa5b27',
  'our-story-page':  'col-our-story-page-f4d2d1c0',
  'gallery':         'col-gallery-5be984be',
};

async function getToken() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@sonicjs.com', password: 'sonicjs!' }),
  });
  const data = await res.json();
  if (!data.token) throw new Error('Login failed: ' + JSON.stringify(data));
  return data.token;
}

async function seedSingleton(token, slug, data) {
  const collectionId = COLLECTION_IDS[slug];
  if (!collectionId) throw new Error(`No collection ID found for slug: ${slug}`);

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  console.log(`\nSeeding ${slug}...`);
  const res = await fetch(`${BASE_URL}/api/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      collectionId,
      title,
      slug,
      status: 'published',
      data,
    }),
  });

  const result = await res.json();
  if (res.status === 409) {
    console.log(`  SKIP (already exists): ${slug}`);
    return null;
  }
  if (!res.ok) {
    console.error(`  FAIL: ${slug}`, result);
    return null;
  }
  console.log(`  OK: ${slug} (${result.data?.id})`);
  return result.data;
}

async function main() {
  console.log('=== Cafe Portrait CMS Seed ===\n');

  console.log('Logging in...');
  const token = await getToken();
  console.log('Authenticated.');

  const { default: config }        = await import('./sonicjs-seed/seed-data/config.json',         { with: { type: 'json' } });
  const { default: homePage }      = await import('./sonicjs-seed/seed-data/home-page.json',       { with: { type: 'json' } });
  const { default: menuPage }      = await import('./sonicjs-seed/seed-data/menu-page.json',       { with: { type: 'json' } });
  const { default: menuData }      = await import('./sonicjs-seed/seed-data/menu-data.json',       { with: { type: 'json' } });
  const { default: eventsPage }    = await import('./sonicjs-seed/seed-data/events-page.json',     { with: { type: 'json' } });
  const { default: giftCardsPage } = await import('./sonicjs-seed/seed-data/gift-cards-page.json', { with: { type: 'json' } });
  const { default: contactPage }   = await import('./sonicjs-seed/seed-data/contact-page.json',    { with: { type: 'json' } });
  const { default: ourStoryPage }  = await import('./sonicjs-seed/seed-data/our-story-page.json',  { with: { type: 'json' } });
  const { default: gallery }       = await import('./sonicjs-seed/seed-data/gallery.json',         { with: { type: 'json' } });

  await seedSingleton(token, 'config',          config);
  await seedSingleton(token, 'home-page',       homePage);
  await seedSingleton(token, 'menu-page',       menuPage);
  await seedSingleton(token, 'menu-data',       menuData);
  await seedSingleton(token, 'events-page',     eventsPage);
  await seedSingleton(token, 'gift-cards-page', giftCardsPage);
  await seedSingleton(token, 'contact-page',    contactPage);
  await seedSingleton(token, 'our-story-page',  ourStoryPage);
  await seedSingleton(token, 'gallery',         gallery);

  console.log('\n=== Seed complete ===');
}

main().catch(console.error);
