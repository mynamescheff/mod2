# Używamy lekkiego obrazu Nginx opartego na Alpine Linux
FROM nginx:alpine

# Kopiujemy pliki frontendu do domyślnego katalogu Nginx do serwowania statycznych plików.
# Zakładamy, że Dockerfile jest w tym samym katalogu co index.html, script.js i style.css.
# /usr/share/nginx/html/ to domyślna lokalizacja dla plików statycznych w obrazie nginx:alpine.
COPY index.html /usr/share/nginx/html/index.html
COPY script.js /usr/share/nginx/html/script.js
COPY style.css /usr/share/nginx/html/style.css


# Informujemy Dockera, że kontener będzie nasłuchiwał na porcie 80 (domyślny port HTTP Nginxa)
EXPOSE 80

# Domyślne polecenie Nginxa w obrazie bazowym jest wystarczające do uruchomienia serwera,
# więc nie musimy go jawnie definiować, chyba że chcielibyśmy zmodyfikować konfigurację Nginxa.
# CMD ["nginx", "-g", "daemon off;"] # To jest domyślna komenda w obrazie nginx:alpine