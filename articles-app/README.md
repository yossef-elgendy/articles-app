# Laravel Project

This is a Laravel project for managing articles.

## Prerequisites

- PHP (>= 7.4)
- Composer

## Getting Started

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

   ```bash
    php artisan serve
## Usage
- Access the application in your web browser using the URL: http://localhost:8000.
- Now the BE is available for FE to access it.

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

## License
This project is licensed under the [MIT License](LICENSE)
