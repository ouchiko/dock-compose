FROM php:7.0-apache

RUN apt-get update
RUN apt-get install -y git

RUN a2enmod rewrite

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

#RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
#RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN rm -rf /etc/apache2/sites-available/*.conf
COPY config/apache.conf /etc/apache2/sites-available/000-default.conf

RUN cat /etc/apache2/sites-available/*.conf

WORKDIR /var/www/html
COPY ./src/webcoding .
RUN ls -l

RUN php composer.phar install


#COPY config/php.ini /usr/local/etc/php/
