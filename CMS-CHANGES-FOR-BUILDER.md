# CMS Data Shape Changes — Builder Action Required

Two collections have been restructured. The SvelteKit frontend must be updated to match.

---

## 1. Gallery

### What changed

The `gallery` collection was a **list** of multiple records (one image per record, with a `page` filter field). It is now a **single** collection — one record with two embedded image arrays.

### Old shape

```
GET /api/content → items where collectionId starts with "col-gallery-"

Each item.data:
{
  image:     string   // media URL
  label:     string
  page:      "home" | "menu"
  sortOrder: number
}
```

Frontend logic: filter all gallery records by `page`, sort by `sortOrder`, map to `{ image, label }`.

### New shape

```
GET /api/content → single item where collectionId starts with "col-gallery-"

item.data:
{
  homeImages: Array<{ image: string, label: string }>
  menuImages: Array<{ image: string, label: string }>
}
```

Frontend logic: read `items[0].data.homeImages` for the home gallery, `items[0].data.menuImages` for the menu gallery. Array order is display order — no sorting needed.

### Required frontend changes

- **`src/lib/types.ts`** — Remove the old `GalleryItem` type (`image`, `label`, `page`, `sortOrder`). Add:
  ```ts
  interface GalleryImage {
    image: string
    label: string
  }
  interface GalleryData {
    homeImages: GalleryImage[]
    menuImages: GalleryImage[]
  }
  ```
- **`src/lib/fallback-data.ts`** — Replace the old flat `galleryItems` array with a `galleryData` object:
  ```ts
  export const fallbackGalleryData: GalleryData = {
    homeImages: [ /* your placeholder items */ ],
    menuImages: [ /* your placeholder items */ ],
  }
  ```
- **Data fetching / content parsing** — Instead of filtering records by `collectionId` prefix and `page` field, find the single `col-gallery-` record and read its `.data.homeImages` / `.data.menuImages` arrays directly.
- **Home page component** — Replace the filter/sort logic with `galleryData.homeImages`.
- **Menu page component** — Replace the filter/sort logic with `galleryData.menuImages`.

---

## 2. Menu (categories + items)

### What changed

`menu-categories` (list, multiple records) and `menu-items` (list, multiple records) have been **merged** into a single collection called `menu-data` — one record with a `categories` array, where each category contains its `items` inline.

### Old shape

```
GET /api/content

menu-categories items (collectionId starts with "col-menu-categories-"):
  item.data: { name: string, type: "drink" | "food", sortOrder: number }

menu-items items (collectionId starts with "col-menu-items-"):
  item.data: { name: string, description: string, price: string, category: string, sortOrder: number }
  // category = the SonicJS record id of the parent menu-categories record
```

Frontend logic: sort categories by `sortOrder`, sort items by `sortOrder`, match items to categories via `item.data.category === categoryRecord.id`.

### New shape

```
GET /api/content → single item where collectionId starts with "col-menu-data-"

item.data:
{
  categories: Array<{
    name:  string
    type:  "drink" | "food"
    items: Array<{
      name:        string
      description: string
      price:       string
    }>
  }>
}
```

Frontend logic: read `items[0].data.categories`. Each category object contains its items inline, already in display order. Split by `type` to populate the drinks and food columns.

### Required frontend changes

- **`src/lib/types.ts`** — Remove `MenuCategory` and `MenuItem` types. Add:
  ```ts
  interface MenuItemData {
    name:        string
    description: string
    price:       string
  }
  interface MenuCategory {
    name:  string
    type:  'drink' | 'food'
    items: MenuItemData[]
  }
  interface MenuData {
    categories: MenuCategory[]
  }
  ```
- **`src/lib/fallback-data.ts`** — Replace the old separate `fallbackMenuCategories` and `fallbackMenuItems` arrays with a single `fallbackMenuData` object matching the new shape above.
- **Data fetching / content parsing** — Remove the two separate filter passes for `col-menu-categories-` and `col-menu-items-`. Instead find the single `col-menu-data-` record and read `.data.categories`.
- **Menu page component** — Remove the join logic that matched items to categories by ID. Instead use `menuData.categories.filter(c => c.type === 'drink')` for the drinks column and `menuData.categories.filter(c => c.type === 'food')` for the food column.
- **No more `sortOrder` join** — array order is the source of truth. Remove all `sortOrder`-based sorting for menu data.

---

## Removed collections

The following collection slugs no longer exist and should be removed from any frontend switch/filter logic:

| Removed slug      | Replaced by                              |
|-------------------|------------------------------------------|
| `menu-categories` | embedded in `menu-data.categories[]`     |
| `menu-items`      | embedded in `menu-data.categories[].items[]` |

---

## Summary of collection slug changes

| Old slug          | New slug    | Change                         |
|-------------------|-------------|--------------------------------|
| `gallery`         | `gallery`   | Same slug, shape changed       |
| `menu-categories` | *(removed)* | Merged into `menu-data`        |
| `menu-items`      | *(removed)* | Merged into `menu-data`        |
| *(new)*           | `menu-data` | New single collection          |

All other collections (`config`, `home-page`, `menu-page`, `events-page`, `gift-cards-page`, `contact-page`, `our-story-page`) are **unchanged**.
