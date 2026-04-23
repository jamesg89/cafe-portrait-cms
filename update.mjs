/**
 * Update script for Cafe Portrait CMS
 * Updates existing singleton records in the deployed SonicJS CMS.
 *
 * Usage: node update.mjs
 *
 * What it updates:
 *  - our-story-page : new story content (4 paragraphs mapped across 3 sections)
 *  - events-page    : adds Event Type 4 fields to existing record
 *  - contact-page   : patches record with title + slug to fix "Failed to update" error
 */

const BASE_URL = 'https://cafe-portrait-cms.jamesgoodwinrealty.workers.dev';

const COLLECTION_IDS = {
  'our-story-page':  'col-our-story-page-f4d2d1c0',
  'events-page':     'col-events-page-1c85dc09',
  'contact-page':    'col-contact-page-9bfa5b27',
  'menu-data':       'col-menu-data-addf7cbd',
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

async function getRecord(token, collectionId) {
  const res = await fetch(`${BASE_URL}/api/content?collectionId=${collectionId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  const items = data?.data?.items ?? data?.data ?? data?.items ?? [];
  if (!items.length) throw new Error(`No records found for collection ${collectionId}`);
  return items[0];
}

async function updateRecord(token, id, payload) {
  const res = await fetch(`${BASE_URL}/api/content/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(`Update failed for ${id}: ` + JSON.stringify(result));
  return result;
}

async function main() {
  console.log('=== Cafe Portrait CMS Update ===\n');

  console.log('Logging in...');
  const token = await getToken();
  console.log('Authenticated.\n');

  // ── Our Story Page ────────────────────────────────────────────────────────
  console.log('Fetching our-story-page record...');
  const ourStoryRecord = await getRecord(token, COLLECTION_IDS['our-story-page']);
  console.log(`  Found: ${ourStoryRecord.id}`);

  const ourStoryData = {
    heroPressQuote: "Vancouver's New Cafe Portrait Is A Dream Come True For Art Lovers",
    heroPressQuoteAttribution: '604NOW',
    section1ScriptHeading: 'How It Started',
    section1Heading: 'A Vision Born From Passion',
    section1Para1: "At Cafe Portrait, every detail begins with a memory. Growing up, I spent countless hours in my father, Engin Dalyanci's art studio—sitting in a rocking chair, listening to jazz, and watching the quiet rhythm of his brush strokes. From that small corner, the world felt simple and whole. His studio was my playground; the colours brought me joy, and every now and then, I would paint alongside him, not realizing those moments were shaping something much bigger.",
    section1Para2: "At the same time, I was falling in love with my mother's cooking—the warmth, the generosity, the way food could gather people without effort. Cafe Portrait became the meeting place of those two worlds. A space where my father's art and my mother's kitchen could exist under the same roof, not just for me, but to be shared with others.",
    section1Image: ourStoryRecord.data?.section1Image ?? '',
    section2ScriptHeading: 'A Gathering Place',
    section2Heading: 'A Home Away From Home',
    section2Para1: "Over time, it became something even more meaningful—a home away from home. Not just for us, but for everyone who walks through our doors. We welcome guests from all around the world, speaking different languages, carrying different stories. And even when words fall short, something else takes over. At Cafe Portrait, people find common ground through my father's art—pausing in front of a painting, sharing a glance, or simply sitting in the same space, connected without needing to explain.",
    section2Para2: '',
    section2Image: ourStoryRecord.data?.section2Image ?? '',
    section3ScriptHeading: 'Our Promise',
    section3Heading: 'More Than A Café',
    section3Para1: "What we've created is more than a café. It's a reflection of where I come from, and an invitation into it—where art hangs with intention, meals are made to be felt as much as tasted, and strangers, more often than not, leave feeling like they've been somewhere familiar all along.",
    section3Para2: '',
    section3Image: ourStoryRecord.data?.section3Image ?? '',
    section3CtaText: ourStoryRecord.data?.section3CtaText ?? 'View Our Full Menu',
    section3CtaUrl: ourStoryRecord.data?.section3CtaUrl ?? '/menu',
    closingQuote: ourStoryRecord.data?.closingQuote ?? 'Something to eat and drink for every mood, and an art space to leave you inspired.',
  };

  await updateRecord(token, ourStoryRecord.id, {
    collectionId: COLLECTION_IDS['our-story-page'],
    title: ourStoryRecord.title ?? 'Our Story Page',
    slug: ourStoryRecord.slug ?? 'our-story-page',
    status: 'published',
    data: ourStoryData,
  });
  console.log('  our-story-page updated.\n');

  // ── Events Page ───────────────────────────────────────────────────────────
  console.log('Fetching events-page record...');
  const eventsRecord = await getRecord(token, COLLECTION_IDS['events-page']);
  console.log(`  Found: ${eventsRecord.id}`);

  const eventsData = {
    ...eventsRecord.data,
    eventType4Title: eventsRecord.data?.eventType4Title ?? '',
    eventType4Description: eventsRecord.data?.eventType4Description ?? '',
  };

  await updateRecord(token, eventsRecord.id, {
    collectionId: COLLECTION_IDS['events-page'],
    title: eventsRecord.title ?? 'Events Page',
    slug: eventsRecord.slug ?? 'events-page',
    status: 'published',
    data: eventsData,
  });
  console.log('  events-page updated (Event Type 4 fields added).\n');

  // ── Contact Page (fix) ────────────────────────────────────────────────────
  console.log('Fetching contact-page record...');
  const contactRecord = await getRecord(token, COLLECTION_IDS['contact-page']);
  console.log(`  Found: ${contactRecord.id}`);

  const contactData = {
    title: 'Contact Page',
    slug: 'contact-page',
    ...contactRecord.data,
  };

  await updateRecord(token, contactRecord.id, {
    collectionId: COLLECTION_IDS['contact-page'],
    title: 'Contact Page',
    slug: 'contact-page',
    status: 'published',
    data: contactData,
  });
  console.log('  contact-page updated (title + slug patched).\n');

  // ── Menu Data (flat rewrite) ──────────────────────────────────────────────
  console.log('Fetching menu-data record...');
  const menuRecord = await getRecord(token, COLLECTION_IDS['menu-data']);
  console.log(`  Found: ${menuRecord.id}`);

  const { default: menuData } = await import('./sonicjs-seed/seed-data/menu-data.json', { with: { type: 'json' } });

  await updateRecord(token, menuRecord.id, {
    collectionId: COLLECTION_IDS['menu-data'],
    title: menuRecord.title ?? 'Menu Data',
    slug: menuRecord.slug ?? 'menu-data',
    status: 'published',
    data: menuData,
  });
  console.log('  menu-data updated (flat structure).\n');

  console.log('=== Update complete ===');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
