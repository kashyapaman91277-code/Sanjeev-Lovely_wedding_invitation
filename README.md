# Sanjeev Kumar ❤️ Lovely Kumari — Wedding Invitation

A responsive wedding invitation website built with React, TypeScript and Vite.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production output is generated in `dist/`.

## Customize wedding details
Edit the `CONFIG` object near the top of `src/main.tsx` to update names, date, venue, address, map search, RSVP contact, music and event details. Replace photos in `public/` and the hero image in `public/images/` while keeping the referenced filenames.

## Deploy to Vercel
Import the GitHub repository into Vercel. Use the Vite defaults: Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`. No environment variables are required for the current static demo.

## RSVP note
The current RSVP form saves submissions only in the visitor's browser using local storage. It does not send submissions to the couple or a shared database. Connect a backend before relying on it for real guest responses.
