# Firebase Connection Troubleshooting Guide

## Current Issue
You're experiencing 400 errors when trying to connect to Firestore:
```
Failed to load resource: the server responded with a status of 400 ()
@firebase/firestore: Firestore (12.0.0): WebChannelConnection RPC 'Listen' stream transport errored
```

## Possible Causes & Solutions

### 1. Firestore Not Enabled
**Problem**: Firestore database is not created in your Firebase project.

**Solution**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `aidbridge-3ad6b`
3. In the left sidebar, click "Firestore Database"
4. Click "Create database"
5. Choose "Start in test mode" (for development)
6. Select a location (choose the closest to your users)

### 2. Security Rules Too Restrictive
**Problem**: Firestore security rules are blocking read/write access.

**Solution**:
1. Go to Firestore Database → Rules
2. Temporarily use these permissive rules for testing:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
3. Click "Publish"

### 3. Project Configuration Issues
**Problem**: Firebase project settings are incorrect.

**Solution**:
1. Go to Project Settings (gear icon)
2. Verify your project ID: `aidbridge-3ad6b`
3. Check that the web app is properly registered
4. Verify the API key and other credentials

### 4. Network/SSL Issues
**Problem**: Browser security or network issues.

**Solution**:
1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Check if your network blocks Firebase domains
4. Try a different browser

## Testing Steps

### Step 1: Test Connection
1. Navigate to `/firebase-test` in your app
2. Check the console for detailed error messages
3. Look for the test component output

### Step 2: Check Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/project/aidbridge-3ad6b)
2. Check if Firestore Database exists
3. Verify security rules
4. Check project settings

### Step 3: Verify Configuration
Your current Firebase config:
```javascript
{
  apiKey: "AIzaSyBc0H1EIaZzS9NsfZ-1DZ57pVhkVMCKZOM",
  authDomain: "aidbridge-3ad6b.firebaseapp.com",
  projectId: "aidbridge-3ad6b",
  storageBucket: "aidbridge-3ad6b.firebasestorage.app",
  messagingSenderId: "328486681463",
  appId: "1:328486681463:web:5711004c450d787e687f72"
}
```

## Quick Fixes to Try

### Fix 1: Enable Firestore
If Firestore is not enabled, this is the most likely cause.

### Fix 2: Update Security Rules
Use test mode rules temporarily:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Fix 3: Check Project Status
Ensure your Firebase project is active and not suspended.

## Next Steps
1. Visit `/firebase-test` to see detailed error information
2. Check the Firebase Console for Firestore status
3. Update security rules if needed
4. Test the connection again

## Common Error Messages
- **400 Bad Request**: Usually security rules or Firestore not enabled
- **403 Forbidden**: Security rules blocking access
- **Network errors**: Connectivity or SSL issues 