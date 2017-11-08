#!/bin/bash
docker-compose build website
docker-compose build screenshot
docker-compose run composer
docker-compose up -d
./website/runUpdates.sh
