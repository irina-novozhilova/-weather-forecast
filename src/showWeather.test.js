import { showWeather } from "./showWeather";

describe("showWeather", () => {
  it("is a function", () => {
    expect(showWeather).toBeInstanceOf(Function);
  });

  // it("call both functions getCurrentCity and getWeather", async () => {
  //   await showWeather(el);
  //   expect(getCurrentCity()).toBe('Saratov');
  // });
});
