FROM php:7.0-apache

RUN apt-get update
RUN apt-get install -y git zip unzip

RUN a2enmod rewrite

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

#RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
#RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN rm -rf /etc/apache2/sites-available/*.conf
COPY config/apache.conf /etc/apache2/sites-available/000-default.conf

RUN cat /etc/apache2/sites-available/*.conf

RUN php artisan key:generate
RUN php artisan config:clear
RUN php artisan config:cache


WORKDIR /var/www/html
#COPY ./src/webcoding .
#RUN ls -l /var/www/html
#RUN mkdir /var/www/html/vendor
#RUN chmod 777 /var/www/html/vendor
#RUN ls -l /src/webcoding/vendor

#RUN php composer.phar update --no-scripts
#RUN php composer.phar install
#RUN php composer.phar update --no-scripts

#RUN ls -l /var/www/html/vendor

#COPY config/php.ini /usr/local/etc/php/
