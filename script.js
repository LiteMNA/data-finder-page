const titleText = "I HAVE YOUR DATA...";
const titleElement = document.getElementById('main-title');

// 1. Анимация печатающегося текста
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        titleElement.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true">_</span>';
        setTimeout(() => {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    } else {
        titleElement.innerHTML = text;
        if (typeof fnCallback == 'function') {
            fnCallback();
        }
    }
}

// 2. Получение расширенных данных
async function fetchSystemData() {
    try {
        // Используем ip-api (не требует ключа для демо-целей)
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();

        if (data.status === "success") {
            document.getElementById('ip-display').textContent = data.query;
            document.getElementById('location-display').textContent = `${data.city}, ${data.country}`;
            document.getElementById('isp-display').textContent = data.isp;
        } else {
            throw new Error("API Limit reached");
        }
    } catch (error) {
        document.getElementById('ip-display').textContent = "ENCRYPTED";
        document.getElementById('location-display').textContent = "UNKNOWN";
        document.getElementById('isp-display').textContent = "HIDDEN";
    }
}

// Запуск при загрузке
window.onload = () => {
    typeWriter(titleText, 0, () => {
        // Когда текст напечатался, подгружаем данные
        fetchSystemData();
    });
};
