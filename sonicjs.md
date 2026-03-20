# SonicJS CMS — Cafe Portrait

Instructions for the Claude agent managing the SonicJS CMS repo for this project.

---

## Overview

The CMS uses a flat, content-only model. Editors can change text, link URLs, and images. They cannot change page layout, add sections, or restructure anything — those decisions live in the SvelteKit codebase.

There are **10 collections** in total:

| Collection slug     | Type         | Records       |
|---------------------|--------------|---------------|
| `config`            | Single       | 1             |
| `home-page`         | Single       | 1             |
| `menu-page`         | Single       | 1             |
| `menu-categories`   | List         | Multiple      |
| `menu-items`        | List         | Multiple      |
| `events-page`       | Single       | 1             |
| `gift-cards-page`   | Single       | 1             |
| `contact-page`      | Single       | 1             |
| `our-story-page`    | Single       | 1             |
| `gallery`           | List         | Multiple      |

**Single** collections hold exactly one record. The frontend always reads `items[0].data` and merges it over fallback values.

**List** collections hold multiple records sorted by a `sortOrder` field.

The frontend fetches all content in one request: `GET /api/content?limit=500`. The collection for each item is identified by `item.collectionId` starting with `col-{slug}-`.

---

## Collection Definitions

### `config`

Site-wide settings used across all pages — logo, footer info, contact details, social links.

| Field                | Type   | Description                                      |
|----------------------|--------|--------------------------------------------------|
| `logoTextTop`        | text   | Top word of the logo (e.g. "café")               |
| `logoTextBottom`     | text   | Bottom word of the logo (e.g. "Portrait")        |
| `siteName`           | text   | Full site name (e.g. "Cafe Portrait")            |
| `metaDescription`    | text   | Default meta description for SEO                 |
| `tagline`            | text   | Short tagline used in the footer                 |
| `footerAddressLine1` | text   | Street address (e.g. "1120 Denman Street")       |
| `footerAddressLine2` | text   | City, province, postal code                      |
| `footerShortAddress` | text   | Short city/postal for compact displays           |
| `footerPhone`        | text   | Phone number (e.g. "(604) 555-0192")             |
| `footerEmail`        | text   | Contact email                                    |
| `footerDays`         | text   | Opening days (e.g. "Monday – Sunday")            |
| `footerHours`        | text   | Opening hours (e.g. "8:00 AM – 6:00 PM")        |
| `footerHoursNote`    | text   | Short note under hours (e.g. "Brunch served all day") |
| `footerMapsUrl`      | text   | Google Maps link for the address                 |
| `footerFacebookUrl`  | text   | Facebook page URL                                |
| `footerInstagramUrl` | text   | Instagram profile URL                            |

---

### `home-page`

All editable content for the home page (`/`).

| Field                      | Type   | Description                                        |
|----------------------------|--------|----------------------------------------------------|
| `pageTitle`                | text   | Browser tab title                                  |
| `heroSubtitle`             | text   | Subtitle text in the hero section                  |
| `heroCtaText`              | text   | Hero call-to-action button label                   |
| `heroCtaUrl`               | text   | Hero call-to-action button URL                     |
| `heroImage`                | image  | Hero section image (right column)                  |
| `feature1Title`            | text   | Title of feature block 1                           |
| `feature1Description`      | text   | Description of feature block 1                     |
| `feature2Title`            | text   | Title of feature block 2                           |
| `feature2Description`      | text   | Description of feature block 2                     |
| `feature3Title`            | text   | Title of feature block 3                           |
| `feature3Description`      | text   | Description of feature block 3                     |
| `gallerySectionScriptHeading` | text | Script/italic heading above the gallery section  |
| `gallerySectionHeading`    | text   | Main heading for the gallery section               |
| `pressQuote`               | text   | Pull quote from press coverage                     |
| `pressQuoteAttribution`    | text   | Source attribution for the press quote             |
| `ctaScriptHeading`         | text   | Script/italic heading above the bottom CTA         |
| `ctaHeading`               | text   | Main heading for the bottom CTA                    |
| `ctaPrimaryButtonText`     | text   | Primary CTA button label                           |
| `ctaPrimaryButtonUrl`      | text   | Primary CTA button URL                             |
| `ctaSecondaryButtonText`   | text   | Secondary CTA button label                         |
| `ctaSecondaryButtonUrl`    | text   | Secondary CTA button URL                           |

---

### `menu-page`

Editable text for the menu page (`/menu`). Menu items and categories are managed separately in `menu-items` and `menu-categories`.

