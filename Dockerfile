FROM php:8.2-cli
WORKDIR /app
COPY . /app

# debug: laat Render in de logs tonen wat er in /app zit
RUN ls -la /app

# /app is je webroot
CMD ["sh","-c","php -S 0.0.0.0:${PORT:-10000} -t /app"]
