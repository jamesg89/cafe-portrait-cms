# SonicJS CMS — Cafe Portrait

Instructions for the Claude agent managing the SonicJS CMS repo for this project.

---

## Overview

The CMS uses a flat, content-only model. Editors can change text, link URLs, and images. They cannot change page layout, add sections, or restructure anything — those decisions live in the SvelteKit codebase.

There are **9 collections** in total:

| Collection slug  | Type   | Records |
|------------------|--------|---------|
| `config`         | Single | 1       |
| `home-page`      | Single | 1       |
| `menu-page`      | Single | 1       |
| `menu-data`      | Single | 1       |
| `events-page`    | Single | 1       |
| `gift-cards-page`| Single | 1       |
| `contact-page`   | Single | 1       |
| `our-story-page` | Single | 1       |
| `gallery`        | Single | 1       |

**All collections are now singles** — each holds exactly one record. The frontend always reads `items[0].data`.

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

| Field                         | Type  | Description                                        |
|-------------------------------|-------|----------------------------------------------------|
| `pageTitle`                   | text  | Browser tab title                                  |
| `heroSubtitle`                | text  | Subtitle text in the hero section                  |
| `heroCtaText`                 | text  | Hero call-to-action button label                   |
| `heroCtaUrl`                  | text  | Hero call-to-action button URL                     |
| `heroImage`                   | image | Hero section image (right column)                  |
| `feature1Title`               | text  | Title of feature block 1                           |
| `feature1Description`         | text  | Description of feature block 1                     |
| `feature2Title`               | text  | Title of feature block 2                           |
| `feature2Description`         | text  | Description of feature block 2                     |
| `feature3Title`               | text  | Title of feature block 3                           |
| `feature3Description`         | text  | Description of feature block 3                     |
| `gallerySectionScriptHeading` | text  | Script/italic heading above the gallery section    |
| `gallerySectionHeading`       | text  | Main heading for the gallery section               |
| `pressQuote`                  | text  | Pull quote from press coverage                     |
| `pressQuoteAttribution`       | text  | Source attribution for the press quote             |
| `ctaScriptHeading`            | text  | Script/italic heading above the bottom CTA         |
| `ctaHeading`                  | text  | Main heading for the bottom CTA                    |
| `ctaPrimaryButtonText`        | text  | Primary CTA button label                           |
| `ctaPrimaryButtonUrl`         | text  | Primary CTA button URL                             |
| `ctaSecondaryButtonText`      | text  | Secondary CTA button label                         |
| `ctaSecondaryButtonUrl`       | text  | Secondary CTA button URL                           |

---

### `menu-page`

Editable text for the menu page (`/menu`). Menu items and categories are managed in `menu-data`.

| Field                    | Type  | Description                                        |
|--------------------------|-------|----------------------------------------------------|
| `pageTitle`              | text  | Browser tab title                                  |
| `heroH1`                 | text  | Large H1 heading in the hero (e.g. "Menu")         |
| `heroSubtitle`           | text  | Italic subtitle under the H1                       |
| `drinksHeading`          | text  | Column heading for the drinks section              |
| `foodHeading`            | text  | Column heading for the food section                |
| `chefsNoteScriptHeading` | text  | Script heading for the chef's note card            |
| `chefsNote`              | text  | Body text of the chef's note (empty = hidden)      |

---

### `menu-data`

All menu categories and their items in one record. The editor adds, removes, and reorders categories and items inline — no separate records needed.

**Top-level field:**

| Field        | Type  | Description                              |
|--------------|-------|------------------------------------------|
| `categories` | array | Ordered list of menu category objects    |

**Each category object:**

| Field   | Type   | Description                                                  |
|---------|--------|--------------------------------------------------------------|
| `name`  | text   | Category display name (e.g. "Coffee & Tea")                  |
| `type`  | select | `drink` or `food` — determines which column it appears in    |
| `items` | array  | Ordered list of menu item objects within this category       |

**Each item object (inside `items`):**

| Field         | Type | Description                                    |
|---------------|------|------------------------------------------------|
| `name`        | text | Item name (required)                           |
| `description` | text | Short description (can be empty)               |
| `price`       | text | Price string (e.g. "$5.50", can be empty)      |

Array order determines display order — no `sortOrder` field needed.

---

### `events-page`

All editable content for the private events page (`/events`).

| Field                    | Type  | Description                                              |
|--------------------------|-------|----------------------------------------------------------|
| `pageTitle`              | text  | Browser tab title                                        |
| `heroSubtitle`           | text  | Script heading in the hero                               |
| `heroDescription`        | text  | Italic description line in the hero                      |
| `introScriptHeading`     | text  | Script heading above the intro section                   |
| `introHeading`           | text  | Main heading of the intro section                        |
| `introDescription`       | text  | Paragraph body of the intro section                      |
| `eventType1Title`        | text  | Title of event type card 1                               |
| `eventType1Description`  | text  | Description of event type card 1                         |
| `eventType2Title`        | text  | Title of event type card 2                               |
| `eventType2Description`  | text  | Description of event type card 2                         |
| `eventType3Title`        | text  | Title of event type card 3                               |
| `eventType3Description`  | text  | Description of event type card 3                         |
| `offeringsScriptHeading` | text  | Script heading above the offerings section               |
| `offeringsHeading`       | text  | Main heading of the offerings section                    |
| `offering1Label`         | text  | Label for offering row 1 (e.g. "Capacity")               |
| `offering1Detail`        | text  | Detail text for offering row 1                           |
| `offering2Label`         | text  | Label for offering row 2                                 |
| `offering2Detail`        | text  | Detail text for offering row 2                           |
| `offering3Label`         | text  | Label for offering row 3                                 |
| `offering3Detail`        | text  | Detail text for offering row 3                           |
| `offering4Label`         | text  | Label for offering row 4                                 |
| `offering4Detail`        | text  | Detail text for offering row 4                           |
| `offering5Label`         | text  | Label for offering row 5                                 |
| `offering5Detail`        | text  | Detail text for offering row 5                           |
| `offering6Label`         | text  | Label for offering row 6                                 |
| `offering6Detail`        | text  | Detail text for offering row 6                           |
| `bookingHeading`         | text  | Heading above the booking/enquiry form                   |
| `bookingDescription`     | text  | Description paragraph above the booking form             |

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

