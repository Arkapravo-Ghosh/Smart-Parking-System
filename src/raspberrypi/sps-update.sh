#!/bin/bash

on_change_command="systemctl restart sps-backend"

while true
do
  inotifywait -e close_write /etc/sps-pins.conf && eval $on_change_command
done
