# Virtual-Assistant

A simple full-stack virtual assistant project built with a Node.js/Express backend and a Vite + React frontend. This repository contains two folders: `Backend` (API + auth) and `Frontened` (React client).

## Key features

- User authentication and profile management (backend controllers & routes present)
- File upload handling (multer middleware)
- Cloudinary integration for media (see `Backend/config/cloudinary.js`)
- JWT-based token handling (see `Backend/config/token.js`)

## Tech stack

- Backend: Node.js, Express, MongoDB (mongoose), Cloudinary
- Frontend: React (Vite)
- Dev tools: nodemon (recommended for backend), Vite dev server for frontend

## Repository structure

- `Backend/` - Express API server
  - `index.js` - app entry
  - `controllers/` - route handlers (auth, user)
  - `models/` - Mongoose models
  - `routes/` - Express routes
  - `middlewares/` - middleware (auth, multer)
  - `config/` - DB, Cloudinary, token configuration

- `Frontened/` - React client (Vite)
  - `src/` - React source files
  - `src/context/UserContext.jsx` - user context
  - `src/pages/` - pages (signin, signup, home, Customize)

> Note: The frontend folder is named `Frontened` in this repo.

## Environment variables

Create a `.env` file in the `Backend` folder (and in frontend if applicable) and set the following values. These are example names — adapt to match the values used in `Backend/config/*.js` if different.

- MONGO_URI - MongoDB connection string
- JWT_SECRET - secret key used for signing JWTs
- CLOUDINARY_CLOUD_NAME - Cloudinary cloud name
- CLOUDINARY_API_KEY - Cloudinary API key
- CLOUDINARY_API_SECRET - Cloudinary API secret
- PORT - backend server port (optional, defaults often to 5000)

If the frontend makes API calls to the backend, set a variable like:

- VITE_API_URL (or REACT_APP_API_URL) - URL of backend API (e.g., http://localhost:5000)

## Setup & run (local)

Prerequisites: Node.js (16+ recommended), npm, a running MongoDB instance or MongoDB Atlas.

Backend (from repo root):

```powershell
cd Backend
npm install
# start in development (if package.json has a dev script, e.g., nodemon)
npm run dev
# or to run directly
node index.js
```

Frontend (from repo root):

```powershell
cd "Frontened"
npm install
npm run dev
# Vite should start and open the app at http://localhost:5173 (or another port)
```

If the frontend needs to call the backend, ensure the frontend's API base URL points at the running backend (e.g., http://localhost:5000).

## Common Troubleshooting

- "Cannot connect to MongoDB": verify `MONGO_URI` and network access to the database.
- Cloudinary upload errors: confirm Cloudinary env vars and that uploads are allowed from your account.
- CORS errors: ensure backend includes CORS middleware and that the frontend origin is allowed.

## Tests

This repository does not include automated tests by default. Consider adding simple integration tests for the API and unit tests for critical frontend logic.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description of changes

## License

Add a license of your choice (e.g., MIT). This README does not include a license by default.

## Contact

If you need help or want me to expand this README (add badges, CI, or deployment steps), tell me what you want and I will update the file.
