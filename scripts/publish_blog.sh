#!/bin/bash
set -e

echo ">>> ensuring directory structure..."
mkdir -p public/assets

# 1. Run Node script to insert data into SQLite
echo ">>> Inserting Blog Post..."
if [ ! -f "public/db_temp.sqlite" ]; then
    echo "⚠️  DB file missing. Creating new one..."
    # Optionally run create_db.js first if you want the full seed
    # node scripts/create_db.js 123abc
fi

node scripts/add_daily_log.js

# 2. Calculate Size
DB_SIZE=$(wc -c < public/db_temp.sqlite | xargs)
echo ">>> Database Size: $DB_SIZE bytes"

# 3. Generate Config
echo "{ 
  \"serverMode\": \"full\", 
  \"requestChunkSize\": 4096, 
  \"url\": \"/assets/db.sqlite\" 
}" > public/assets/config.json

# 4. Publish Assets
cp public/db_temp.sqlite public/assets/db.sqlite

echo "-------------------------------------------------------"
echo "✅ Blog Published Successfully"
echo "-------------------------------------------------------"
