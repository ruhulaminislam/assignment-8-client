# StudioSpace — Creative Workspace Booking Platform

**Live Website:** https://assignment-8-client.vercel.app/

StudioSpace is a peer-to-peer creative workspace marketplace where creators can discover, explore, and book creative studios and workspaces. Studio owners can list their spaces and manage their studio listings.

## ✨ Key Features

- **Authentication:** User registration and login with Better Auth.
- **Studio Discovery:** Browse and explore available creative studios.
- **Studio Management:** Add, update, view, and delete studio listings.
- **Studio Details:** View studio descriptions, images, amenities, pricing, and host information.
- **Booking System:** Book available creative workspaces.
- **My Listings:** Manage personal studio listings.
- **My Bookings:** View booking information.
- **JWT Security:** Protect selected backend APIs using JWT authentication and HTTPOnly cookies.
- **Toast Notifications:** Display success and error feedback for user actions.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth

### Backend Integration
- Node.js
- Express.js
- MongoDB
- JWT
- jose

## ⚙️ Local Setup

### 1. Clone the Client Repository

```bash
git clone https://github.com/ruhulaminislam/assignment-8-client.git
cd assignment-8-client
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the client project root.

Add the required variable names from your project configuration:

```env
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=YOUR_BETTER_AUTH_URL
NEXT_PUBLIC_SERVER_URL=YOUR_SERVER_URL

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
```

**Security Note:** Never commit real secrets, database connection strings, or private API keys to GitHub. Keep server-only credentials out of browser-accessible code. Only expose variables with the `NEXT_PUBLIC_` prefix when they are safe to be public.

### 3. Start the Client

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

## 🧪 Examiner Test Credentials

**Regular User Account**

- Email: `jssujon42768@gmail.com`
- Password: Provided separately to the examiner for security.

There is no separate Admin test account.

## 📌 Project Links

- **Live Website:** https://assignment-8-client.vercel.app/
- **Client Repository:** https://github.com/ruhulaminislam/assignment-8-client
- **Server Repository:** https://github.com/ruhulaminislam/assignment-8-server
- **Live Backend API:** https://assignment-8-server-six.vercel.app/

## 👨‍💻 Developer

Developed as part of the Programming Hero Assignment — StudioSpace.
