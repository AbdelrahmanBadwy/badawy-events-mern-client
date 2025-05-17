# Frontend Setup (client)

This is the frontend for the project, built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Linting

To check for lint errors, run:

```bash
npm run lint
```

## API Proxy

API requests to `/api` are proxied to the backend server at `http://localhost:3000` (see `vite.config.ts`).

## Environment Variables

If your app requires environment variables (e.g., for Firebase, Stripe, etc.), create a `.env` file in the `client` directory. Example:

```
VITE_API_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
# Add other variables as needed
```

> **Note:** Prefix all environment variables with `VITE_` to make them accessible in the frontend code.

## Troubleshooting

- Make sure the backend server is running on `http://localhost:3000` for API requests to work.
- If you change the backend port, update the proxy target in `vite.config.ts`.

---

For any issues, please contact me.
