# E-Boto

E-Boto is a modern voting application designed to provide a secure, user-friendly, and efficient platform for managing elections and voting processes. Built with React Native, it offers a seamless experience for both voters and administrators.

## Features

-   User authentication (login, registration)
-   Ongoing and upcoming elections dashboard
-   Candidate and election details
-   Secure voting process
-   Real-time results and statistics
-   Responsive and modern UI

## Project Structure

```
assets/           # Images, fonts, and other static assets
src/
  components/     # Reusable UI components
  config/         # API and app configuration
  navigation/     # Navigation setup
  pages/          # App screens and pages
  services/       # API and business logic
  styles/         # Style definitions
  utils/          # Utility functions
App.js            # App entry point
package.json      # Project metadata and dependencies
```

## Getting Started

### Prerequisites

-   Node.js (v16 or later)
-   npm or yarn
-   Expo CLI (if using Expo)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd E-Boto
    ```
2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```
3. Start the development server:
    ```sh
    npx expo start
    ```
4. To run the app on your mobile device using Expo Go:
    - Download the Expo Go app from the App Store (iOS) or Google Play Store (Android).
    - Run `npx expo start` in your project directory.
    - Scan the QR code displayed in your terminal or browser using the Expo Go app.

## Environment Variables

Create a `.env` file in the root directory to store sensitive information such as API keys. **Do not commit your `.env` file to version control.**

## Scripts

-   `npm start` — Start the development server
-   `npm run android` — Run on Android device/emulator
-   `npm run ios` — Run on iOS simulator (Mac only)
-   `npm run web` — Run in web browser

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## .gitignore

Make sure your `.gitignore` file includes the following:

```
node_modules/
.env
*.log
.expo/
dist/
build/
```
