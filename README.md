# Rick and Morty Explorer
<img width="1464" height="949" alt="Screenshot 2026-11-23 at 18 12 12" src="https://github.com/user-attachments/assets/67a5310b-6bce-4aad-90c1-42b7825ceed8" />

A small vanilla JavaScript app to search and explore characters from the [Rick and Morty API](https://rickandmortyapi.com/).

I built it to practise JavaScript fundamentals without a framework: fetching data, working with the DOM and handling loading, error and empty states.

## Features

- Loads characters from the Rick and Morty API on start.
- Search characters by name.
- Filter characters by status (alive, dead or unknown).
- Shows a summary of how many characters on the current page are alive, dead or unknown.
- Loading, error and empty states, announced to screen readers with `aria-live`.
- Responsive card grid.

## Tech stack

- JavaScript (ES modules, no framework)
- HTML and CSS
- [Vite](https://vite.dev/)
- [Rick and Morty API](https://rickandmortyapi.com/)

## Technical decisions

- **Query parameters with `URLSearchParams`:** the search and the status filter are combined into a single request, so the filtering is done by the API and not in the browser.
- **404 handled as "no results":** the API returns a 404 when no character matches the search, so the app shows an empty state instead of an error.
- **Errors handled explicitly:** `fetch` does not fail on HTTP errors, so the app checks `res.ok` and shows an error message when the request fails.
- **Data transformed before rendering:** the API response is mapped to only the fields the app needs (id, name, image, species and status).
- **Summary with `reduce`:** the characters are counted by status in a single pass.
- **Basic styles on purpose:** the focus of the project is the JavaScript logic, so the styles are kept simple (CSS Grid for the cards, flexbox for the form and a visible keyboard focus).

## Limitations and next steps

- Only the first page of results (20 characters) is shown. Pagination is the next step.
- No unit tests yet.

## How to run

```bash
npm install
npm run dev
```
