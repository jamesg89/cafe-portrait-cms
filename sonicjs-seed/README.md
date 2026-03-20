# SonicJS Seed Data for Cafe Portrait

This directory contains reference collection definitions and seed data for the `cafe-portrait-cms` SonicJS worker.

## Structure

- `collections/` — Reference TypeScript collection config files (mirrors `src/collections/`)
- `seed-data/` — JSON files with the initial content to import

## Collections

| Collection slug     | Type   | Description                                         |
|---------------------|--------|-----------------------------------------------------|
| `config`            | Single | Site-wide settings — logo, footer, contact, socials |
| `home-page`         | Single | All editable content for the home page              |
| `menu-page`         | Single | Menu page header and chef's note                    |
| `menu-categories`   | List   | Menu category groupings (drink or food)             |
| `menu-items`        | List   | Individual menu items with category references      |
| `events-page`       | Single | All editable content for the private events page    |
| `gift-cards-page`   | Single | All editable content for the gift cards page        |
| `contact-page`      | Single | Editable text for the contact page                  |
| `our-story-page`    | Single | All editable content for the Our Story page         |
| `gallery`           | List   | Shared image gallery, filtered by `page` field      |

## Seeding

1. Ensure `menu-categories` records are created first — menu items reference categories by record `id`
2. Use the SonicJS admin UI or API to import each JSON file from `seed-data/`
3. For **Single** collections, import as one record; the frontend always reads `items[0].data`
4. For **List** collections, import all array items; they are sorted by `sortOrder` before rendering

## Notes

- The `menu-items` `category` field stores the SonicJS record `id` of the parent `menu-categories` record
- `image` fields store a URL string; an empty string (`""`) renders a gradient placeholder on the frontend
- The `gallery` `page` field (`home` or `menu`) determines which page the image appears on
- Contact details (address, hours, phone) live in `config`, not in `contact-page`