| Field                       | Type  | Description                                          |
|-----------------------------|-------|------------------------------------------------------|
| `pageTitle`                 | text  | Browser tab title                                    |
| `heroSubtitle`              | text  | Script heading in the hero                           |
| `heroPressQuote`            | text  | Pull quote in the hero (empty = hidden)              |
| `heroPressQuoteAttribution` | text  | Source attribution for the hero press quote          |
| `infoSectionHeading`        | text  | Heading above the info cards (e.g. "Get In Touch")   |
| `locationCardTitle`         | text  | Title of the location card (e.g. "Our Location")     |
| `hoursCardTitle`            | text  | Title of the hours card (e.g. "Opening Hours")       |
| `phoneCardTitle`            | text  | Title of the phone card (e.g. "Call Us")             |
| `formHeading`               | text  | Heading above the contact form                       |

---

### `our-story-page`

All editable content for the Our Story / about page (`/our-story`).

| Field                       | Type  | Description                                          |
|-----------------------------|-------|------------------------------------------------------|
| `heroPressQuote`            | text  | Pull quote in the hero (empty = hidden)              |
| `heroPressQuoteAttribution` | text  | Source attribution for the hero press quote          |
| `section1ScriptHeading`     | text  | Script/italic label above section 1                  |
| `section1Heading`           | text  | Main heading of section 1                            |
| `section1Para1`             | text  | First paragraph of section 1                         |
| `section1Para2`             | text  | Second paragraph of section 1                        |
| `section1Image`             | image | Photo for section 1 (empty = gradient placeholder)   |
| `section2ScriptHeading`     | text  | Script/italic label above section 2                  |
| `section2Heading`           | text  | Main heading of section 2                            |
| `section2Para1`             | text  | First paragraph of section 2                         |
| `section2Para2`             | text  | Second paragraph of section 2                        |
| `section2Image`             | image | Photo for section 2 (empty = gradient placeholder)   |
| `section3ScriptHeading`     | text  | Script/italic label above section 3                  |
| `section3Heading`           | text  | Main heading of section 3                            |
| `section3Para1`             | text  | First paragraph of section 3                         |
| `section3Para2`             | text  | Second paragraph of section 3                        |
| `section3Image`             | image | Photo for section 3 (empty = gradient placeholder)   |
| `section3CtaText`           | text  | Text link label at the bottom of section 3           |
| `section3CtaUrl`            | text  | URL for the section 3 text link                      |
| `closingQuote`              | text  | Closing quote in the dark band at the bottom         |

---

### `gallery`

One record holding all gallery images for the site. Images are split into two arrays by page — editors add and remove images inline, no separate records needed.

**Top-level fields:**

| Field        | Type  | Description                             |
|--------------|-------|-----------------------------------------|
| `homeImages` | array | Images shown in the home page gallery   |
| `menuImages` | array | Images shown on the menu page           |

**Each image object (in either array):**

| Field   | Type  | Description                                             |
|---------|-------|---------------------------------------------------------|
| `image` | media | The gallery image (empty = gradient placeholder)        |
| `label` | text  | Caption shown on hover (can be empty)                   |

Array order determines display order — no `sortOrder` field needed.

---

## How the Frontend Reads Data

The SvelteKit app fetches all content in one request and identifies collections by `collectionId`:

```
item.collectionId starts with "col-{slug}-"
```

For example, a `config` record will have `collectionId` like `col-config-abc123`.

All collections are **singles** — the app reads `items[0].data` and merges it with hardcoded fallback values using object spread. Any field missing from the CMS record falls back to the default.

For **`gallery`** and **`menu-data`**, the embedded arrays (`homeImages`, `menuImages`, `categories`) are used directly. If the array is empty or missing, the frontend falls back to its hardcoded defaults.

---

## Notes for the SonicJS Agent

- Collection slugs must match exactly: `config`, `home-page`, `menu-page`, `menu-data`, `events-page`, `gift-cards-page`, `contact-page`, `our-story-page`, `gallery`
- Field names are camelCase and must match exactly as listed above — the frontend destructures them directly by name
- `image` fields store a URL string. An empty string (`""`) causes the frontend to render a gradient placeholder instead
- Do not add or rename collections or fields without coordinating a matching change in the SvelteKit codebase (`src/lib/types.ts`, `src/lib/fallback-data.ts`, and the relevant page component)
- **Removed collections**: `menu-categories` and `menu-items` no longer exist. Their data now lives inside `menu-data.categories[].items[]`
