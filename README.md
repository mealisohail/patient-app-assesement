# Patient Registration App

A React-based frontend-only app for patient registration and querying using PGlite for local data storage.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd patient-registration-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open `http://localhost:5173` in your browser.

## Usage

- **Register Patients**: Fill out the form with first name, last name, date of birth, and email, then click "Register Patient".
- **Query Records**: Enter SQL queries (e.g., `SELECT * FROM patients WHERE first_name = 'John'`) and click "Execute Query" to view results.
- Data persists across page refreshes and supports multiple browser tabs.

## Features

- Patient registration with input validation.
- SQL-based querying of patient records.
- Data persistence using PGlite with IndexedDB.
- Multi-tab support for concurrent access.
