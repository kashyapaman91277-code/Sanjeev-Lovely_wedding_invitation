# Console fix

1. The PostCSS warning was caused by `@import` appearing after `:root`. It is now moved to the first line of `src/styles.css`.
2. The embedded Google Maps frame was causing `ERR_BLOCKED_BY_CLIENT` and Google Maps touch-listener performance warnings in some browsers/extensions. The visual map is now an OpenStreetMap embed, while **Get Directions** still opens Google Maps using the editable `CONFIG.mapQuery`.
3. If a browser extension still reports unrelated warnings, test in Incognito with extensions disabled.

Run:
```bash
npm install
npm run dev
```
