FROM php:8.1.0-apache

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install -y \
        libonig-dev \
        libxml2-dev \
        libzip-dev \
        unzip \
        && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath && \
    a2enmod rewrite

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage && \
    chmod -R 775 /var/www/html/bootstrap/cache && \
    cp .env.example .env && \
    php artisan key:generate

RUN composer install --optimize-autoloader --no-dev && \
    php artisan migrate

EXPOSE 80

CMD ["apache2-foreground"]
