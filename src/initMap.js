export async function initMap(weatherData) {
  ymaps.ready(() => {
    window.yandexMap = new ymaps.Map("map", {
      center: [weatherData.coord.lat, weatherData.coord.lon],
      zoom: 10,
    });
  });
}

export async function setCenter(weatherData) {
  ymaps.ready(() => {
    window.yandexMap.setCenter([weatherData.coord.lat, weatherData.coord.lon]);
  });
}
