#!/bin/bash
set -e
cd "$(dirname "$0")"

# This script will refresh the project caches and libraries
# Usage: ./script-clean-all.sh [--deep]
#   --deep also clears ~/.gradle/caches (next Android build re-downloads everything)

rm -rf ~/Library/Developer/Xcode/DerivedData/MasjidDashboardMobile-*
rm -rf ios android .expo
rm -rf node_modules package-lock.json
rm -rf "${TMPDIR:-/tmp}"/metro-* "${TMPDIR:-/tmp}"/haste-map-*
watchman watch-del-all 2>/dev/null || true
rm -rf ~/Library/Caches/CocoaPods

if [ "$1" == "--deep" ]; then
  rm -rf ~/.gradle/caches
fi

(cd ../mdb-core-js && npm install && npm run build)
npm install
npx expo prebuild --clean
