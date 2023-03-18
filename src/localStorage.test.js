import { storageManager } from "./localStorage";
import * as mockData from "./mockData";
import * as getWeatherMock from "./getWeather";

const sleep = (x) => new Promise((resolve) => setTimeout(resolve, x));

describe("storageManager", () => {
  let app;
  let el;
  let form;
  let listEl;
  let input;
  let fetchSpy;
  beforeEach(async () => {
    app = document.createElement("div");
    app.setAttribute("id", "app");
    el = document.createElement("div");
    form = document.createElement("form");
    input = document.createElement("input");
    form.append(input);
    el.append(form);
    listEl = document.createElement("div");
    listEl.setAttribute("id", "list");
    el.append(listEl);

    window.ymaps = {
      ready(fn) {
        if (fn) fn();
        return this;
      },
      Map() {},
    };
    window.yandexMap = {
      setCenter(coords) {
        return coords;
      },
    };
    window.fetch = () => {};
    jest.clearAllMocks();
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve(mockData.weatherData),
    });
    await storageManager(el);
  });

  it("is a function", () => {
    expect(storageManager).toBeInstanceOf(Function);
  });

  it("create basic markup", () => {
    expect(el.querySelector("div#list ol")).toBeTruthy();
  });

  it("form save data on submit", () => {
    el.querySelector("input").value = "Saratov";
    el.querySelector("form").submit();
    expect(el.querySelector("input").value).toBe("");
  });

  it("add new city after click", async () => {
    el.querySelector("input").value = "Saratov";
    el.querySelector("form").submit();

    const cityLink = el.querySelector("div#list ol a");
    expect(cityLink.innerHTML).toBe("Saratov");

    cityLink.click();
    await getWeatherMock.getWeather("Saratov", app);

    expect(app.querySelector("p").innerHTML).toBe("Город Saratov");
  });

  it("wrong address shows alert", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    const getWeatherMocked = jest.spyOn(getWeatherMock, "getWeather");
    getWeatherMocked.mockResolvedValue(mockData.weatherError);

    el.querySelector("input").value = "asdfg";
    el.querySelector("form").submit();

    await sleep(100);

    expect(window.alert.mock.calls.length).toBe(1);
  });
});
