import { storageManager } from "./localStorage";
import * as mockData from "./mockData";

describe("storageManager", () => {
  let el;
  let form;
  let listEl;
  let input;
  let fetchSpy;
  beforeEach(async () => {
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
});
