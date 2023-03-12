import { getWeather } from "./getWeather";

export async function storageManager(rootElement) {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    let jsonList = localStorage.getItem("myList");
    if (!jsonList) {
      jsonList = "[]";
    }
    return JSON.parse(jsonList);
  }

  // Сохраняет список
  function saveList(items) {
    const str = JSON.stringify(items);
    localStorage.setItem("myList", str);
  }

  function drawList(el, items) {
    const curEl = el;
    curEl.innerHTML = `<ol>${items
      .map((cur) => `<li><a href="#">${cur}</a></li>`)
      .join("")}</ol>`;
    const citiesLinks = rootElement.querySelectorAll("a");

    citiesLinks.forEach((curCity) => {
      curCity.addEventListener("click", (ev) => {
        ev.preventDefault();
        const city = curCity.innerHTML;
        getWeather(city, document.getElementById("app"));
      });
    });
  }

  // Получаем указатели на нужные элементы
  const form = rootElement.querySelector("form");
  const listEl = rootElement.querySelector("#list");

  // Читаем список при старте
  let items = await readList();

  // и отрисовываем список
  drawList(listEl, items);

  form.addEventListener("submit", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const { value } = input;
    input.value = "";

    const weatherData = await getWeather(value, document.getElementById("app"));

    // проверка на несуществующий город
    if (weatherData.cod === 200) {
      const checkItems = items.map((x) => x.toLowerCase());

      if (checkItems.indexOf(value.toLowerCase()) === -1) {
        // добавляем элемент в список
        const arrValue = [value];
        items = [...arrValue, ...items].slice(0, 10);
      }

      // обновляем список
      drawList(listEl, items);

      // сохраняем список
      saveList(items);
    } else {
      alert("Такого города не существует");
    }
  });
}
