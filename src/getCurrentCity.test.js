import { getCurrentCity } from "./getCurrentCity";
import * as mockData from "./mockData";

describe("getCurrentCity", () => {
  let fetchSpy;
  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
    fetchSpy = jest.spyOn(window, "fetch");
    fetchSpy.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData.ipData),
    });
  });

  it("is a function", () => {
    expect(getCurrentCity).toBeInstanceOf(Function);
  });

  it("makes call for city from ip", () => {
    getCurrentCity();
    expect(window.fetch).toHaveBeenCalledWith("https://ipwho.is/");
  });

  it("return 'Saratov' for mocked data", async () => {
    const result = await getCurrentCity();
    expect(result).toBe(mockData.ipData.city);
  });
});
