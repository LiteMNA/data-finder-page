const titleText = "I HAVE YOUR DATA...";
const titleElement = document.getElementById('main-title');

// 1. Анимация печатной машинки
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

// 2. Получение данных (Обновленный метод)
async function fetchSystemData() {
    const ipDisp = document.getElementById('ip-display');
    const locDisp = document.getElementById('location-display');
    const ispDisp = document.getElementById('isp-display');

    try {
        // Используем https://ipapi.co/json/ — он стабильно работает на Vercel
        const response = await fetch('https://ipapi.co/json/');
        
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();

        // Заполняем данные из ответа API
        ipDisp.textContent = data.ip || "HIDDEN";
        locDisp.textContent = `${data.city || 'Unknown'}, ${data.country_name || 'Earth'}`;
        ispDisp.textContent = data.org || "UNKNOWN PROVIDER";

    } catch (error) {
        console.error("Ошибка получения данных:", error);
        ipDisp.textContent = "ACCESS DENIED";
        locDisp.textContent = "ENCRYPTED";
        ispDisp.textContent = "FIREWALL BLOCKED";
    }
}

// Запуск при загрузке
window.onload = () => {
    typeWriter(titleText, 0, () => {
        fetchSystemData();
    });
};
