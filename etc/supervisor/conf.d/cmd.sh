#!/bin/bash

# supervisordを起動。
/usr/bin/supervisord -c /etc/supervisor/supervisord.conf

# 元のコンテナの「ENTRYPOINT 引数CMD」と同じのを実行。
docker-php-entrypoint php-fpm
