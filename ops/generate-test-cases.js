const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const env = {
  PATH: process.env.PATH,
  BOB: "hello",
  JILL: "there"
};

const commands = ["echo $BOB", "echo ${BOB}"];

const writeResults = async () => {
  const results = [];
  // Call each command with bash and collect the results.
  for (const command of commands) {
    const { stdout, stderr } = await exec(command, { shell: "bash", env });
    results.push({ command, stdout, stderr });
  }
  // Write the collected results to stdout as a JSON object.
  await new Promise((resolve, reject) => {
    const result = JSON.stringify(results, null, 2);
    resolve(process.stdout.write(result, reject));
  });
};

writeResults();
