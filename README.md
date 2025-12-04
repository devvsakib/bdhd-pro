You are an engineering teammate who will build a web app called **IlmShelf**. Follow these exact requirements and never change the JSON property names in the provided book schema.

**Use this example book object (do not modify property names):**

```json
{
  "id": "b7",
  "title": {
    "en": "jadukor-o-jotishir-golay-dharalo-torbari",
    "bn": "যাদুকর ও জ্যোতিষীর গলায় ধারালো তরবারি"
  },
  "authors": {
    "writter": "শায়খ ওয়াহিদ বিন আব্দুস সালাম বালী",
    "translator": "মুহাম্মদ আবদুর রব বিন আফফান",
    "publisher": "তাওহীদ পাবলিকেশন্স"
  },
  "cover": "https://sunnahbookshop.com/wp-content/uploads/2025/07/jadukor-o-jotishir-golay-dharalo-torbari.webp",
  "price": 98,
  "pages": 144,
  "shelfId": "islamic",
  "readStatus": "IN_PROGRESS",
  "private": true,
  "notes": "Good reference on patterns",
  "readingTime": "14 days",
  "purchaseDate": "2024-06-15",
  "publishedYear": 2020,
  "isbn": "978-1906999736",
  "description": "হে আল্লাহ! তােমার নবীর প্রতি যেমন ঈমান এনেছি কিন্তু তাঁকে দেখিনি। তবে তুমি জান্নাতে তাঁর দর্শণ থেকে আমািদে কে বঞ্চিত করাে না। হে আল্লাহ যেমনভাবে তাকে অনুসরণ করেছি তার বিনিময়ে তাঁর হাউসে কাউসারের পানি তুমি পান করার তাওফীক দান কর যা পান করলে তারপর আর পিপাসিত হবাে না।"
}
```

## Tech stack & libraries (mandatory)

* React (JavaScript, **no TypeScript**) + Vite
* Tailwind CSS **v4**
* **shadcn** UI primitives for components and layout — use their patterns for Cards, Modals, Forms, etc.
* Icons: **Tabler Icons**
* Animations: **Framer Motion** (or the `motion` variant you prefer)
* Optional: `react-i18next` for bilingual UI (en / bn) but keep data structure as-is

## Core features (minimum viable product)

1. **Global book list page** — paginated, searchable, filterable by `shelfId`, `readStatus`, `private` flag, author, year, price range.
2. **Single book page** — displays every property from the schema, editable notes, toggle `private` flag (only owner may change).
3. **Shelf page** — lists books grouped by `shelfId`.
4. **Total spending page** — calculates and displays total `price` across a user’s visible books, with optional breakdown by shelf and time range.
5. **Search** — full-text search over `title.en`, `title.bn`, `authors.*`, `isbn`, and `notes`.
6. **Reading status management** — set `readStatus` values (e.g., `TO_READ`, `IN_PROGRESS`, `COMPLETED`) and track `readingTime`.
7. **Authentication** — Google sign-in (OAuth). Associate books with user accounts; private books visible only to owner.
8. **Share** — share single-book permalink (public only if `private` is `false`), and optionally share a shelf link (future decision).
9. **Create / Edit / Delete book** — forms must validate required fields and preserve property names exactly.
10. **Responsive UI** — mobile-first, accessible (a11y), keyboard navigable.

## Future / suggested features (implement later)

* Import/export JSON for entire shelf.
* Book cover upload + automatic resizing.
* Multi-user shelves (collaboration).
* Price currency selection and currency conversion.
* Book reading timeline / progress tracker.
* Social feed for public books (likes, comments — opt-in).
* Admin panel to manage reported items.

## Data & API requirements

* Use the provided JSON shape as the canonical contract for frontend ↔ backend.
* Frontend must never rename or drop properties. If a backend presents more fields, ignore them but preserve/round-trip unknown fields when editing.
* Local mock API for development (Vite dev server + mocked endpoints). Provide adapters so backend can be swapped later.
* All date strings use ISO `YYYY-MM-DD` (e.g., `"purchaseDate": "2024-06-15"`).

## UI / Component guidance

* Use shadcn primitives and Tailwind v4 for all components. Keep components small, reusable, and well-typed in JS prop validation.
* Pages to implement: Home (dashboard), Books (list), Book (detail), Shelves, Total Spending, Profile (auth).
* Provide a `BookCard`, `BookList`, `SearchBar`, `ShelfBadge`, and `PriceSummary` components.
* Visual states: loading, empty, error. Use skeletons or shadcn placeholders.
* Use Tabler icons consistently and Framer Motion for subtle transitions (page fades, card hover).

## Acceptance criteria

* All core features work in modern browsers (desktop + mobile).
* Book pages read and write via the provided schema unchanged.
* Google login works and private books are enforced on frontend and mocked backend.
* Total spending page accurately sums `price` for the signed-in user and groups by `shelfId`.
* Search returns relevant results across the specified fields.
* UI uses shadcn + Tailwind v4; design consistent and responsive.

## Deliverables

1. Vite + React project repo skeleton with the required dependencies and scripts.
2. Working local mock API and seed data including the example book above.
3. Implemented pages/components for all Core features.
4. README with setup, dev commands, and notes on where to change backend adapters and how to seed the example book.
5. Brief test plan (manual steps) to verify core flows: auth, add/edit book, privacy enforcement, total price calculation, search.

Build the MVP following these constraints and preserve the JSON property names exactly as provided.

## ✨ 4 Major Features Added 🎉:

### 1. **📚 Reading Goals** (Feature #1)

-   Set yearly reading targets
-   Track progress with visual progress bar
-   Shows books completed vs target
-   Calculates books per month needed
-   Celebration message when goal is reached
-   Auto-tracks completion dates

### 2. **⭐ Book Ratings** (Feature #2)

-   5-star rating system
-   Interactive star selection (hover effects)
-   Displays on book cards
-   Edit ratings on detail page
-   Readonly display mode for cards

### 3. **❤️ Wishlist** (Feature #3)

-   Track books you want to buy
-   Priority levels (High/Medium/Low)
-   Price tracking for wishlist items
-   Total wishlist value display
-   Separate storage from main collection
-   Add/delete wishlist items

### 4. **👥 Lending Tracker** (Feature #4)

-   Record when you lend books to friends
-   Track borrower name and lent date
-   Shows "days out" for each loan
-   Mark books as returned
-   Separate active and returned loans view
-   Full lending history

## 🎯 How to Access:

All features are accessible via the **"+" menu** in the top-right corner of the app!

## 💾 Data Persistence:

-   All features use localStorage for persistence
-   Reading goals, wishlist, and lending records are saved separately
-   Book ratings and completion dates are saved with book data

## 🚀 Remaining Features to Implement:

**Next batch (5-10):** 5. ⏱️ **Reading Time Tracker** - Log reading sessions 6. 🤖 **Book Recommendations** - AI-powered suggestions 7. 🏷️ **Tags/Categories** - Custom organization system 8. 📊 **Statistics Dashboard** - Advanced analytics 9. 🌙 **Dark Mode** - Theme toggle 10. 🔐 **Google Auth** - User authentication (requires backend)

**Next batch (11-15):** 11. 📝 **Notes** - Add notes to books 12. 📅 **Due Dates** - Set due dates for tasks
