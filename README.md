# Docker + Microservices + Laravel + Node

Building together various elements into Docker.  This is a test project.

This provides four services, 

    1. A Hotel Server
    2. An Image Server
    3. A Screen shot service
    4. A Laravel Front end
    
The ```docker-compose.yml``` contains the build references to the project.

#### Screen Shot Service

This is a small implementation of Headless Chrome via Node which provides the requester with a screen shot of a web page.  This implementation contains it's own Dockerfile to build the requirements for this project.

#### Website Service

This contains a laravel installation.


#### Build file
This builds the two images, runs composer against the requirements for Laravel and brings up the services.
Ensure the build is up and run some actions on the Laravel instance to ensure various elements are working.

Visiting localhost:81 will now provide a response from the Hotel and Image service.

Visiting localhost:81/images?url=http://www.bbc.co.uk will bring back a screen shot.

```
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
```

