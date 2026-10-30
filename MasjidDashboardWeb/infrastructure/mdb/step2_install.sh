#!/usr/bin/env bash
docker network create mdb-net
set -e -o pipefail
sudo systemctl start docker
# Uncomment this to recreate database .container.
./script-db-container.sh
./script-app-container.sh
./script-backup-db-cron.sh

echo ====[ Successfully installed started mdb service. ]====
