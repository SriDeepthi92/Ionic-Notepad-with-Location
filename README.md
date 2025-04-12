# Ionic Notepad with Location

## Overview
This is an Ionic-based mobile application that functions as a notepad with location tracking capabilities. Users can create, edit, and save notes while associating them with their current geographic location. The app is built using Angular and Ionic Framework, making it cross-platform and mobile-friendly.

---

## Features
- **Create and Edit Notes**:
  - Users can create and edit text notes.
- **Location Tracking**:
  - Automatically associates the user's current location (latitude and longitude) with each note.
- **Cross-Platform**:
  - Runs on both Android and iOS devices.
- **Ionic Framework**:
  - Provides a responsive and mobile-friendly UI.
- **Angular Integration**:
  - Built with Angular for modular and scalable development.

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/ionic-notepad-with-location.git
cd ionic-notepad-with-location
```

### 2. Install Dependencies
Install the required npm packages:
```bash
npm install
```

### 3. Run the Application
To run the app in a development environment:
```bash
ionic serve
```

### 4. Build for Production
To build the app for production:
```bash
ionic build --prod
```

---

## Project Structure
```
Ionic-Notepad-with-Location/
├── src/
│   ├── app/
│   │   ├── app.module.ts       # Main application module
│   │   ├── app.component.ts    # Root component
│   ├── environments/
│   │   ├── environment.ts      # Development environment configuration
│   │   ├── environment.prod.ts # Production environment configuration
│   ├── pages/
│   │   ├── home/               # Home page for managing notes
│   │   ├── location/           # Location tracking functionality
│   ├── assets/                 # Static assets (e.g., icons, images)
│   ├── main.ts                 # Application entry point
│   ├── index.html              # Main HTML file
│   ├── styles.css              # Global styles
├── package.json                # Node.js dependencies
├── ionic.config.json           # Ionic configuration
```

---

## Key Files

### 1. **`main.ts`**
The entry point for the application. It bootstraps the `AppModule` and enables production mode if the app is running in a production environment.

#### Code:
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

---

### 2. **`environment.ts`**
Defines environment-specific configurations for development.

#### Code:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

---

### 3. **`environment.prod.ts`**
Defines environment-specific configurations for production.

#### Code:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

---

## Dependencies
- **Ionic Framework**: Provides UI components and tools for building mobile apps.
- **Angular**: Framework for building scalable web applications.
- **Cordova/Capacitor**: For accessing native device features like GPS.
- **Geolocation Plugin**: For retrieving the user's current location.

Install all dependencies using:
```bash
npm install
```

---

## Usage

### 1. Add a Note
- Navigate to the home page.
- Click the "Add Note" button.
- Enter the note content and save.

### 2. Track Location
- The app will automatically fetch and display the user's current location (latitude and longitude) when creating or editing a note.

---

## Build and Deployment

### 1. Build for Android
```bash
ionic capacitor build android
```

### 2. Build for iOS
```bash
ionic capacitor build ios
```

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
