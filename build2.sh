#!/bin/bash
docker exec -it $1 mv /var/www/html/envprod /var/www/html/.env
docker exec -it $1 chmod -R 777 /var/www/html/storage
docker exec -it $1 chmod -R 777 /var/www/html/bootstrap/cache
docker exec -it $1 php artisan key:generate
docker exec -it $1 php artisan config:clear
docker exec -it $1 php artisan config:cache
