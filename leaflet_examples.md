# 🗺️ Примеры работы с Leaflet (Листмап) - Интерактивные карты

Полная документация примеров для создания интерактивных карт с использованием библиотеки Leaflet.

## 📚 Содержание

1. [Простая карта](#простая-карта)
2. [Маркеры и попапы](#маркеры-и-попапы)
3. [Круги и многоугольники](#круги-и-многоугольники)
4. [События на карте](#события-на-карте)
5. [Слои и управление](#слои-и-управление)
6. [Кластеризация](#кластеризация)
7. [Тепловые карты](#тепловые-карты)
8. [Геолокация](#геолокация)

---

## Простая карта

### Базовый пример

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
    <style>
        #map { height: 600px; }
    </style>
</head>
<body>
    <div id="map"></div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
    <script>
        // Создание карты
        const map = L.map('map').setView([53.9045, 27.5615], 13);
        
        // Добавление слоя плиток
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
    </script>
</body>
</html>
```

### Различные поставщики карт

```javascript
// OpenStreetMap (стандартная)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// CartoDB Positron (светлый стиль)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

// CartoDB Voyager (темный стиль)
L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

// Esri WorldImagery (спутниковая)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
}).addTo(map);
```

---

## Маркеры и попапы

### Простой маркер

```javascript
// Добавление маркера
const marker = L.marker([53.9045, 27.5615]).addTo(map);

// С кастомным названием
const marker = L.marker([53.9045, 27.5615], {
    title: 'Центральная площадь'
}).addTo(map);
```

### Маркер с попапом

```javascript
const marker = L.marker([53.9045, 27.5615])
    .bindPopup('Это Центральная площадь!')
    .addTo(map);

// Открыть попап автоматически
marker.openPopup();
```

### Кастомный попап

```javascript
const marker = L.marker([53.9045, 27.5615]).addTo(map);

const popupContent = `
    <div style="width: 200px;">
        <h3>Центральная площадь</h3>
        <p>Описание: Главная площадь города Минска</p>
        <p><strong>Координаты:</strong> 53.9045, 27.5615</p>
        <button onclick="alert('Кнопка работает!')">Нажми на меня</button>
    </div>
`;

marker.bindPopup(popupContent);
```

### Множество маркеров

```javascript
const locations = [
    {lat: 53.9045, lng: 27.5615, name: 'Площадь'},
    {lat: 53.9100, lng: 27.5600, name: 'Библиотека'},
    {lat: 53.9200, lng: 27.5500, name: 'Парк'}
];

locations.forEach(loc => {
    L.marker([loc.lat, loc.lng])
        .bindPopup(loc.name)
        .addTo(map);
});
```

---

## Круги и многоугольники

### Круг (Circle)

```javascript
// Простой круг
L.circle([53.9045, 27.5615], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500 // в метрах
}).addTo(map);
```

### Многоугольник (Polygon)

```javascript
const triangle = L.polygon([
    [53.9045, 27.5615],
    [53.9100, 27.5600],
    [53.9200, 27.5500]
], {
    color: 'purple',
    fillColor: '#9b59b6',
    fillOpacity: 0.5,
    weight: 2
}).bindPopup('Многоугольник').addTo(map);
```

### Полилиния (Polyline)

```javascript
const route = L.polyline([
    [53.9045, 27.5615],
    [53.9100, 27.5600],
    [53.9200, 27.5500],
    [53.9300, 27.5700]
], {
    color: 'orange',
    weight: 3,
    opacity: 0.7,
    dashArray: '5, 10'
}).bindPopup('Маршрут').addTo(map);
```

---

## События на карте

### События маркера

```javascript
const marker = L.marker([53.9045, 27.5615]).addTo(map);

// Клик на маркер
marker.on('click', function() {
    console.log('Маркер нажат!');
    this.openPopup();
});

// Наведение мыши
marker.on('mouseover', function() {
    this.openPopup();
});

marker.on('mouseout', function() {
    this.closePopup();
});

// Перетаскивание
marker.on('drag', function() {
    console.log('Координаты:', this.getLatLng());
});
```

### События карты

```javascript
// Клик на карту
map.on('click', function(e) {
    console.log('Координаты клика:', e.latlng);
    L.marker(e.latlng).addTo(map);
});

// Изменение масштаба
map.on('zoomend', function() {
    console.log('Текущий масштаб:', map.getZoom());
});

// Движение карты
map.on('moveend', function() {
    console.log('Центр карты:', map.getCenter());
});
```

---

## Слои и управление

### Базовые слои

```javascript
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19
});

const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
});

const baseLayers = {
    'OpenStreetMap': osmLayer,
    'CartoDB Voyager': cartoLayer
};

L.control.layers(baseLayers).addTo(map);
osmLayer.addTo(map);
```

### Слои маркеров

```javascript
const markersLayer = L.layerGroup();
const circlesLayer = L.layerGroup();

L.marker([53.9045, 27.5615]).addTo(markersLayer);
L.circle([53.9100, 27.5600], {radius: 500}).addTo(circlesLayer);

markersLayer.addTo(map);
circlesLayer.addTo(map);

const overlayLayers = {
    'Маркеры': markersLayer,
    'Круги': circlesLayer
};

L.control.layers({}, overlayLayers).addTo(map);
```

---

## Кластеризация

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.Default.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/leaflet.markercluster.js"></script>

<script>
    const markerClusterGroup = L.markerClusterGroup();

    const locations = [
        [53.9045, 27.5615],
        [53.9100, 27.5600],
        [53.9200, 27.5500],
        [53.8900, 27.5400],
        [53.9300, 27.5700]
    ];

    locations.forEach(loc => {
        L.marker(loc).addTo(markerClusterGroup);
    });

    map.addLayer(markerClusterGroup);
</script>
```

---

## Тепловые карты

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/1.0.2/leaflet-heat.min.js"></script>

<script>
    const heatData = [
        [53.9045, 27.5615, 0.5],
        [53.9100, 27.5600, 0.8],
        [53.9200, 27.5500, 0.3],
        [53.8900, 27.5400, 0.6],
        [53.9300, 27.5700, 0.9]
    ];

    const heat = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 1,
        gradient: {
            0.0: '#3388ff',
            0.5: '#ffd700',
            1.0: '#ff0000'
        }
    }).addTo(map);
</script>
```

---

## Геолокация

```javascript
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        map.setView([lat, lng], 15);
        
        L.marker([lat, lng])
            .bindPopup('Ты здесь!')
            .addTo(map);
            
        L.circle([lat, lng], {
            radius: position.coords.accuracy,
            color: 'blue',
            fillOpacity: 0.1
        }).addTo(map);
    });
} else {
    console.log('Геолокация не поддерживается');
}
```

---

**Создано: 27 декабря 2025**