import { showWeather } from "./showWeather";
import * as mockData from "./mockData";

// jest.mock('./getWeather', () => ({
//   ...(jest.requireActual('./getWeather')),
//   getWeather: jest.fn()
// }))

describe("showWeather", () => {
  let el;
  let fetchSpy;

  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
    el = document.createElement("div");
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValue({
      json: () => Promise.resolve(mockData.weatherData),
    });
  });

  it("is a function", () => {
    expect(showWeather).toBeInstanceOf(Function);
  });

  it("call both functions getCurrentCity and getWeather", async () => {
    await showWeather(el);
    expect(el.innerHTML.indexOf("Saratov")).not.toBe(-1);
  });

  // it('tests something about otherFn', () => {
  //   getWeather.mockReturnValue('foo')
  //   expect(getWeather()).toBe('foo')
  // })
});
