# Laravel and React App Repository

This repository contains a Laravel application and a Vite React application for managing articles.

## Prerequisites

- PHP (>= 7.4)
- Node.js (>= 14.x)
- Composer

## Project Structure

The project structure is as follows:

articles-app/
|- app/
|- bootstrap/
|- config/
|- database/
|- public/
|- resources/
|- tests/
|- .env.example
|- artisan
|- composer.json
|- README.md
|- server.php

articles-challenge-frontend/
|- public/
| |- index.html
|- src/
|-|-assets/
|-|-components/
|-|-pages/
|-|-store/
|-|-styles/
| |- App.js
| |- index.js
|- .gitignore
|- package.json
|- README.md
|- vite.config.js

- The `articles-app` directory contains the Laravel application.
- The `articles-challenge-frontend` directory contains the Vite React application.

Feel free to modify the project structure and files according to your needs.

## Laravel App

The Laravel application is located in the `articles-app` directory. To start the Laravel app, follow these steps:
1. Navigate to the project directory:

    ```bash
    cd articles-app

2. Install dependencies:

    ```bash
    composer install

3. Create a .env file if it doesn't exist:

    ```bash
    cp .env.example .env

4. Generate an application key:

   Run database migrations

5. Set up the database:

   - Create a new database for the project.
   - Update the .env file with your database credentials.

6. Run database migrations:

    ```bash
    php artisan migrate

7. Start the development server:


## React App
The Vite React application is located in the `articles-challenge-frontend` directory. To start the React app, follow these steps:

1. Navigate to the project directory:

    ```bash
    cd articles-challenge-frontend

2. Install dependencies:

    ```bash
    npm install

3. Start the development server:

    ```bash
    npm run dev

## License
This project is licensed under the [MIT License](LICENSE)
