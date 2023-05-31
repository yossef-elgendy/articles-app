FROM php:8.1-apache

WORKDIR /app/articles-app

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

RUN chmod +x /usr/local/bin/composer

RUN composer install

EXPOSE 8000

CMD ["apache2-foreground"]
