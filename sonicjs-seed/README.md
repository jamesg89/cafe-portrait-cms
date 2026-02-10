# SonicJS Seed Data for Cafe Portrait

This directory contains collection definitions and seed data for the `cafe-portrait-cms` SonicJS worker.

## Structure

- `collections/` — TypeScript collection config files defining the CMS schema
- `seed-data/` — JSON files with the initial content to import

## Collections

| Collection | Type | Description |
|------------|------|-------------|
| `site_settings` | singleton | Site name, tagline, logo text |
| `contact_info` | singleton | Address, hours, email |
| `features` | collection | Homepage feature cards |
| `menu_categories` | collection | Menu category groupings |
| `menu_items` | collection | Individual menu items with category references |
| `gallery_items` | collection | Gallery tile labels per page |
| `press_quotes` | collection | Press/media quotes |
| `pages` | collection | Page-level metadata (title, subtitle, chef's note) |

## Seeding

1. Copy collection definitions into your SonicJS CMS project's config
2. Use the SonicJS admin API or dashboard to import the JSON seed data
3. Menu items reference `menu_categories` by the `id` field — ensure categories are created first
