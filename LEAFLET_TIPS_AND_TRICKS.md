# 👋 Leaflet - Продвинутые техники и оптимизация

## ⚡ Оптимизация производительности

### 1. Кластеризация большого количества маркеров

```javascript
const markerClusterGroup = L.markerClusterGroup({
    maxClusterRadius: 50,
    disableClusteringAtZoom: 18
});

// Добавить тысячи маркеров
for (let i = 0; i < 5000; i++) {
    L.marker([Math.random() * 180 - 90, Math.random() * 360 - 180])
        .addTo(markerClusterGroup);
}

map.addLayer(markerClusterGroup);
```

### 2. Отложенная загрузка

```javascript
const allMarkers = [...]; // Все маркеры

function loadMarkersInView() {
    const bounds = map.getBounds();
    allMarkers.forEach(marker => {
        if (bounds.contains(marker.getLatLng()) && !marker.loaded) {
            marker.addTo(map);
            marker.loaded = true;
        } else if (!bounds.contains(marker.getLatLng()) && marker.loaded) {
            map.removeLayer(marker);
            marker.loaded = false;
        }
    });
}

map.on('moveend', loadMarkersInView);
map.on('zoomend', loadMarkersInView);
loadMarkersInView();
```

### 3. Canvas вместо SVG

```javascript
const map = L.map('map', {
    renderer: L.canvas() // использует Canvas вместо SVG
});
```

---

## 🌟 Полезные техники

### 1. Добавление маркера по клику

```javascript
map.on('click', (e) => {
    const marker = L.marker(e.latlng)
        .bindPopup(`${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`)
        .addTo(map);
});
```

### 2. Откражение границ области

```javascript
const bounds = map.getBounds();
L.rectangle(bounds, {
    color: 'red',
    weight: 2,
    dashArray: '5, 5',
    fillOpacity: 0.1
}).addTo(map);
```

### 3. Фильтрация маркеров

```javascript
function getMarkersInBounds(bounds) {
    const results = [];
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && bounds.contains(layer.getLatLng())) {
            results.push(layer);
        }
    });
    return results;
}

const bounds = L.latLngBounds([[lat1, lng1], [lat2, lng2]]);
const markersInRect = getMarkersInBounds(bounds);
```

### 4. Загрузка маркеров из JSON

```javascript
function loadMarkersFromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    data.forEach(item => {
        L.marker([item.lat, item.lng])
            .bindPopup(item.popup)
            .addTo(map);
    });
}

function exportMarkersToJSON() {
    const data = [];
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            const coords = layer.getLatLng();
            data.push({
                lat: coords.lat,
                lng: coords.lng,
                popup: layer.getPopup().getContent()
            });
        }
    });
    return JSON.stringify(data, null, 2);
}

// сохранить
localStorage.setItem('mapMarkers', exportMarkersToJSON());

// загрузить
loadMarkersFromJSON(localStorage.getItem('mapMarkers'));
```

### 5. Подсчет расстояния между ными

```javascript
const point1 = L.latLng(lat1, lng1);
const point2 = L.latLng(lat2, lng2);
const distance = point1.distanceTo(point2); // в метрах

console.log(`Расстояние: ${distance / 1000} км`);
```

---

## 🔍 Отладка

```javascript
function enableMapDebug() {
    map.on('click', (e) => console.log('📍 Click:', e.latlng));
    map.on('zoomend', (e) => console.log('🔍 Zoom:', map.getZoom()));
    map.on('moveend', (e) => console.log('🎯 Moved to:', map.getBounds()));
    map.on('layeradd', (e) => console.log('➕ Added:', e.layer.constructor.name));
}

enableMapDebug();
```

---

## 🎎 Стилизация и анимация

### 1. Темная тема

```javascript
L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(map);
```

### 2. Анимация маркера

```javascript
function bounceMarker(marker) {
    let bounceCount = 0;
    const originalLatLng = marker.getLatLng();
    const bounceHeight = 0.0005;
    
    const bounce = setInterval(() => {
        marker.setLatLng([
            originalLatLng.lat + bounceHeight * Math.sin(bounceCount * 0.5),
            originalLatLng.lng
        ]);
        bounceCount++;
        
        if (bounceCount > Math.PI * 2) {
            marker.setLatLng(originalLatLng);
            clearInterval(bounce);
        }
    }, 50);
}

marker.on('click', function() {
    bounceMarker(this);
});
```

---

## 💱 Безопасность

### 1. Протекция от XSS

```javascript
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

const userInput = '<img src=x onerror="alert(1)">';
const safeHtml = escapeHtml(userInput);
L.marker([lat, lng]).bindPopup(safeHtml).addTo(map);
```

### 2. Валидация координат

```javascript
function isValidLatLng(lat, lng) {
    return typeof lat === 'number' && typeof lng === 'number' &&
           lat >= -90 && lat <= 90 &&
           lng >= -180 && lng <= 180;
}

if (isValidLatLng(lat, lng)) {
    L.marker([lat, lng]).addTo(map);
} else {
    console.error('Некорректные координаты');
}
```

---

## 📋 Пример реального приложения

```javascript
class MapApp {
    constructor(containerId) {
        this.map = L.map(containerId).setView([53.9045, 27.5615], 13);
        this.markers = [];
        this.setupLayers();
        this.setupEvents();
    }
    
    setupLayers() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    }
    
    setupEvents() {
        this.map.on('click', (e) => this.addMarker(e.latlng));
    }
    
    addMarker(latlng) {
        const marker = L.marker(latlng).addTo(this.map);
        this.markers.push(marker);
    }
    
    clearMarkers() {
        this.markers.forEach(m => this.map.removeLayer(m));
        this.markers = [];
    }
}

// Использование
const app = new MapApp('map');
```

---

**Основано на Leaflet 1.9.4 | На основе документации: https://leafletjs.com**
