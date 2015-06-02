#!/bin/bash

git status
read -p "Ready to update site (y/N)? "
if [ a$REPLY = 'aY' -o a$REPLY = 'ay' -o a$REPLY = 'aYES' -o a$REPLY = 'ayes' ]; then
  git commit -m "$(date "+Site updated: %Y/%m/%d %H:%M")"
  git push
else
  echo "Canceled update site!"
fi

