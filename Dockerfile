FROM php:8.2-cli
WORKDIR /app
COPY . /app
# Render geeft je $PORT; val terug op 10000 voor lokaal
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-10000} -t ."]
