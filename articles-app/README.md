# Laravel Project

This is a Laravel project for managing articles.

## Prerequisites

- PHP (>= 7.4)
- Composer

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yossef-elgendy/articles-app.git

2. Navigate to the project directory:

    ```bash
    cd articles-app

2. Navigate to the project directory:

    ```bash
    cd articles-app

3. Install dependencies:

    ```bash
    composer install

4. Create a .env file if it doesn't exist:

    ```bash
    cp .env.example .env

5. Generate an application key:

   Run database migrations

6. Set up the database:

   - Create a new database for the project.
   - Update the .env file with your database credentials.

7. Run database migrations:

    ```bash
    php artisan migrate

8. Start the development server:

   ```bash
    php artisan serve
## Usage
- Access the application in your web browser using the URL: http://localhost:8000.
- Now the BE is available for FE to access it.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/)
