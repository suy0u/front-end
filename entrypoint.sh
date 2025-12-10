#!/bin/sh
set -e

echo "--------------------------------------"
echo " Starting React Frontend Service"
echo " Service name: ${VITE_APP_NAME:-Frontend Service}"
echo " APP URL     : http://${SERVER_HOST:-localhost}:${SERVER_PORT:-80}"
echo " APP NAME    : ${VITE_APP_NAME:-not set}"
echo " API URL     : ${VITE_API_URL:-not set}"
echo "--------------------------------------"

echo "Starting nginx..."
nginx -g "daemon off;"