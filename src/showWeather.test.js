import { showWeather } from "./showWeather";

describe("showWeather", () => {
  let el;
  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a function", () => {
    expect(showWeather).toBeInstanceOf(Function);
  });

  it("call both functions getCurrentCity and getWeather", async () => {
    await showWeather(el);
    // expect(getCurrentCity()).toBe('Saratov');
  });
});
