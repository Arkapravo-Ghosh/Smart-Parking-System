#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
echo "Deploying client..."
echo "Installing dependencies..."
npm i
echo -n "Enter API_URL: "
read API_URL
echo "VITE_API_URL=$API_URL" > .env
echo "Building client..."
npm run build
if ! [ -x "$(command -v nginx)" ]; then
  echo "Installing nginx..."
  apt-get install -y nginx
fi
echo "Removing old files..."
rm -rf /var/www/html/*
echo "Copying new files..."
cp -r dist/* /var/www/html/
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html
echo "Restarting nginx..."
systemctl restart nginx
echo "Done!"
