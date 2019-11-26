import parser from "./";

it("Should replace $BOB", () => {
  expect(parser("$BOB")).toBe("Hello!");
});
