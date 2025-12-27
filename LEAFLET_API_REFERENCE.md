# 📚 Leaflet API справочник

Полное описание всех методов и свойств библиотеки Leaflet.

## 🗺️ Методы карты

### Конструктор

```javascript
// Создание карты
const map = L.map('map-id', options);

// Опции:
const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13,
    minZoom: 2,
    maxZoom: 19,
    maxBounds: [[lat1, lng1], [lat2, lng2]],
    zoom: 10,
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
});
```

### Установка и получение

```javascript
// Установить вид (center + zoom)
map.setView([51.5, -0.09], 13);
map.setView({lat: 51.5, lng: -0.09}, 13);

// Получить текущие значения
map.getCenter(); // {lat: 51.5, lng: -0.09}
map.getZoom(); // 13
map.getBounds(); // Объект границ
```

### Масштабирование

```javascript
map.zoomIn();
map.zoomOut();
map.setZoom(15);
map.zoomIn(2); // зум в 2 раза

// Подогнать объект в вид
map.fitBounds([[50.5, -0.1], [51.5, 0.1]]);
map.fitBounds(markerGroup.getBounds()); // по границам группы
```

### Движение

```javascript
map.panTo([51.5, -0.09]);
map.panBy([100, 50]); // На 100px вниз и 50px вправо
```

### Добавление элементов

```javascript
marker.addTo(map);
L.marker([51.5, -0.09]).addTo(map);

// Последовательные добавления
map.addLayer(layer);
map.removeLayer(layer);
```

---

## 📍 Маркеры

```javascript
// Грай маркер с дефолтными параметрами
const marker = L.marker([51.5, -0.09]);

// Опциональные параметры
const marker = L.marker([51.5, -0.09], {
    title: 'Title',
    alt: 'Alt text',
    draggable: true,
    opacity: 0.8,
    icon: customIcon,
    riseOnHover: true,
    zIndexOffset: 100
});

// Методы
marker.getLatLng();
marker.setLatLng([51.6, -0.08]);
marker.addTo(map);
marker.removeFrom(map);

// Попапы
marker.bindPopup('<b>Привет!</b>');
marker.openPopup();
marker.closePopup();
marker.togglePopup();

// Подсказки
marker.bindTooltip('Подсказка');
marker.openTooltip();
marker.closeTooltip();
```

---

## Геометрия

### Окружность (Circle)

```javascript
L.circle([51.508, -0.11], {
    radius: 500, // в метрах
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    weight: 2,
    opacity: 0.7,
    dashArray: '5, 10'
});
```

### Многоугольник (Polygon)

```javascript
const polygon = L.polygon([
    [51.51, -0.12],
    [51.51, -0.10],
    [51.50, -0.10]
], {
    color: 'blue',
    fillColor: '#0000ff',
    fillOpacity: 0.3,
    weight: 2
});

// Методы
polygon.getLatLngs();
polygon.setLatLngs([[51.51, -0.12], [51.50, -0.10]]);
polygon.toGeoJSON();
```

### Полилиния (Polyline)

```javascript
const polyline = L.polyline([
    [51.5, -0.09],
    [51.51, -0.1]
], {
    color: 'red',
    weight: 4,
    opacity: 0.7,
    dashArray: '10, 5'
});

// Методы
polyline.getLatLngs();
polyline.setLatLngs(newLatLngs);
polyline.editing.enable(); // редактирование
```

### Прямоугольник (Rectangle)

```javascript
L.rectangle([
    [51.49, -0.08],
    [51.5, -0.06]
], {
    color: 'red',
    weight: 1,
    fillOpacity: 0.2
});
```

---

## Стили и Опции

```javascript
const style = {
    color: '#ff0000', // цвет ободки
    weight: 5, // толщина ободки (px)
    opacity: 0.7, // полупрозрачность ободки
    fillColor: '#00ff00', // цвет заполнения
    fillOpacity: 0.5, // полупрозрачность заполнения
    dashArray: '10, 5', // прерывистая линия
    lineCap: 'round', // тип концов линии
    lineJoin: 'round' // тип соединения линий
};

shape.setStyle(style);
```

---

## События

### События карты

```javascript
map.on('click', function(e) {
    console.log('Clicked at', e.latlng);
});

map.on('dblclick', function(e) {
    console.log('Double clicked');
});

map.on('zoomend', function() {
    console.log('Zoom level:', map.getZoom());
});

map.on('moveend', function() {
    console.log('Moved to:', map.getCenter());
});

map.on('layeradd', function(e) {
    console.log('Layer added:', e.layer);
});

map.on('layerremove', function(e) {
    console.log('Layer removed:', e.layer);
});
```

### События маркера

```javascript
marker.on('click', function() {
    console.log('Маркер нажат');
});

marker.on('dblclick', function() {
    console.log('Двойной клик');
});

marker.on('mouseover', function() {
    this.setOpacity(1);
});

marker.on('mouseout', function() {
    this.setOpacity(0.7);
});

marker.on('drag', function(e) {
    console.log('Dragging at', e.target.getLatLng());
});

marker.on('dragend', function(e) {
    console.log('Drag ended at', e.target.getLatLng());
});

marker.on('popupopen', function() {
    console.log('Попап открыт');
});

marker.on('popupclose', function() {
    console.log('Попап закрыт');
});
```

### Отключение событий

```javascript
map.off('click'); // отключить все click события
map.off('click', handler); // отключить специфичный обработчик
map.off(); // отключить все события
```

---

## Настройка иконок

```javascript
// Дефолтная иконка
const greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',
    iconSize: [38, 95], // [width, height]
    shadowSize: [50, 64],
    iconAnchor: [22, 94], // точка, которая соответствует координатам
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

// CSS div иконка
const divIcon = L.divIcon({
    html: '<div class="my-marker">42</div>',
    iconSize: [30, 30],
    className: 'custom-icon'
});
```

---

## Попапы и Подсказки

```javascript
// Простые попапы
marker.bindPopup('Hello World');
marker.bindPopup('<b>Bold text</b><br>Normal text');

// Стойки попапа
const popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent('I am a standalone popup.')
    .openOn(map);

// Удалить попап
marker.unbindPopup();

// Подсказки
marker.bindTooltip('Што это?');
marker.bindTooltip('Tooltip', {direction: 'bottom'});
```

---

## Группы слоев

```javascript
// Неординируютвая группа слоев
const layerGroup = L.layerGroup([
    L.marker([51.51, -0.08]),
    L.marker([51.5, -0.09])
]);

layerGroup.addTo(map);

// Методы
layerGroup.addLayer(marker);
layerGroup.removeLayer(marker);
layerGroup.clearLayers();
layerGroup.eachLayer(function(layer) { ... });

// Настойки многочисленности для работы с большими данными
const featureGroup = L.featureGroup([...]);
featureGroup.setStyle({color: 'red'});
```

---

## GeoJSON

```javascript
const geojsonFeature = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [-80, 45]
    },
    "properties": {
        "name": "Coors Field"
    }
};

L.geoJSON(geojsonFeature).addTo(map);

// Кастомизация
L.geoJSON(data, {
    style: {color: 'blue'},
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name);
    },
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng);
    }
}).addTo(map);
```

---

## Целесообразные примеры

```javascript
// Получить расстояние между двумя точками (в метрах)
const distance = L.latLng(lat1, lng1).distanceTo([lat2, lng2]);

// Проверить, находится ли точка в прямоугольнике
const bounds = L.latLngBounds([...]);
const inside = bounds.contains([lat, lng]);

// При всаком слое на карте
map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) { ... }
});
```

---

**На основе Leaflet версия 1.9.4**
