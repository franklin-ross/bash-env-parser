const { spawnSync } = require("child_process");

const env = {
  PATH: process.env.PATH,
  BOB: "hello",
  JILL: "there"
};

const commands = ["echo $BOB", "echo ${JILL}"];

const writeResults = async () => {
  const results = [];
  try {
    // Call each command with bash and collect the results.
    for (const command of commands) {
      // Use spawn so we can use bash on Windows without "/d /s /c" arguments on Node 10.
      const { stdout, stderr } = spawnSync("bash", ["-c", command], {
        timeout: 10000,
        encoding: "utf8",
        env,
        windowsHide: true
      });
      results.push({ command, stdout, stderr });
    }
    // Write the collected results to stdout as a JSON object.
    await new Promise((resolve, reject) => {
      const result = JSON.stringify(results, null, 2);
      resolve(process.stdout.write(result, reject));
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  return results;
};

writeResults();