| Field                   | Type  | Description                                        |
|-------------------------|-------|----------------------------------------------------|
| `pageTitle`             | text  | Browser tab title                                  |
| `heroH1`                | text  | Large H1 heading in the hero (e.g. "Menu")         |
| `heroSubtitle`          | text  | Italic subtitle under the H1                       |
| `drinksHeading`         | text  | Column heading for the drinks section              |
| `foodHeading`           | text  | Column heading for the food section                |
| `chefsNoteScriptHeading`| text  | Script heading for the chef's note card            |
| `chefsNote`             | text  | Body text of the chef's note (empty = hidden)      |

---

### `menu-categories`

Each record is one menu category. Items are assigned to categories by `id`.

| Field       | Type   | Description                                             |
|-------------|--------|---------------------------------------------------------|
| `name`      | text   | Display name (e.g. "Coffee & Tea")                      |
| `type`      | select | `drink` or `food` — determines which column it appears in |
| `sortOrder` | number | Order within the column (lower = higher on page)        |

---

### `menu-items`

Each record is one menu item.

| Field       | Type   | Description                                              |
|-------------|--------|----------------------------------------------------------|
| `name`      | text   | Item name                                                |
| `description` | text | Short description (can be empty)                       |
| `price`     | text   | Price string (e.g. "$5.50", can be empty)               |
| `category`  | text   | The `id` of the parent `menu-categories` record          |
| `sortOrder` | number | Display order within the category                        |

---

### `events-page`

All editable content for the private events page (`/events`).

| Field                  | Type  | Description                                              |
|------------------------|-------|----------------------------------------------------------|
| `pageTitle`            | text  | Browser tab title                                        |
| `heroSubtitle`         | text  | Script heading in the hero                               |
| `heroDescription`      | text  | Italic description line in the hero                      |
| `introScriptHeading`   | text  | Script heading above the intro section                   |
| `introHeading`         | text  | Main heading of the intro section                        |
| `introDescription`     | text  | Paragraph body of the intro section                      |
| `eventType1Title`      | text  | Title of event type card 1                               |
| `eventType1Description`| text  | Description of event type card 1                         |
| `eventType2Title`      | text  | Title of event type card 2                               |
| `eventType2Description`| text  | Description of event type card 2                         |
| `eventType3Title`      | text  | Title of event type card 3                               |
| `eventType3Description`| text  | Description of event type card 3                         |
| `offeringsScriptHeading` | text | Script heading above the offerings section             |
| `offeringsHeading`     | text  | Main heading of the offerings section                    |
| `offering1Label`       | text  | Label for offering row 1 (e.g. "Capacity")               |
| `offering1Detail`      | text  | Detail text for offering row 1                           |
| `offering2Label`       | text  | Label for offering row 2                                 |
| `offering2Detail`      | text  | Detail text for offering row 2                           |
| `offering3Label`       | text  | Label for offering row 3                                 |
| `offering3Detail`      | text  | Detail text for offering row 3                           |
| `offering4Label`       | text  | Label for offering row 4                                 |
| `offering4Detail`      | text  | Detail text for offering row 4                           |
| `offering5Label`       | text  | Label for offering row 5                                 |
| `offering5Detail`      | text  | Detail text for offering row 5                           |
| `offering6Label`       | text  | Label for offering row 6                                 |
| `offering6Detail`      | text  | Detail text for offering row 6                           |
| `bookingHeading`       | text  | Heading above the booking/enquiry form                   |
| `bookingDescription`   | text  | Description paragraph above the booking form             |

---

### `gift-cards-page`

All editable content for the gift cards page (`/gift-cards`).

| Field                      | Type  | Description                                          |
|----------------------------|-------|------------------------------------------------------|
| `pageTitle`                | text  | Browser tab title                                    |
| `heroSubtitle`             | text  | Script heading in the hero                           |
| `heroDescription`          | text  | Italic description in the hero                       |
| `descriptionScriptHeading` | text  | Script heading above the description section         |
| `descriptionHeading`       | text  | Main heading of the description section              |
| `description`              | text  | Body paragraph describing gift cards                 |
| `highlight1Label`          | text  | Label for highlight chip 1 (e.g. "Instant Delivery") |
| `highlight1Sublabel`       | text  | Sublabel for highlight chip 1 (e.g. "Sent via email")|
| `highlight2Label`          | text  | Label for highlight chip 2                           |
| `highlight2Sublabel`       | text  | Sublabel for highlight chip 2                        |
| `highlight3Label`          | text  | Label for highlight chip 3                           |
| `highlight3Sublabel`       | text  | Sublabel for highlight chip 3                        |
| `purchaseHeading`          | text  | Heading above the purchase button                    |
| `purchaseDescription`      | text  | Short line under the purchase heading                |
| `purchaseButtonText`       | text  | Label on the purchase button                         |
| `purchaseButtonUrl`        | text  | URL the purchase button links to (e.g. Square store) |
| `ctaScriptHeading`         | text  | Script heading for the bottom CTA                    |
| `ctaHeading`               | text  | Main heading for the bottom CTA                      |
| `ctaDescription`           | text  | Description paragraph in the bottom CTA              |
| `ctaButtonText`            | text  | Bottom CTA button label                              |
| `ctaButtonUrl`             | text  | Bottom CTA button URL                                |

