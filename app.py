from flask import Flask, request, jsonify
from flask_cors import CORS # Dodajemy dla CORS

app = Flask(__name__)
CORS(app) # Włączamy CORS dla wszystkich ścieżek

# Prosta lista w pamięci do przechowywania zadań
tasks = []
next_id = 1

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """Zwraca listę wszystkich zadań."""
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    """Dodaje nowe zadanie do listy."""
    global next_id
    if not request.json or not 'title' in request.json:
        return jsonify({'error': 'Tytuł zadania jest wymagany'}), 400

    new_task = {
        'id': next_id,
        'title': request.json['title'],
        'done': False
    }
    tasks.append(new_task)
    next_id += 1
    return jsonify(new_task), 201 # Zwracamy nowo dodane zadanie i status 201 Created

# Opcjonalnie: endpoint do testowania (np. http://localhost:5000/)
@app.route('/')
def index():
    return "Backend TODO API działa!"

if __name__ == '__main__':
    # Uruchomienie serwera Flask na porcie 5000
    app.run(debug=True, host='0.0.0.0', port=5000)