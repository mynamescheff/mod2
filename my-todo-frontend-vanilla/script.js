// Adres URL do backendu. WAŻNE: Na tym etapie używamy localhost:5000
// W Kubernetes ten adres się zmieni!
//
// const API_URL = 

// Adres URL do backendu. W Kubernetesie używamy nazwy Serwisu backendu
// Nazwa_Serwisu:Port_Serwisu (wewnątrz klastra)
const API_URL = 'http://192.168.49.2:31668/tasks'; // Poprawiono adres URL

// Pobieramy referencje do elementów DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const tasksList = document.getElementById('tasks-list');

// Funkcja do pobierania zadań z backendu i renderowania ich na stronie
const fetchAndRenderTasks = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tasks = await response.json();

        // Czyścimy obecną listę zadań
        tasksList.innerHTML = '';

        // Renderujemy zadania na liście
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task.title; // Wyświetlamy tylko tytuł
            // Można by dodać przyciski do oznaczania jako wykonane/usuwania itp.
            tasksList.appendChild(listItem);
        });

    } catch (error) {
        console.error("Błąd podczas pobierania zadań:", error);
        // Opcjonalnie: wyświetlić komunikat o błędzie na stronie
        tasksList.innerHTML = '<li>Błąd podczas ładowania zadań.</li>';
    }
};

// Funkcja do obsługi wysyłania formularza (dodawanie nowego zadania)
const handleAddTask = async (event) => {
    event.preventDefault(); // Zapobiega domyślnej akcji formularza (przeładowanie strony)

    const title = taskTitleInput.value.trim(); // Pobiera wartość z pola input i usuwa białe znaki

    if (!title) { // Sprawdza czy pole nie jest puste
        alert('Tytuł zadania nie może być pusty!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title }), // Wysyła tytuł jako JSON
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        // Po udanym dodaniu zadania:
        taskTitleInput.value = ''; // Czyścimy pole input
        await fetchAndRenderTasks(); // Odświeżamy listę zadań na stronie
        console.log('Zadanie dodano pomyślnie');

    } catch (error) {
        console.error("Błąd podczas dodawania zadania:", error);
        alert("Wystąpił błąd podczas dodawania zadania."); // Informacja dla użytkownika
    }
};

// Dodajemy "listener" do formularza - funkcja handleAddTask uruchomi się po jego wysłaniu
taskForm.addEventListener('submit', handleAddTask);

// Pobieramy i renderujemy zadania przy pierwszym załadowaniu strony
document.addEventListener('DOMContentLoaded', fetchAndRenderTasks);