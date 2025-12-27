# 📋 Leaflet - Быстрая шпаргалка

## 🚀 Быстрый старт (5 минут)

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
</head>
<body>
    <div id="map" style="height: 600px;"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
    <script>
        const map = L.map('map').setView([53.9045, 27.5615], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([53.9045, 27.5615]).bindPopup('Hello!').addTo(map);
    </script>
</body>
</html>
```

---

## 🗺️ Карта

| Операция | Код |
|----------|-----|
| Новая карта | `L.map('id').setView([lat, lng], zoom)` |
| Получить центр | `map.getCenter()` |
| Получить масштаб | `map.getZoom()` |
| Поменять тарн вид | `map.setView([lat, lng], zoom)` |
| Зумировать | `map.zoomIn()` / `map.zoomOut()` |
| Подогнать границы | `map.fitBounds(bounds)` |

---

## 📍 Маркеры

```javascript
// Простой
L.marker([lat, lng]).addTo(map);

// С попапом
L.marker([lat, lng]).bindPopup('Text').addTo(map);

// С подсказкой
L.marker([lat, lng]).bindTooltip('Hint').addTo(map);

// Открыть попап
marker.openPopup();
```

---

## 🔵 Фигуры

```javascript
// Окружность
L.circle([lat, lng], {radius: 500, color: 'red'}).addTo(map);

// Многоугольник
L.polygon([[lat1, lng1], [lat2, lng2]], {color: 'blue'}).addTo(map);

// Линия
L.polyline([[lat1, lng1], [lat2, lng2]], {color: 'orange'}).addTo(map);
```

---

## 🗣️ Настройка стиля

```javascript
shape.setStyle({
    color: 'red',
    fillColor: 'blue',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 0.8,
    dashArray: '5, 10'
});
```

---

## 📋 Плиты

```javascript
// OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// CartoDB Dark
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// CartoDB Light
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

// Satellite
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
```

---

## 🕼️ События

```javascript
// Клик
map.on('click', (e) => console.log(e.latlng));

// Масштаб
map.on('zoomend', () => console.log(map.getZoom()));

// Движение
map.on('moveend', () => console.log(map.getCenter()));

// На маркере
marker.on('click', () => console.log('Clicked'));
```

---

## 📂 Группы слоев

```javascript
const group = L.layerGroup();
L.marker([lat, lng]).addTo(group);
L.circle([lat, lng]).addTo(group);
group.addTo(map);

// Операции
group.clearLayers();
group.removeFrom(map);
```

---

## 🔍 Поиск

```javascript
// Маркеры в видимой области
const bounds = map.getBounds();
const visible = markers.filter(m => bounds.contains(m.getLatLng()));

// Расстояние
const dist = L.latLng(lat1, lng1).distanceTo([lat2, lng2]);
```

---

## 📦 Imports

```javascript
// GeoJSON
L.geoJSON(data).addTo(map);

// Настройка
L.geoJSON(data, {
    onEachFeature: (feat, layer) => layer.bindPopup(feat.properties.name)
}).addTo(map);
```

---

## 📊 Геолокация

```javascript
navigator.geolocation.getCurrentPosition((pos) => {
    const {latitude: lat, longitude: lng} = pos.coords;
    map.setView([lat, lng], 15);
    L.marker([lat, lng]).addTo(map);
});
```

---

## 📋 CDN ссылки

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />

<!-- JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>

<!-- Marker Cluster -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/leaflet.markercluster.js"></script>

<!-- Heat Layer -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/1.0.2/leaflet-heat.min.js"></script>
```

---

## 🎯 Целесообразные примеры

```javascript
// Паттерн: Адд маркер на клик
map.on('click', (e) => L.marker(e.latlng).addTo(map));

// Паттерн: Кастом иконка
const icon = L.icon({iconUrl: 'icon.png', iconSize: [32, 32]});
L.marker([lat, lng], {icon}).addTo(map);

// Паттерн: Фильтрация маркеров
map.eachLayer(layer => {
    if (layer instanceof L.Marker) console.log(layer);
});
```

---

## 📚 Ресурсы

- [Leaflet](https://leafletjs.com/)
- [Плагины](https://leafletjs.com/plugins.html)
- [GitHub](https://github.com/Leaflet/Leaflet)

---

**Версия 1.9.4 | Что дальше: смотрите LEAFLET_API_REFERENCE.md**
