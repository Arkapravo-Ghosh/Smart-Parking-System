#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
npm run build
rm -rf /var/www/html/*
cp -r dist/* /var/www/html/
