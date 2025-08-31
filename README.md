# RelayWire - RealTime Chat App

RelayWire is a full-stack real-time chat application built with React and Node.js/Express, featuring instant messaging, user authentication, profile management, and theme customization.

## Key Features

- **Real-Time Messaging:** Instant chat powered by Socket.IO.
- **User Authentication:** Secure signup, login, and logout flows.
- **Profile Management:** Update profile picture with Cloudinary integration.
- **Online Status:** See which users are online in the sidebar.
- **Theme Customization:** Choose from 30+ DaisyUI themes for a personalized chat experience.
- **Responsive UI:** Modern, mobile-friendly interface using Tailwind CSS and DaisyUI.
- **Image Sharing:** Send images in chat messages.
- **Protected Routes:** Only authenticated users can access chat and profile pages.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Sample `.env` for Backend

```env
MONGODB_URI=
PORT=5001
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NODE_ENV=development
```

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Prakhar140303/Whispr-chat-app.git
   cd RealTime-chat-app
   ```

2. **Backend Setup:**
   - Add your environment variables to `backend/.env` (see sample above)
   - Install dependencies:
     ```sh
     cd backend
     npm install
     ```
   - For development mode, start the backend server:
     ```sh
     npm run dev
     ```

3. **Frontend Setup:**
   - Install dependencies:
     ```sh
     cd ../frontend
     npm install
     ```
   - For development mode, start the frontend server:
     ```sh
     npm run dev
     ```

### Running in Development Mode

- Start both frontend and backend servers separately:
  - In `backend/`: `npm run dev`
  - In `frontend/`: `npm run dev`
- Access the app at [http://localhost:5173](http://localhost:5173)

### Running in Production Mode

- From the project root, build the frontend and install dependencies:
  ```sh
  npm run build
  ```
- Start the backend server (serves both backend and built frontend):
  ```sh
  npm run start
  ```
- Access the app at [http://localhost:5001](http://localhost:5001)

### Deployed Link

- Access the deployed app here: [https://relaywire.onrender.com/](https://relaywire.onrender.com/)

## Technologies Used

- **Frontend:** React, Vite, Zustand, DaisyUI, Tailwind CSS, React Router, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, Cloudinary, JWT, bcryptjs
- **Other:** Axios, react-hot-toast

## License

This project