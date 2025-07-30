# Firebase Setup for Volunteer Authentication

## Overview
The volunteer authentication system is now fully implemented with Firebase. This guide will help you set up Firebase for your project.

## Firebase Project Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "aidbridge-volunteer")
4. Follow the setup wizard

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

### 3. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 4. Get Firebase Config
1. In Firebase Console, go to "Project settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → "Web"
4. Register your app with a nickname
5. Copy the config object

### 5. Add Environment Variables
Create a `.env` file in your project root with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

## Features Implemented

### ✅ Authentication Flow
- **Sign Up**: Name, Email, Mobile, Location, City, Password
- **Email Verification**: Automatic verification email sent
- **Login**: Email and password authentication
- **Identity Verification**: Post-signup verification screen
- **NGO Interest Form**: Multi-select interest areas

### ✅ Database Structure
```
volunteers/
  {userId}/
    name: string
    email: string
    mobile: string
    location: string
    city: string
    isVerified: boolean
    ngoInterests: string[]
```

### ✅ Routes Added
- `/volunteer/signup` - Volunteer registration
- `/volunteer/login` - Volunteer login
- `/volunteer/verify` - Identity verification
- `/volunteer/interests` - NGO interest selection

## Security Rules (Firestore)

Add these security rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /volunteers/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Testing the Flow

1. **Start the development server**: `npm run dev`
2. **Visit**: `http://localhost:5173/volunteer`
3. **Click "Sign Up"** to test the registration flow
4. **Check your email** for verification link
5. **Test login** with your credentials

## Components Created

- `VolunteerSignup.tsx` - Registration form with all required fields
- `VolunteerLogin.tsx` - Login form with email/password
- `IdentityVerification.tsx` - Verification screen with image and text
- `NGOInterestForm.tsx` - Interest selection form
- `AuthContext.tsx` - Authentication state management

## Next Steps

1. **Add your Firebase config** to the `.env` file
2. **Test the authentication flow**
3. **Customize the UI** as needed
4. **Add more features** like password reset, profile management
5. **Deploy to production** with proper security rules

The volunteer authentication system is now ready to use! 🎉 