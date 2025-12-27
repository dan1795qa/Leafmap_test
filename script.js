// ====================================
// Основной скрипт приложения Leafmap
// ====================================

class LeafmapApp {
    constructor(config) {
        this.config = config;
        this.map = null;
        this.markers = [];
        this.circles = [];
        this.layers = {};
        this.selectedMarker = null;
        
        this.init();
    }

    // Инициализация приложения
    init() {
        console.log('🚀 Инициализация Leafmap...');
        this.initMap();
        this.setupEventListeners();
        this.addLocations();
        this.updateLayersUI();
        console.log('✅ Leafmap готов к использованию!');
    }

    // Инициализация карты
    initMap() {
        const { map: mapConfig } = this.config;
        
        this.map = L.map('map').setView(mapConfig.center, mapConfig.zoom);
        
        // Добавление слоя карты
        L.tileLayer(
            mapConfig.tileProvider.url,
            {
                attribution: mapConfig.tileProvider.attribution,
                maxZoom: mapConfig.tileProvider.maxZoom,
                tileSize: 256,
                zoomOffset: 0
            }
        ).addTo(this.map);

        // Обработка события изменения масштаба
        this.map.on('zoomend', () => {
            this.updateZoomDisplay();
        });
    }

    // Добавление локаций на карту
    addLocations() {
        const { locations, markerStyles } = this.config;
        
        locations.forEach(location => {
            this.addMarker(location, markerStyles[location.type]);
            
            if (this.config.layers.circles.enabled) {
                this.addCircle(location);
            }
        });

        console.log(`📍 Добавлено ${this.markers.length} маркеров`);
    }

    // Добавление маркера
    addMarker(location, style) {
        const { lat, lng, name, description } = location;
        
        // Создание маркера
        const marker = L.marker([lat, lng], {
            title: name,
            opacity: 1
        }).addTo(this.map);

        // Добавление попапа
        marker.bindPopup(`
            <div class="popup-content">
                <h3>${name}</h3>
                <p>${description}</p>
                <small>Координаты: ${lat.toFixed(4)}, ${lng.toFixed(4)}</small>
            </div>
        `);

        // Обработка клика на маркер
        marker.on('click', () => {
            this.selectMarker(location);
        });

        marker.location = location;
        this.markers.push(marker);
    }

    // Добавление круга влияния
    addCircle(location) {
        const { lat, lng, name } = location;
        const { radius, color, opacity } = this.config.layers.circles;

        const circle = L.circle([lat, lng], {
            radius: radius,
            color: color,
            fillColor: color,
            fillOpacity: opacity,
            weight: 2,
            opacity: opacity * 0.7
        }).addTo(this.map);

        circle.bindPopup(`Зона влияния: ${name}`);
        this.circles.push(circle);
    }

    // Выбор маркера
    selectMarker(location) {
        this.selectedMarker = location;
        this.updateInfoPanel(location);
        console.log('Selected:', location);
    }

    // Обновление информационной панели
    updateInfoPanel(location) {
        const infoPanel = document.getElementById('infoPanel');
        const { markerStyles } = this.config;
        const style = markerStyles[location.type];

        infoPanel.innerHTML = `
            <div class="location-info">
                <h3>${style.icon} ${location.name}</h3>
                <p><strong>Тип:</strong> ${location.type}</p>
                <p><strong>Описание:</strong> ${location.description}</p>
                <p><strong>Координаты:</strong></p>
                <ul>
                    <li>Широта: ${location.lat.toFixed(6)}</li>
                    <li>Долгота: ${location.lng.toFixed(6)}</li>
                </ul>
                <button class="btn btn-primary" onclick="app.zoomToLocation(${location.lat}, ${location.lng})">
                    Центрировать
                </button>
            </div>
        `;
    }

    // Масштабирование к локации
    zoomToLocation(lat, lng) {
        this.map.setView([lat, lng], 16, {
            animate: true,
            duration: 0.5
        });
    }

    // Обновление отображения масштаба
    updateZoomDisplay() {
        const zoomLevel = this.map.getZoom();
        document.getElementById('zoomLevel').value = zoomLevel;
        document.getElementById('zoomValue').textContent = zoomLevel;
    }

    // Настройка слушателей событий
    setupEventListeners() {
        // Поле поиска
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Масштаб
        const zoomLevel = document.getElementById('zoomLevel');
        zoomLevel.addEventListener('input', (e) => {
            this.map.setZoom(parseInt(e.target.value));
        });

        // Переключатели слоев
        document.getElementById('markerLayer').addEventListener('change', (e) => {
            this.toggleMarkers(e.target.checked);
        });

        document.getElementById('circleLayer').addEventListener('change', (e) => {
            this.toggleCircles(e.target.checked);
        });

        document.getElementById('heatmapLayer').addEventListener('change', (e) => {
            this.toggleHeatmap(e.target.checked);
        });

        // Кнопка сброса
        document.getElementById('resetButton').addEventListener('click', () => {
            this.reset();
        });
    }

    // Обработка поиска
    handleSearch(query) {
        const { search: searchConfig } = this.config;

        if (query.length < searchConfig.minChars) {
            this.showAllMarkers();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = CONFIG.locations.filter(loc =>
            loc.name.toLowerCase().includes(lowerQuery) ||
            loc.description.toLowerCase().includes(lowerQuery)
        );

        this.highlightLocations(results);
    }

    // Выделение найденных локаций
    highlightLocations(results) {
        // Скрыть все маркеры
        this.markers.forEach(marker => marker.setOpacity(0.3));

        // Подсветить найденные
        results.forEach(result => {
            const marker = this.markers.find(m => m.location.id === result.id);
            if (marker) {
                marker.setOpacity(1);
            }
        });

        // Если результат один, центрировать на нем
        if (results.length === 1) {
            this.zoomToLocation(results[0].lat, results[0].lng);
        }
    }

    // Показать все маркеры
    showAllMarkers() {
        this.markers.forEach(marker => marker.setOpacity(1));
    }

    // Переключение видимости маркеров
    toggleMarkers(show) {
        this.markers.forEach(marker => {
            if (show) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    // Переключение видимости кругов
    toggleCircles(show) {
        this.circles.forEach(circle => {
            if (show) {
                circle.addTo(this.map);
            } else {
                this.map.removeLayer(circle);
            }
        });
    }

    // Переключение тепловой карты
    toggleHeatmap(show) {
        console.log('Тепловая карта:', show ? 'включена' : 'выключена');
    }

    // Обновление UI слоев
    updateLayersUI() {
        const { layers } = this.config;
        
        Object.keys(layers).forEach(layerKey => {
            const checkbox = document.getElementById(layerKey + 'Layer');
            if (checkbox) {
                checkbox.checked = layers[layerKey].visible;
            }
        });
    }

    // Сброс приложения
    reset() {
        this.map.setView(this.config.map.center, this.config.map.zoom);
        document.getElementById('searchInput').value = '';
        this.showAllMarkers();
        this.updateLayersUI();
        this.updateInfoPanel(this.config.locations[0]);
        console.log('🔄 Приложение переустановлено');
    }

    // Получение статистики
    getStats() {
        return {
            markersCount: this.markers.length,
            circlesCount: this.circles.length,
            currentZoom: this.map.getZoom(),
            center: this.map.getCenter()
        };
    }
}

// Инициализация приложения после загружения страницы
document.addEventListener('DOMContentLoaded', () => {
    window.app = new LeafmapApp(CONFIG);
    
    // Вывод статистики в консоль
    console.table(window.app.getStats());
});

// Обработка ошибок
window.addEventListener('error', (event) => {
    console.error('❌ Ошибка:', event.error);
});