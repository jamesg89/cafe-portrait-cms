/**
 * Seed script for Cafe Portrait CMS
 * Seeds all content from sonicjs-seed/seed-data/ into the deployed SonicJS CMS
 */

const BASE_URL = 'https://cafe-portrait-cms.jamesgoodwinrealty.workers.dev';

// Collection IDs from the deployed CMS
const COLLECTION_IDS = {
  'site-settings': 'col-site-settings-27f91382',
  'contact-info': 'col-contact-info-569a4f08',
  'features': 'col-features-5caffb6b',
  'menu-categories': 'col-menu-categories-a3b37a4f',
  'menu-items': 'col-menu-items-786f58b1',
  'gallery-items': 'col-gallery-items-8a158df1',
  'press-quotes': 'col-press-quotes-d97aa44a',
  'pages': 'pages-collection',
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

async function createContent(token, collectionId, title, slug, data) {
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
    console.log(`  SKIP (exists): ${title}`);
    return null;
  }
  if (!res.ok) {
    console.error(`  FAIL: ${title}`, result);
    return null;
  }
  console.log(`  OK: ${title} (${result.data?.id})`);
  return result.data;
}

async function seedSingleton(token, collectionName, jsonData) {
  console.log(`\nSeeding ${collectionName}...`);
  const collectionId = COLLECTION_IDS[collectionName];
  const title = collectionName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return createContent(token, collectionId, title, collectionName, jsonData);
}

async function seedCollection(token, collectionName, jsonArray) {
  console.log(`\nSeeding ${collectionName} (${jsonArray.length} items)...`);
  const collectionId = COLLECTION_IDS[collectionName];
  const results = [];
  for (const item of jsonArray) {
    const title = item.title || item.name || item.label || item.quote || item.slug || 'Untitled';
    const slug = (item.slug || item.id || title)
      .toString().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    // Remove id field from data (it's a seed reference, not CMS data)
    const { id, ...data } = item;
    const result = await createContent(token, collectionId, title, slug, data);
    if (result) results.push({ ...result, seedId: item.id });
  }
  return results;
}

async function main() {
  console.log('=== Cafe Portrait CMS Seed ===\n');

  // Login
  console.log('Logging in...');
  const token = await getToken();
  console.log('Authenticated.');

  // Import seed data
  const { default: siteSettings } = await import('./sonicjs-seed/seed-data/site-settings.json', { with: { type: 'json' } });
  const { default: contactInfo } = await import('./sonicjs-seed/seed-data/contact-info.json', { with: { type: 'json' } });
  const { default: features } = await import('./sonicjs-seed/seed-data/features.json', { with: { type: 'json' } });
  const { default: menuCategories } = await import('./sonicjs-seed/seed-data/menu-categories.json', { with: { type: 'json' } });
  const { default: menuItems } = await import('./sonicjs-seed/seed-data/menu-items.json', { with: { type: 'json' } });
  const { default: galleryItems } = await import('./sonicjs-seed/seed-data/gallery-items.json', { with: { type: 'json' } });
  const { default: pressQuotes } = await import('./sonicjs-seed/seed-data/press-quotes.json', { with: { type: 'json' } });
  const { default: pages } = await import('./sonicjs-seed/seed-data/pages.json', { with: { type: 'json' } });

  // Seed singletons
  await seedSingleton(token, 'site-settings', siteSettings);
  await seedSingleton(token, 'contact-info', contactInfo);

  // Seed categories first (menu items reference them)
  const categoryResults = await seedCollection(token, 'menu-categories', menuCategories);

  // Build category ID mapping (seed id -> CMS id)
  const categoryMap = {};
  for (const cat of categoryResults) {
    if (cat.seedId) {
      categoryMap[cat.seedId] = cat.id;
    }
  }
  console.log('\nCategory ID mapping:', categoryMap);

  // Seed menu items with resolved category references
  const resolvedMenuItems = menuItems.map(item => ({
    ...item,
    category: categoryMap[item.category] || item.category,
  }));
  await seedCollection(token, 'menu-items', resolvedMenuItems);

  // Seed remaining collections
  await seedCollection(token, 'features', features);
  await seedCollection(token, 'gallery-items', galleryItems);
  await seedCollection(token, 'press-quotes', pressQuotes);
  await seedCollection(token, 'pages', pages);

  console.log('\n=== Seed complete ===');
}

main().catch(console.error);
