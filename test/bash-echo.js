const { spawnSync } = require("child_process");

/** Runs `bash -c echo input` and returns the result. Throws stderr if that is not empty. */
module.exports = (input, env) => {
  // Use spawn so we can use bash on Windows without "/d /s /c" arguments on Node 10.
  const { stdout, stderr } = spawnSync("bash", ["-c", `echo ${input}`], {
    timeout: 5000,
    encoding: "utf8",
    env,
    windowsHide: true
  });
  if (stderr != "") throw new Error(stderr);
  return stdout.replace(/[\r\n]+$/, ""); // Can have trailing newlines we don't want
};
