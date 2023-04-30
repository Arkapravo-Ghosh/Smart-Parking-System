#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
echo "Deploying client..."
echo "Installing dependencies..."
npm i
# Ask for API_URL and write it to .env
echo "Enter API_URL: "
read -s API_URL
echo "API_URL=$API_URL" > .env
echo "Building client..."
npm run build
echo "Removing old files..."
rm -rf /var/www/html/*
echo "Copying new files..."
cp -r dist/* /var/www/html/
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html
echo "Done!"
