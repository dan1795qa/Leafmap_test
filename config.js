// ====================================
// Конфигурация приложения Leafmap
// ====================================

const CONFIG = {
    // Настройки карты
    map: {
        // Центральная точка карты (широта, долгота)
        center: [53.9045, 27.5615], // Минск, Беларусь
        zoom: 13,
        minZoom: 2,
        maxZoom: 19,
        
        // Поставщики плиток карты
        tileProvider: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }
    },

    // Локации для отображения на карте
    locations: [
        {
            id: 1,
            name: 'Центральная площадь',
            lat: 53.9045,
            lng: 27.5615,
            description: 'Основная площадь города',
            icon: 'marker',
            type: 'landmark'
        },
        {
            id: 2,
            name: 'Национальная библиотека',
            lat: 53.9100,
            lng: 27.5600,
            description: 'Культурное учреждение',
            icon: 'library',
            type: 'cultural'
        },
        {
            id: 3,
            name: 'Парк Челюскинцев',
            lat: 53.9200,
            lng: 27.5500,
            description: 'Зеленая зона отдыха',
            icon: 'park',
            type: 'nature'
        },
        {
            id: 4,
            name: 'Вокзал',
            lat: 53.8900,
            lng: 27.5400,
            description: 'Железнодорожный вокзал',
            icon: 'station',
            type: 'transport'
        },
        {
            id: 5,
            name: 'Минск-Арена',
            lat: 53.9300,
            lng: 27.5700,
            description: 'Спортивный комплекс',
            icon: 'sport',
            type: 'sport'
        }
    ],

    // Слои карты
    layers: {
        markers: {
            enabled: true,
            visible: true,
            name: 'Маркеры'
        },
        circles: {
            enabled: true,
            visible: true,
            name: 'Круги влияния',
            radius: 800,
            color: '#3498db',
            opacity: 0.5
        },
        heatmap: {
            enabled: true,
            visible: false,
            name: 'Тепловая карта'
        }
    },

    // Стили маркеров по типам
    markerStyles: {
        landmark: {
            color: '#e74c3c',
            icon: '📍'
        },
        cultural: {
            color: '#9b59b6',
            icon: '🎫'
        },
        nature: {
            color: '#2ecc71',
            icon: '🌳'
        },
        transport: {
            color: '#f39c12',
            icon: '🚂'
        },
        sport: {
            color: '#3498db',
            icon: '⚽'
        }
    },

    // API настройки
    api: {
        baseUrl: 'https://api.example.com',
        timeout: 5000,
        retryAttempts: 3
    },

    // UI настройки
    ui: {
        sidebarWidth: 300,
        animationDuration: 300,
        enableAutoZoom: true
    },

    // Поиск
    search: {
        minChars: 2,
        debounceDelay: 300,
        maxResults: 10
    }
};

// Экспорт конфигурации
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}