import { getCurrentCity } from "./getCurrentCity";
import * as mockData from "./mockData";

describe("getCurrentCity", () => {
  let fetchSpy;
  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
    fetchSpy = jest.spyOn(window, "fetch");
  });

  it("is a function", () => {
    expect(getCurrentCity).toBeInstanceOf(Function);
  });

  it("makes call for city from ip", () => {
    getCurrentCity();
    expect(window.fetch).toHaveBeenCalledWith("http://ip-api.com/json/");
  });

  it("return 'Saratov' for mocked data", async () => {
    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData.ipData),
    });
    const result = await getCurrentCity();
    expect(result).toBe(mockData.ipData.city);
  });
});
