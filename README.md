# Full-Stack Dynamic Blog Application

A feature-rich **Full-Stack Dynamic Blog Application** built with modern technologies. This application allows users to securely log in via Google, GitHub, or traditional email/password, manage their blogs, and view them in real time. It includes dynamic blog creation, editing, deletion features, and integrates a contact form, newsletter functionality, and a responsive user interface. 

## 🚀 Features

- **Authentication Options**:
  - Secure login/signup via **Google**, **GitHub**, and traditional **email-password** authentication.
  
- **Admin Panel**:
  - Each user has a personalized admin panel to create, update, and delete their blogs.

- **Dynamic Blog Display**:
  - Newly created blogs appear instantly on the blogs page for all users to view.

- **Database Integration**:
  - Blogs and user data are stored and managed in a database (MongoDB or Firebase).
  
- **Contact Form & Newsletter**:
  - A fully functional contact form with **Gmail** integration for real-time email notifications.
  - **Newsletter functionality** to subscribe and send updates to users.

- **Responsive UI**:
  - A modern, mobile-first design ensuring a seamless experience across all devices.

## 🛠️ Technologies Used

- **Frontend**:
  - React.js
  - Next.js
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion
  - Typescript

- **Backend**:
  - Node.js
  
- **Authentication**:
  - Auth0 

- **Database**:
  - Firebase

- **Email**:
  - Gmail API for contact form integration

- **Deployment**:
  - Heroku / Vercel / Netlify (depending on your deployment platform)

## ⚡ Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Firebase setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tahasaif3/Milestone-4-Dynamic-Blog-Website-Project.git
cd Milestone-4-Dynamic-Blog-Website-Project 
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

or if using **yarn**:

```bash
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
MONGODB_URI=your-mongodb-uri (or Firebase credentials)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-email-password
```

> Replace the placeholders with actual values from your Google, GitHub, Firebase, and Gmail API credentials.

### 4. Run the Application

To start the development server:

```bash
npm run dev
```

or if using **yarn**:

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

## 📝 Usage

1. **Sign up or log in** via Google, GitHub, or email/password.
2. **Create, update, or delete blogs** from your personal admin panel.
3. **View blogs** created by all users in the "Blogs" section, with the most recent ones appearing at the top.
4. **Subscribe to the newsletter** to receive updates.
5. **Send a message** via the contact form.

## 📂 Folder Structure

```
├── components/        # React components (UI elements, forms, etc.)
├── app/             # Next.js page routes (Home, Blog, Admin Panel, etc.)
├── public/            # Static files like images, icons, etc.
├── styles/            # Global CSS styles and Tailwind configuration
├── utils/             # Helper functions (email sending, authentication, etc.)
├── .env               # Environment variables (Firebase, Google OAuth, etc.)
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation (this file)
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgements

- **Next.js**: A powerful React framework used for building the app.
- **Firebase**: For authentication and database management.
- **Tailwind CSS**: A utility-first CSS framework used for styling.
