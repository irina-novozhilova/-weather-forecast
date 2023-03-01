import { getWeather } from "./getWeather";

async function a() {
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
    const citiesLinks = document.querySelectorAll("a");

    citiesLinks.forEach((curCity) => {
      curCity.addEventListener("click", (ev) => {
        ev.preventDefault();
        const city = curCity.innerHTML;
        getWeather(city, document.getElementById("app"));
      });
    });
  }

  // Получаем указатели на нужные элементы
  const form = document.querySelector("form");
  const listEl = document.querySelector("#list");

  // Читаем список при старте
  let items = await readList();

  // и отрисовываем список
  drawList(listEl, items);

  form.addEventListener("submit", (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const { value } = input;
    input.value = "";

    // добавляем элемент в список
    // items.push(value);
    const arrValue = [value];
    items = [...arrValue, ...items].slice(0, 10);
    getWeather(value, document.getElementById("app"));

    // обновляем список
    drawList(listEl, items);

    // сохраняем список
    saveList(items);
  });
}

a();
