#!/usr/bin/env bash
set -e -o pipefail
sudo systemctl start docker
docker network create mdb-net || true

# Uncomment this to recreate database .container.
./script-db-container.sh
./script-app-container.sh
./script-backup-db-cron.sh

echo ====[ Successfully installed started mdb service. ]====
