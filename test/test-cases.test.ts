import cases from "./test-cases.json";

cases.forEach(({ command, stdout, stderr }) => {
  it(command, () => {
    expect(stderr).toBe("");
  });
});
