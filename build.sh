#!/bin/bash
docker-compose build website
docker-compose build screenshot
docker-compose run composer
docker-compose up -d
docker ps


sleep 10

docker exec -it docker_website_1 mv /var/www/html/envprod /var/www/html/.env
docker exec -it docker_website_1 chmod -R 777 /var/www/html/storage
docker exec -it docker_website_1 chmod -R 777 /var/www/html/bootstrap/cache
docker exec -it docker_website_1 php artisan key:generate
docker exec -it docker_website_1 php artisan config:clear
docker exec -it docker_website_1 php artisan config:cache
