#!/bin/bash
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
echo "Deploying server..."
echo "Installing dependencies..."
npm i
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Creating symlink..."
ln -s $DIR /var/sps
echo "Copying service files..."
cp $DIR/*.service /etc/systemd/system/
echo "Reloading services..."
systemctl daemon-reload
echo "Enabling services..."
systemctl enable sps-backend sps-update sps-api
echo "Starting services..."
systemctl start sps-backend sps-update sps-api
echo "Done!"
