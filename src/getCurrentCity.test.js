import { getCurrentCity } from "./getCurrentCity";
import * as mockData from "./mockData";

describe("getCurrentCity", () => {
  let fetchSpy;
  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
  });

  it("is a function", () => {
    expect(getCurrentCity).toBeInstanceOf(Function);
  });

  it("makes call for city from ip", () => {
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData.ipData),
    });
    getCurrentCity();
    expect(window.fetch).toHaveBeenCalledWith("https://ipwho.is/");
  });

  it("return 'Saratov' for mocked data", async () => {
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData.ipData),
    });
    const result = await getCurrentCity();
    expect(result).toBe("Saratov");
  });
});
