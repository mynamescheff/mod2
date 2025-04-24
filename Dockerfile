FROM python:3.12.10-slim

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Kopiujemy plik z zależnościami do katalogu roboczego
COPY requirements.txt .

# Instalujemy zależności. --no-cache-dir pomaga zmniejszyć rozmiar obrazu.
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy pozostały kod naszej aplikacji do katalogu roboczego
COPY app.py .

# Informujemy Dockera, że kontener będzie nasłuchiwał na porcie 5000
# Jest to port, na którym domyślnie uruchamia się nasza aplikacja Flask
EXPOSE 5000

# Definiujemy polecenie, które uruchomi naszą aplikację, gdy kontener wystartuje
# CMD przyjmuje listę argumentów polecenia
CMD ["python", "app.py"]