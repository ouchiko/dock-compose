#!/bin/bash

docker exec -it $1 bash chmod -R 777 /var/www/html/storage
docker exec -it $1 bash chmod -R 777 /var/www/html/bootstap/cache
docker exec -it $1 bash php artisan key:generate
docker exec -it $1 bash php artisan config:clear
docker exec -it $1 bash php artisan config:cache
