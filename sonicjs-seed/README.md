# SonicJS Seed Data for Cafe Portrait

This directory contains reference collection definitions and seed data for the `cafe-portrait-cms` SonicJS worker.

## Structure

- `collections/` — Reference TypeScript collection config files (mirrors `src/collections/`)
- `seed-data/` — JSON files with the initial content to import

## Collections

All 9 collections are **singles** — each holds exactly one record. The frontend always reads `items[0].data`.

| Collection slug   | Description                                                    |
|-------------------|----------------------------------------------------------------|
| `config`          | Site-wide settings — logo, footer, contact, socials            |
| `home-page`       | All editable content for the home page                         |
| `menu-page`       | Menu page header and chef's note                               |
| `menu-data`       | All menu categories and items (nested inline)                  |
| `events-page`     | All editable content for the private events page               |
| `gift-cards-page` | All editable content for the gift cards page                   |
| `contact-page`    | Editable text for the contact page                             |
| `our-story-page`  | All editable content for the Our Story page                    |
| `gallery`         | Home and menu page images (two inline arrays)                  |

## Seeding

Run from the project root:

```
node seed.mjs
```

The script logs in, then POSTs each collection's seed data as a single published record. Records that already exist (HTTP 409) are skipped automatically.

## menu-data structure

`menu-data` holds one record with a `categories` array. Each category has `name`, `type` (`drink` or `food`), and an `items` array. Array order determines display order — no `sortOrder` field is needed.

## gallery structure

`gallery` holds one record with two arrays: `homeImages` (shown on the home page) and `menuImages` (shown on the menu page). Each element has `image` (URL or empty string) and `label` (hover caption).

## Notes

- `image` fields store a URL string; an empty string (`""`) renders a gradient placeholder on the frontend
- Collection IDs are hardcoded in `seed.mjs` — run `GET /api/collections` against the deployed worker if they ever need refreshing
