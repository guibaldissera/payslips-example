# Payslips

A mobile application built with React Native and Expo for viewing and managing employee payslips. The app provides a clean interface to browse payslip documents, view details, and download them for offline access.

## Installation

This project uses [Bun](https://bun.sh) as the package manager and runtime.

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun start
   ```

3. Run on specific platforms:

   ```bash
   bun run android  # Run on Android emulator
   bun run ios      # Run on iOS simulator
   bun run web      # Run on web browser
   ```

In the output, you'll find options to open the app in:

- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) app

## Running Tests

Run the test suite using Jest:

```bash
bun test              # Run tests once
bun run test:watch    # Run tests in watch mode
```

## Technologies Used

### Core Framework

- **React Native** - Cross-platform mobile development framework
- **Expo** (~54.0) - Development platform and tooling for React Native
- **Expo Router** - File-based routing for navigation
- **TypeScript** - Type-safe JavaScript

### Features

- **Expo File System** - File management and storage
- **Expo Sharing** - Share payslips with other apps

### Testing

- **Jest** - Testing framework
- **React Native Testing Library** - Component testing utilities

### Development Tools

- **ESLint** - Code linting with Expo config
- **Bun** - Fast package manager and runtime

## Limitations and What to Improve

### Bugs

- **Web**: Download images when running the web version

### Current Limitations

- **Mock Data**: The app currently uses static mock payslip data instead of connecting to a real backend API, using a delay to simulate loading state
- **Limited File Formats**: Only supports image-based payslips
- **No Search/Filter**: Lacks search and filtering capabilities for payslips
- **Offline Storage**: Downloaded payslips are not persisted between app sessions
- **Android version**: My Android environment is with some storage problems and I haven't tested the app thoroughly on it

### Potential Improvements

- **Backend Integration**: Connect to a real API for fetching payslips dynamically
- **Authentication**: Implement secure login with JWT or OAuth
- **PDF Support**: Add support for PDF payslip documents
- **Features**:
  - Search and filter payslips by date, amount, or status
  - Export multiple payslips at once
  - Dark mode support
- **Performance**: Implement pagination for large payslip lists
- **Accessibility**: Improve screen reader support and accessibility features
