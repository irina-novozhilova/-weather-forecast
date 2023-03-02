import { initMap , setCenter } from "./initMap";

describe("initMap", () => {
  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
  });

  it("is a function", () => {
    expect(initMap).toBeInstanceOf(Function);
  });
});

describe("setCenter", () => {
  beforeEach(() => {
    window.fetch = () => {};
    jest.clearAllMocks();
  });

  it("is a function", () => {
    expect(setCenter).toBeInstanceOf(Function);
  });
});