---

### `contact-page`

Editable text for the contact page (`/contact`). All contact info (address, hours, phone) lives in `config`.

| Field                      | Type  | Description                                          |
|----------------------------|-------|------------------------------------------------------|
| `pageTitle`                | text  | Browser tab title                                    |
| `heroSubtitle`             | text  | Script heading in the hero                           |
| `heroPressQuote`           | text  | Pull quote in the hero (empty = hidden)              |
| `heroPressQuoteAttribution`| text  | Source attribution for the hero press quote          |
| `infoSectionHeading`       | text  | Heading above the info cards (e.g. "Get In Touch")   |
| `locationCardTitle`        | text  | Title of the location card (e.g. "Our Location")     |
| `hoursCardTitle`           | text  | Title of the hours card (e.g. "Opening Hours")       |
| `phoneCardTitle`           | text  | Title of the phone card (e.g. "Call Us")             |
| `formHeading`              | text  | Heading above the contact form                       |

---

### `our-story-page`

All editable content for the Our Story / about page (`/our-story`).

| Field                      | Type  | Description                                          |
|----------------------------|-------|------------------------------------------------------|
| `heroPressQuote`           | text  | Pull quote in the hero (empty = hidden)              |
| `heroPressQuoteAttribution`| text  | Source attribution for the hero press quote          |
| `section1ScriptHeading`    | text  | Script/italic label above section 1                  |
| `section1Heading`          | text  | Main heading of section 1                            |
| `section1Para1`            | text  | First paragraph of section 1                         |
| `section1Para2`            | text  | Second paragraph of section 1                        |
| `section1Image`            | image | Photo for section 1 (empty = gradient placeholder)   |
| `section2ScriptHeading`    | text  | Script/italic label above section 2                  |
| `section2Heading`          | text  | Main heading of section 2                            |
| `section2Para1`            | text  | First paragraph of section 2                         |
| `section2Para2`            | text  | Second paragraph of section 2                        |
| `section2Image`            | image | Photo for section 2 (empty = gradient placeholder)   |
| `section3ScriptHeading`    | text  | Script/italic label above section 3                  |
| `section3Heading`          | text  | Main heading of section 3                            |
| `section3Para1`            | text  | First paragraph of section 3                         |
| `section3Para2`            | text  | Second paragraph of section 3                        |
| `section3Image`            | image | Photo for section 3 (empty = gradient placeholder)   |
| `section3CtaText`          | text  | Text link label at the bottom of section 3           |
| `section3CtaUrl`           | text  | URL for the section 3 text link                      |
| `closingQuote`             | text  | Closing quote in the dark band at the bottom         |

---

### `gallery`

Shared image gallery. Items are filtered by `page` field — the home page uses `page: 'home'`, the menu page uses `page: 'menu'`. Editors can add and delete records freely.

| Field       | Type   | Description                                              |
|-------------|--------|----------------------------------------------------------|
| `image`     | image  | The gallery image (empty string = gradient placeholder)  |
| `label`     | text   | Caption shown on hover                                   |
| `page`      | select | `home` or `menu` — determines which page it appears on   |
| `sortOrder` | number | Display order within the page (lower = earlier)          |

---

## How the Frontend Reads Data

The SvelteKit app fetches all content in one request and identifies collections by `collectionId`:

```
item.collectionId starts with "col-{slug}-"
```

For example, a `config` record will have `collectionId` like `col-config-abc123`.

For **single collections** (`config`, `home-page`, `menu-page`, `events-page`, `gift-cards-page`, `contact-page`, `our-story-page`), the app reads `items[0].data` and merges it with hardcoded fallback values using object spread. Any field missing from the CMS record will fall back to the default — there is no requirement to populate every field.

For **list collections** (`menu-categories`, `menu-items`, `gallery`), all records are used. They are sorted by `sortOrder` before rendering. If no records exist in the CMS, the full fallback list is used.

---

## Notes for the SonicJS Agent

- Collection slugs must match exactly: `config`, `home-page`, `menu-page`, `menu-categories`, `menu-items`, `events-page`, `gift-cards-page`, `contact-page`, `our-story-page`, `gallery`
- Field names are camelCase and must match exactly as listed above — the frontend destructures them directly by name
- `image` fields store a URL string. An empty string (`""`) causes the frontend to render a gradient placeholder instead
- The `menu-items` `category` field must contain the SonicJS record `id` (not a slug) of the corresponding `menu-categories` record, because the frontend matches items to categories using the record `id`
- Do not add or rename collections or fields without coordinating a matching change in the SvelteKit codebase (`src/lib/types.ts`, `src/lib/fallback-data.ts`, and the relevant page component)
